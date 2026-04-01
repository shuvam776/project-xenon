import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/Booking';
import Hoarding from '@/models/Hoarding';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        // 1. Fetch confirmed bookings
        const bookings = await Booking.find({
            hoarding: id,
            status: 'confirmed'
        }).select('startDate endDate');

        // 2. Fetch hoarding for manual blocks
        const hoarding = await Hoarding.findById(id).select('availability.blockedDates');

        const blockedRanges = [
            ...bookings.map(b => ({
                startDate: b.startDate,
                endDate: b.endDate,
                type: 'booking'
            })),
            ...(hoarding?.availability?.blockedDates || []).map((b: any) => ({
                startDate: b.startDate,
                endDate: b.endDate,
                type: 'manual'
            }))
        ];

        return NextResponse.json({ blockedRanges });

    } catch (error: any) {
        console.error("Availability Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
    }
}
