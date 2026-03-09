import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        // Verify authentication
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { id } = await params;
        const bookingId = id;

        // Fetch booking with populated fields
        const booking = await Booking.findById(bookingId)
            .populate({
                path: "hoarding",
                populate: {
                    path: "owner",
                    select: "name email phone kycDetails"
                }
            })
            .populate("user", "name email")
            .lean();

        if (!booking) {
            console.log("Booking not found:", bookingId);
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        // Check if the user owns this booking (or is admin)
        // After populate and lean, user is an object with _id
        const userId = (booking.user as any)?._id?.toString();

        if (userId !== decoded.userId && decoded.role !== "admin") {
            console.log("Permission denied: userId:", userId, "decoded userId:", decoded.userId);
            return NextResponse.json(
                { error: "You don't have permission to view this booking" },
                { status: 403 }
            );
        }

        return NextResponse.json({ booking });
    } catch (error) {
        console.error("Error fetching booking:", error);
        return NextResponse.json(
            { error: "Failed to fetch booking" },
            { status: 500 }
        );
    }
}
