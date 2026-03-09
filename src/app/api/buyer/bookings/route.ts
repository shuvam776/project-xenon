import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/Booking';
import Hoarding from '@/models/Hoarding';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findById(payload.userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch all bookings for this user with hoarding details
        const bookings = await Booking.find({ user: user._id })
            .populate({
                path: 'hoarding',
                select: 'name location images type pricePerMonth dimensions'
            })
            .sort({ createdAt: -1 });

        // Calculate statistics
        const stats = {
            total: bookings.length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            pending: bookings.filter(b => b.status === 'pending').length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length,
            totalSpent: bookings
                .filter(b => b.status === 'confirmed')
                .reduce((sum, b) => sum + b.totalAmount, 0)
        };

        // Separate active and past bookings
        const now = new Date();
        const activeBookings = bookings.filter(b =>
            new Date(b.endDate) >= now && b.status !== 'cancelled'
        );
        const pastBookings = bookings.filter(b =>
            new Date(b.endDate) < now || b.status === 'cancelled'
        );

        return NextResponse.json({
            bookings,
            activeBookings,
            pastBookings,
            stats
        });

    } catch (error) {
        console.error("Fetch buyer bookings error:", error);
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
