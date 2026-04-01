import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";
import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    console.log("[Messages GET] Access Token:", token ? "Found" : "Missing");

    const decoded = verifyAccessToken(token as string);
    if (!decoded) {
      console.warn("[Messages GET] Invalid or expired token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    await dbConnect();
    
    // Find all messages between this user and any admin
    const admins = await User.find({ role: "admin" }).select("_id");
    const adminIds = admins.map((a) => a._id);

    const messages = await Message.find({
      $or: [
        { sender: decoded.userId, receiver: { $in: adminIds } },
        { sender: { $in: adminIds }, receiver: decoded.userId },
      ],
    })
      .populate("sender", "name email role")
      .populate("receiver", "name email role")
      .sort({ createdAt: 1 });

    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    console.log("[Messages POST] Access Token:", token ? "Found" : "Missing");

    const decoded = verifyAccessToken(token as string);
    if (!decoded) {
      console.warn("[Messages POST] Invalid or expired token");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    console.log("[Messages POST] Decoded User:", decoded.userId, "Role:", decoded.role);
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    await dbConnect();

    // Find first admin to receive the message
    const admin = await User.findOne({ role: "admin" }).select("_id");
    if (!admin) {
      return NextResponse.json({ error: "No admin available" }, { status: 404 });
    }

    const newMessage = await Message.create({
      sender: decoded.userId,
      receiver: admin._id,
      content,
      type: "chat",
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "name email role")
      .populate("receiver", "name email role");

    return NextResponse.json({ message: "Sent", data: populatedMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const decoded = verifyAccessToken(token as string);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { messageIds, markAllFromAdmin = false } = await req.json();

    await dbConnect();

    const admins = await User.find({ role: "admin" }).select("_id");
    const adminIds = admins.map((admin) => admin._id);

    const query: Record<string, unknown> = {
      receiver: decoded.userId,
      status: "unread",
    };

    if (Array.isArray(messageIds) && messageIds.length > 0) {
      query._id = { $in: messageIds };
    } else if (markAllFromAdmin) {
      query.sender = { $in: adminIds };
    } else {
      return NextResponse.json(
        { error: "messageIds or markAllFromAdmin is required" },
        { status: 400 },
      );
    }

    await Message.updateMany(query, { $set: { status: "read" } });

    return NextResponse.json({ message: "Messages marked as read" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
