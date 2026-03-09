"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  IndianRupee,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params; // bookingId

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await fetchWithAuth(`/api/bookings/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Booking not found");
          } else if (res.status === 403) {
            setError("You don't have permission to view this booking");
          } else {
            setError("Failed to load booking details");
          }
          setLoading(false);
          return;
        }
        const data = await res.json();
        setBooking(data.booking);
      } catch (err) {
        console.error(err);
        setError("Could not load booking details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookingDetails();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { bg: string; text: string; icon: any }
    > = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
      },
      pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
      cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}
      >
        <Icon size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg">
          <XCircle size={64} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Booking not found"}
          </h2>
          <p className="text-gray-600 mb-6">
            The booking you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/buyer/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // If booking is pending, show payment completion prompt
  if (booking.status === "pending") {
    if (!booking.hoarding) {
      // Hoarding was deleted
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg">
            <XCircle size={64} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Hoarding No Longer Available
            </h2>
            <p className="text-gray-600 mb-6">
              The hoarding for this pending booking has been removed. This
              booking cannot be completed.
            </p>
            <Link
              href="/buyer/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg">
          <Clock size={64} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Pending
          </h2>
          <p className="text-gray-600 mb-6">
            Complete your payment to confirm this booking for{" "}
            <span className="font-semibold">{booking.hoarding.name}</span>
          </p>
          <div className="space-y-3">
            <Link
              href={`/bookings/${booking.hoarding._id}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full"
            >
              Complete Payment
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/buyer/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium w-full"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isActive = new Date(booking.endDate) >= new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/buyer/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Booking Details
              </h1>
              <p className="text-gray-600">Booking ID: {booking._id}</p>
            </div>
            {getStatusBadge(booking.status)}
          </div>

          {/* Booking Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Start Date</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                {formatDate(booking.startDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">End Date</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                {formatDate(booking.endDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-lg font-semibold text-gray-900">
                {calculateDuration(booking.startDate, booking.endDate)} days
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hoarding Details */}
          <div className="lg:col-span-2 space-y-6">
            {booking.hoarding ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white p-4">
                  <h2 className="text-xl font-bold">Hoarding Information</h2>
                </div>

                {/* Images */}
                {booking.hoarding.images &&
                  booking.hoarding.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 p-4">
                      {booking.hoarding.images.map(
                        (img: string, idx: number) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${booking.hoarding.name} - ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ),
                      )}
                    </div>
                  )}

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {booking.hoarding.name}
                    </h3>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin size={20} className="text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {booking.hoarding.location.address}
                        </p>
                        <p className="text-sm">
                          {booking.hoarding.location.city},{" "}
                          {booking.hoarding.location.state} -{" "}
                          {booking.hoarding.location.pincode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Type</p>
                      <p className="font-semibold text-gray-900">
                        {booking.hoarding.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Size</p>
                      <p className="font-semibold text-gray-900">
                        {booking.hoarding.dimensions.width} x{" "}
                        {booking.hoarding.dimensions.height} ft
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Price per Month
                      </p>
                      <p className="font-semibold text-gray-900 flex items-center">
                        <IndianRupee size={16} />
                        {booking.hoarding.pricePerMonth.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Lighting</p>
                      <p className="font-semibold text-gray-900">
                        {booking.hoarding.lightingType}
                      </p>
                    </div>
                  </div>

                  {booking.hoarding.description && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2">Description</p>
                      <p className="text-gray-700">
                        {booking.hoarding.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <XCircle size={24} />
                  <h3 className="text-lg font-bold">
                    Hoarding No Longer Available
                  </h3>
                </div>
                <p className="text-gray-600">
                  The hoarding associated with this booking has been removed
                  from the platform.
                </p>
              </div>
            )}
          </div>

          {/* Payment & Vendor Details */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white p-4">
                <h2 className="text-lg font-bold">Payment Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-3xl font-bold text-blue-600 flex items-center">
                    <IndianRupee size={24} />
                    {booking.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                {booking.razorpayPaymentId && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment ID</p>
                    <p className="text-xs font-mono text-gray-700 bg-gray-50 p-2 rounded break-all">
                      {booking.razorpayPaymentId}
                    </p>
                  </div>
                )}

                {booking.razorpayOrderId && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="text-xs font-mono text-gray-700 bg-gray-50 p-2 rounded break-all">
                      {booking.razorpayOrderId}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-1">Booked On</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(booking.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Vendor Details */}
            {booking.hoarding?.owner && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white p-4">
                  <h2 className="text-lg font-bold">Vendor Information</h2>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-semibold text-gray-900">
                        {booking.hoarding.owner.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">
                        {booking.hoarding.owner.email}
                      </p>
                    </div>
                  </div>
                  {booking.hoarding.owner.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">
                          {booking.hoarding.owner.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {booking.hoarding.owner.kycDetails?.companyName && (
                    <div className="flex items-center gap-3">
                      <Building2 size={18} className="text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium text-gray-900">
                          {booking.hoarding.owner.kycDetails.companyName}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Status Badge for Mobile */}
            <div className="md:hidden bg-gray-100 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Booking Status</p>
              <div className="flex justify-center">
                {getStatusBadge(booking.status)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
