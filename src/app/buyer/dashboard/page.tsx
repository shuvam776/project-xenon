"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import "@fontsource/chiron-goround-tc";
import {
  Calendar,
  MapPin,
  CreditCard,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  IndianRupee,
  ExternalLink,
  Loader2,
  User,
  ArrowRight,
  Search,
  LayoutDashboard,
  Heart,
  MessageSquare,
  Bell,
  LogOut,
  ChevronRight,
  ArrowUpRight,
  Filter,
  MoreVertical,
  Send,
  Trash2,
} from "lucide-react";

interface Booking {
  _id: string;
  hoarding: {
    _id: string;
    name: string;
    location: {
      address: string;
      city: string;
      state: string;
    };
    images: string[];
    type: string;
    pricePerMonth: number;
    dimensions: {
      width: number;
      height: number;
    };
  } | null;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  orderId: string;
  paymentId?: string;
  createdAt: string;
}

interface Stats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  totalSpent: number;
}

type TabType = "overview" | "campaigns" | "wishlist" | "chat";

interface UserData {
  _id: string;
  name: string;
  role: string;
  email?: string;
  image?: string;
}

interface WishlistItem {
  _id: string;
  name: string;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
  };
  pricePerMonth: number;
}

interface ChatMessage {
  _id: string;
  sender: string;
  content: string;
  createdAt?: string;
}

export default function BuyerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    totalSpent: 0,
  });
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Additional dynamic data
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your booking for 'Patia Square Billboard' is confirmed!", type: "confirmation", isRead: false, isRemoving: false, timestamp: "2 hours ago" },
    { id: 2, text: "Admin: New premium locations are now available for booking in Cuttack.", type: "admin", isRead: false, isRemoving: false, timestamp: "Yesterday" }
  ]);
  const notificationRef = useRef<HTMLDivElement>(null);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => !n.isRead ? { ...n, isRemoving: true } : n));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.isRead));
    }, 300);
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRemoving: true } : n));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 300);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetchWithAuth("/api/auth/me");
        if (!userRes.ok) {
          router.push("/");
          return;
        }
        const userData = await userRes.json();
        setUser(userData.user);

        if (userData.user.role !== "buyer") {
          router.push("/");
          return;
        }

        const bookingsRes = await fetchWithAuth("/api/buyer/bookings");
        if (bookingsRes.ok) {
          const data = await bookingsRes.json();
          setBookings(data.bookings || []);
          setActiveBookings(data.activeBookings || []);
          setPastBookings(data.pastBookings || []);
          setStats(
            data.stats || {
              total: 0,
              confirmed: 0,
              pending: 0,
              cancelled: 0,
              totalSpent: 0,
            },
          );
        }

        // Fetch Wishlist
        const wishlistRes = await fetchWithAuth("/api/buyer/wishlist");
        if (wishlistRes.ok) {
          const data = await wishlistRes.json();
          setWishlist(data.wishlist.hoardings || []);
        }

        // Fetch Messages
        const messagesRes = await fetchWithAuth("/api/messages");
        console.log("[BuyerDashboard] Fetch Messages Status:", messagesRes.status);
        if (messagesRes.ok) {
          const data = await messagesRes.json();
          console.log("[BuyerDashboard] Messages received:", data.messages?.length || 0);
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error("[BuyerDashboard] Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Polling for updates
    const pollInterval = setInterval(() => {
      fetchMessages();
    }, 4000);

    return () => clearInterval(pollInterval);
  }, [router]);

  const fetchMessages = async () => {
    try {
      const messagesRes = await fetchWithAuth("/api/messages");
      if (messagesRes.ok) {
        const data = await messagesRes.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("[BuyerDashboard] Polling Error:", error);
    }
  };

  useEffect(() => {
    console.log("[BuyerDashboard] Messages state updated:", messages.length);
  }, [messages]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const removeFromWishlist = async (hoardingId: string) => {
    try {
      const res = await fetchWithAuth("/api/buyer/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hoardingId }),
      });
      if (res.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== hoardingId));
      }
    } catch (error) {
      console.error("Wishlist removal failed", error);
    }
  };

  const sendMessage = async () => {
    if (!chatMessage.trim() || chatLoading) return;

    setChatLoading(true);
    console.log("[BuyerDashboard] Sending message:", chatMessage);
    try {
      const res = await fetchWithAuth("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: chatMessage }),
      });

      console.log("[BuyerDashboard] Send Status:", res.status);
      if (res.ok) {
        const data = await res.json();
        console.log("[BuyerDashboard] Message sent successfully:", data.data);
        setMessages((prev) => [...prev, data.data]);
        setChatMessage("");
      } else {
        const status = res.status;
        const err = await res.json().catch(() => ({}));
        console.error(`[BuyerDashboard] Send Message failed (${status}):`, err);
      }
    } catch (error) {
      console.error("[BuyerDashboard] Error sending chat:", error);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#2563eb]" />
          <p className="text-gray-500 font-medium animate-pulse">
            Loading Your Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden" style={{ fontFamily: "'Chiron GoRound TC', sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 items-center pt-4 pb-8 px-4 hidden lg:flex lg:flex-col">
        <div className="mb-2 w-full px-2"></div>

        <nav className="flex-1 w-full space-y-2">
          {[
            { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
            { id: "campaigns", icon: Package, label: "My Campaigns" },
            { id: "wishlist", icon: Heart, label: "Wishlist" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-[1.02]"
                  : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <item.icon
                size={22}
                className={
                  activeTab === item.id
                    ? "text-white"
                    : "group-hover:scale-110 transition-transform"
                }
              />
              <span className="font-bold text-sm tracking-wide">
                {item.label}
              </span>
              {activeTab === item.id && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
          ))}
        </nav>

        <div className="w-full pt-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut
              size={22}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="hidden md:flex relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search campaigns, dates, locations..."
                className="pl-11 pr-6 py-2.5 bg-white border-2 border-blue-500 rounded-none w-96 text-sm focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 font-bold placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 relative">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-3 rounded-xl relative transition-all ${showNotifications ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400 hover:text-blue-500'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 animate-in fade-in zoom-in-95 duration-200 z-50 overflow-hidden">
                  <div className="px-5 mb-3 flex items-center justify-between">
                    <h4 className="font-black text-gray-900">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`px-5 py-4 hover:bg-gray-50 border-l-4 transition-all duration-300 cursor-pointer group relative ${notif.isRemoving ? 'opacity-0 -translate-x-8 scale-95 border-transparent' : notif.isRead ? 'border-transparent opacity-60' : 'border-blue-500 bg-blue-50/5'}`}
                        >
                          <p className={`text-xs font-bold leading-tight ${notif.isRead ? 'text-gray-500' : 'text-gray-900'}`}>
                            {notif.text}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">{notif.timestamp}</p>
                          {!notif.isRead && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                markRead(notif.id);
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded-md shadow-sm border border-blue-100"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-5 py-10 text-center">
                        <Bell className="mx-auto w-8 h-8 text-gray-200 mb-3" />
                        <p className="text-xs font-bold text-gray-400">You have no new messages.</p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && unreadCount > 0 && (
                    <div className="mt-2 px-5 pt-3 border-t border-gray-50">
                      <button 
                        onClick={markAllAsRead}
                        className="w-full text-[10px] font-black uppercase text-gray-400 hover:text-blue-500 transition-colors text-center"
                      >
                        Mark all as read
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Link href="/profile" className="flex items-center gap-4 pl-6 border-l border-gray-100 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{user?.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Premium Buyer
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl p-[2px] transition-transform group-hover:scale-105 overflow-hidden">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center p-1">
                  <div className="w-full h-full bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-black overflow-hidden">
                    {user?.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.[0].toUpperCase()
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </header>

        <div className="p-10 space-y-10 max-w-7xl mx-auto">
          {activeTab === "overview" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
              {/* Removed Welcome Banner */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                    <IndianRupee size={28} />
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Total Advertising Spend
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-gray-900">
                      ₹{stats.totalSpent.toLocaleString()}
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Package size={28} />
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Ongoing Campaigns
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-gray-900">
                      {activeBookings.length}
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                    <Clock size={28} />
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Pending Inquiries
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-gray-900">
                      {stats.pending}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-gray-900">
                      Recent Campaigns
                    </h3>
                    <button
                      onClick={() => setActiveTab("campaigns")}
                      className="text-blue-600 font-bold text-sm hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activeBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking._id}
                        className="p-4 bg-gray-50/50 rounded-2xl flex items-center gap-6 border border-transparent hover:border-blue-100 transition-all"
                      >
                        <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100 p-1">
                          <img
                            src={
                              booking.hoarding?.images[0] || "/placeholder.jpg"
                            }
                            className="w-full h-full object-cover rounded-lg"
                            alt="hoarding"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">
                            {booking.hoarding?.name || "Deleted Location"}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {booking.hoarding?.location.city}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900">
                            ₹{booking.totalAmount.toLocaleString()}
                          </p>
                          <span className="text-[9px] font-black uppercase text-green-500 bg-green-50 px-2 py-0.5 rounded-lg">Confirmed</span>
                        </div>
                      </div>
                    ))}
                    {activeBookings.length === 0 && <p className="text-center py-10 text-gray-400 font-medium">No active campaigns</p>}
                  </div>
                </div>

                <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm space-y-4">
                  <h3 className="text-lg font-black text-gray-900">
                    Quick Tools
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/"
                      className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                      <Search className="text-gray-400" size={24} />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Explore</span>
                    </Link>
                    <button
                      onClick={() => setActiveTab("chat")}
                      className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                      <MessageSquare className="text-gray-400" size={24} />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Help
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "campaigns" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                Your Campaigns
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all p-6 group"
                  >
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-gray-200 rounded-2xl overflow-hidden shrink-0 border border-gray-50">
                        <img
                          src={booking.hoarding?.images[0] || "/placeholder.jpg"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt="campaign"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-black text-gray-900">
                          {booking.hoarding?.name || "Deleted Location"}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium">
                          {booking.hoarding?.location.city},{" "}
                          {booking.hoarding?.location.state}
                        </p>
                        <div className="flex justify-between items-center pt-2">
                          <p className="text-lg font-black text-blue-600">
                            ₹{booking.totalAmount.toLocaleString()}
                          </p>
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                              booking.status === "confirmed"
                                ? "bg-green-50 text-green-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                   <div className="md:col-span-2 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                      <Package size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 font-bold">You haven&apos;t booked any campaigns yet</p>
                      <Link href="/" className="mt-4 inline-block text-blue-600 font-bold hover:underline">Start Exploring</Link>
                   </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
               <h2 className="text-4xl font-black text-gray-900 tracking-tight">Saved for Later</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wishlist.map((item) => (
                    <div key={item._id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group">
                       <div className="h-48 relative overflow-hidden">
                          <img src={item.images[0] || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <button 
                            onClick={() => removeFromWishlist(item._id)}
                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                       <div className="p-6 space-y-3">
                          <h4 className="font-black text-gray-900 line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                             <MapPin size={12} /> {item.location.city}
                          </p>
                          <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                             <p className="text-lg font-black text-gray-900">₹{item.pricePerMonth.toLocaleString()}<span className="text-xs font-normal text-gray-400">/mo</span></p>
                             <Link href={`/bookings/${item._id}`} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                <ArrowUpRight size={18}/>
                             </Link>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
               {wishlist.length === 0 && (
                 <div className="text-center pt-20">
                    <Heart size={80} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 font-bold text-lg">Your Wishlist is Empty</p>
                    <Link href="/" className="mt-8 inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-blue-100">Find Locations</Link>
                 </div>
               )}
            </div>
          )}

          {activeTab === "chat" && (
            <div className="animate-in fade-in zoom-in-95 duration-500 h-[calc(100vh-220px)] flex flex-col bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden relative">
              <div className="p-8 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white relative">
                    <User size={28} />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Admin Support</h3>
                    <p className="text-xs font-bold text-green-500 uppercase tracking-widest">
                      Online
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-gray-50/30">
                {messages.length === 0 && (
                  <div className="text-center py-20 opacity-50 space-y-2">
                    <MessageSquare size={48} className="mx-auto text-gray-300" />
                    <p className="font-bold text-gray-400">Start a conversation with us</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === user?._id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-6 rounded-[28px] ${
                        msg.sender === user?._id
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-50 rounded-tr-none"
                          : "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none font-medium text-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-white border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    disabled={chatLoading}
                    placeholder={chatLoading ? "Sending..." : "Type your message..."}
                    className="w-full pl-8 pr-20 py-5 bg-gray-50 border-none rounded-2xl text-sm outline-none font-medium"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={chatLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                  >
                    {chatLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
