"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  MapPin, 
  Tag, 
  User, 
  Maximize, 
  Zap, 
  Truck, 
  Clock, 
  Calendar,
  Share2,
  Heart,
  MessageSquare,
  Loader2
} from "lucide-react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

interface HoardingDetailClientProps {
  hoarding: any;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
};

export default function HoardingDetailClient({ hoarding }: HoardingDetailClientProps) {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState({ start: "", end: "" });
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [dateError, setDateError] = useState("");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/hoardings/${hoarding._id}/availability`);
        if (res.ok) {
          const data = await res.json();
          setBlockedDates(data.blockedRanges || []);
        }
      } catch (err) {
        console.error("Failed to fetch availability", err);
      }
    };
    fetchAvailability();
  }, [hoarding._id]);

  const validateDates = (start: string, end: string) => {
    if (!start || !end) return true;
    const s = new Date(start);
    const e = new Date(end);
    
    if (s > e) {
      setDateError("Start date cannot be after end date");
      return false;
    }

    const overlap = blockedDates.find(range => {
      const bStart = new Date(range.startDate);
      const bEnd = new Date(range.endDate);
      return s <= bEnd && e >= bStart;
    });

    if (overlap) {
      setDateError("Selected dates overlap with an existing booking or block.");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleDateChange = (type: "start" | "end", value: string) => {
    const newDates = { ...selectedDates, [type]: value };
    setSelectedDates(newDates);
    validateDates(newDates.start, newDates.end);
  };

  const handleBookNow = () => {
    if (!validateDates(selectedDates.start, selectedDates.end)) return;
    const query = new URLSearchParams(selectedDates).toString();
    router.push(`/bookings/${hoarding._id}?${query}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hoarding.name,
        text: hoarding.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const propertyDetails = [
    { label: "Property Code", value: hoarding.hoardingCode || "N/A", icon: Tag },
    { label: "Property Type", value: hoarding.type || "Billboard", icon: Maximize },
    { label: "Lit Type", value: hoarding.lightingType || "Non-Lit", icon: Zap },
    { label: "Traffic From", value: hoarding.trafficFrom || "N/A", icon: Truck },
    { label: "Size (W x H)", value: `${hoarding.dimensions?.width || 0} x ${hoarding.dimensions?.height || 0} Feet`, icon: Maximize },
    { label: "Square Feet", value: `${(hoarding.dimensions?.width || 0) * (hoarding.dimensions?.height || 0)} sq ft`, icon: Maximize },
    { label: "Traffic Data", value: `${hoarding.uniqueReach || 0} unique reach/ week`, icon: User },
    { label: "Structure Type", value: hoarding.structureType || "Hoarding", icon: Maximize },
    { label: "Available", value: hoarding.availabilityStatus || "Immediately", icon: Clock },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#2563eb] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <Link href={`/explore?city=${hoarding.location.city}`} className="hover:text-[#2563eb] transition-colors uppercase">{hoarding.location.city}</Link>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-[#2563eb] font-medium">{hoarding.name}</span>
      </nav>

      {/* Title and Location Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{hoarding.name}</h1>
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-[#2563eb]" />
          <span>{hoarding.location.address}, {hoarding.location.city}, {hoarding.location.state}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media, Property Details, Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
            <Image
              src={hoarding.images?.[0] || 'https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?auto=format&fit=crop&q=80&w=2000'}
              alt={hoarding.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Property Details Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-50">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
              {propertyDetails.map((detail, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{detail.label}:</span>
                  <span className="text-sm font-semibold text-gray-800">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-50">Description</h2>
            <p className="text-gray-600 leading-relaxed italic text-[15px]">
              {hoarding.description || "This large format billboard is strategically located on the busy road, facing traffic moving towards major hubs. Excellent visibility near educational institutions and residential areas. Ideal for targeting students, professionals, and local residents. Front-lit for nighttime visibility."}
            </p>
          </div>
        </div>

        {/* Right Column: Actions, Pricing, Map */}
        <div className="space-y-8">
          {/* Campaign Dates Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-md font-bold text-gray-900 mb-4">Select Campaign Dates</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Start Date</span>
                  <input 
                    type="date"
                    value={selectedDates.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  />
                  <Calendar className="absolute right-4 bottom-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">End Date</span>
                  <input 
                    type="date"
                    value={selectedDates.end}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                  />
                  <Calendar className="absolute right-4 bottom-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {dateError && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg font-medium">
                  {dateError}
                </div>
              )}

              {blockedDates.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Already Booked:</span>
                  <div className="max-h-24 overflow-y-auto space-y-1 pr-2 custom-scrollbar text-[11px]">
                    {blockedDates.map((range, i) => (
                      <div key={i} className="flex justify-between text-gray-500 bg-gray-50 p-2 rounded-md border border-gray-100">
                        <span>{new Date(range.startDate).toLocaleDateString()} - {new Date(range.endDate).toLocaleDateString()}</span>
                        <span className="text-red-400 font-bold uppercase text-[9px]">{range.type === 'booking' ? 'Booked' : 'Blocked'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={handleBookNow}
                disabled={!!dateError || !selectedDates.start || !selectedDates.end}
                className="w-full bg-[#2563eb] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book
              </button>
            </div>
          </div>

          {/* Pricing Details Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-md font-bold text-gray-900 mb-4">Pricing Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Approx. Cost:</span>
                <span className="text-gray-900 font-bold">₹ {hoarding.pricePerMonth?.toLocaleString('en-IN') || '60,000'} / Month</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-4">
                <span className="text-gray-500 font-medium">Print & Mount:</span>
                <span className="text-gray-900 font-bold text-xs uppercase">Additional ₹ 17 / Sq Feet</span>
              </div>
              
              <div className="pt-2 space-y-3">
                <button className="w-full bg-[#2563eb] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  Add to Wishlist
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Enquire Now
                </button>
                <button 
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 text-gray-500 py-2 text-sm font-medium hover:text-[#2563eb] transition-colors"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Location Map Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="text-md font-bold text-gray-900 mb-4">Location Map</h3>
            <div className="relative">
              {!isLoaded ? (
                <div className="w-full h-[300px] bg-gray-50 rounded-xl flex items-center justify-center">
                  <Loader2 className="animate-spin text-blue-500" />
                </div>
              ) : loadError ? (
                <div className="w-full h-[300px] bg-red-50 rounded-xl flex items-center justify-center text-red-500 text-sm p-4 text-center">
                  Failed to load map. Please check your API key.
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={hoarding.location.coordinates || { lat: 20.2961, lng: 85.8245 }}
                  zoom={15}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                >
                  {hoarding.location.coordinates && (
                    <Marker position={hoarding.location.coordinates} />
                  )}
                </GoogleMap>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/explore" className="text-blue-600 text-sm font-bold hover:underline uppercase tracking-wider">
              View Similar Media
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
