import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

// PATCH - Update user details (admin only)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

        const body = await req.json();
        const { kycStatus, emailVerified, isPhoneVerified, role } = body;

        const updateData: any = {};
        if (kycStatus) updateData.kycStatus = kycStatus;
        if (emailVerified !== undefined) updateData.emailVerified = emailVerified;
        if (isPhoneVerified !== undefined) updateData.isPhoneVerified = isPhoneVerified;
        if (role) updateData.role = role;

        const user = await User.findByIdAndUpdate(id, updateData, { new: true })
            .select('-password -refreshToken');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });

    } catch (error: any) {
        console.error("Admin Update User Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

// DELETE - Delete user (admin only)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Admin Delete User Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
