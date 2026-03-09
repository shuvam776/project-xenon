import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

// GET single user details (admin only)
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
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
        const admin = await User.findById(payload.userId);

        if (!admin || admin.role !== 'admin') {
            return NextResponse.json({ error: "Access denied. Admin only." }, { status: 403 });
        }

        // Get user with all details including KYC
        const user = await User.findById(id).select('-password -refreshToken');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (error: any) {
        console.error("Admin Get User Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
