"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import {
  Plus,
  MapPin,
  IndianRupee,
  Image as ImageIcon,
  Loader2,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react";

interface Hoarding {
  _id: string;
  name: string;
  location: {
    address: string;
    city: string;
  };
  pricePerMonth: number;
  status: string;
  images: string[];
}

export default function VendorDashboard() {
  const router = useRouter();
  const [hoardings, setHoardings] = useState<Hoarding[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorObj, setErrorObj] = useState<{
    status: number;
    text: string;
  } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    hoardingId: string | null;
    hoardingName: string;
  }>({ isOpen: false, hoardingId: null, hoardingName: "" });
  const [deleting, setDeleting] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetchWithAuth("/api/auth/me");

        if (!res.ok) {
          router.push("/");
          return;
        }

        const data = await res.json();
        if (data.user.role !== "vendor") {
          router.push("/");
          return;
        }

        setAuthChecked(true);
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!authChecked) return; // Wait for auth check

    const fetchHoardings = async () => {
      setErrorObj(null);

      try {
        const res = await fetchWithAuth("/api/hoardings?view=vendor");

        if (res.ok) {
          const data = await res.json();
          setHoardings(data.hoardings || []); // Ensure array
        } else {
          console.error(
            "Failed to fetch hoardings:",
            res.status,
            res.statusText,
          );
          const errData = await res.json().catch(() => ({}));
          if (res.status === 401) {
            router.push("/");
            return;
          }
          setErrorObj({
            status: res.status,
            text: errData.error || res.statusText || "Unknown error",
          });
        }
      } catch (error: any) {
        console.error("Failed to load hoardings", error);
        setErrorObj({ status: 500, text: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchHoardings();
  }, [router, authChecked]);

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, hoardingId: id, hoardingName: name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.hoardingId) return;

    setDeleting(true);
    try {
      const res = await fetchWithAuth(
        `/api/hoardings/${deleteModal.hoardingId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        // Remove from list
        setHoardings((prev) =>
          prev.filter((h) => h._id !== deleteModal.hoardingId),
        );
        setDeleteModal({ isOpen: false, hoardingId: null, hoardingName: "" });
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete hoarding");
      }
    } catch (error) {
      alert("Failed to delete hoarding");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, hoardingId: null, hoardingName: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#5b40e6]" />
      </div>
    );
  }

  if (errorObj) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error Loading Dashboard
        </h2>
        <p className="text-gray-700">Status: {errorObj.status}</p>
        <p className="text-gray-600">{errorObj.text}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Vendor Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your hoarding listings and bookings
            </p>
          </div>
          <Link
            href="/vendor/add-hoarding"
            className="inline-flex items-center gap-2 bg-[#5b40e6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            <Plus size={20} /> List New Hoarding
          </Link>
        </div>

        {/* Stats Overview (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">
              Total Listings
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {hoardings.length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">
              Active Bookings
            </div>
            <div className="text-3xl font-bold text-gray-900">0</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">
              Total Revenue
            </div>
            <div className="text-3xl font-bold text-gray-900 flex items-center">
              <IndianRupee size={24} /> 0
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Your Listings</h2>
          </div>

          {hoardings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p>No hoardings listed yet.</p>
              <Link
                href="/vendor/add-hoarding"
                className="text-indigo-600 font-medium hover:underline mt-2 inline-block"
              >
                Create your first listing
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {hoardings.map((item) => (
                <div
                  key={item._id}
                  className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-full sm:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                    {item.images[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#5b40e6] transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <MapPin size={14} /> {item.location.address},{" "}
                          {item.location.city}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 uppercase font-bold">
                          Price
                        </span>
                        <div className="flex items-center font-bold text-gray-900 mt-0.5">
                          <IndianRupee size={14} />{" "}
                          {item.pricePerMonth.toLocaleString()} / mo
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={`/vendor/edit-hoarding/${item._id}`}
                          className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-[#5b40e6] rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
                        >
                          <Edit size={16} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(item._id, item.name)}
                          className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Delete Hoarding
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                "{deleteModal.hoardingName}"
              </span>
              ? All associated data will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
