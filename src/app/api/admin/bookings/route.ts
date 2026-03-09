import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = verifyAccessToken(accessToken);
        if (!payload) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        await dbConnect();

        // Check if user is admin
        const user = await User.findById(payload.userId);
        if (!user || user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Get query parameters for filtering
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        // Build query
        const query: any = {};
        if (status) {
            query.status = status;
        }

        // Fetch all bookings with populated data
        const bookings = await Booking.find(query)
            .populate({
                path: "user",
                select: "name email phone role",
            })
            .populate({
                path: "hoarding",
                select: "name location.address location.city pricePerMonth owner",
            })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ bookings });
    } catch (error: any) {
        console.error("Fetch bookings error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
