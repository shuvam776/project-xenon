"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Navigation } from "lucide-react";
import { INDIAN_CITIES, HOARDING_TYPES } from "@/utils/cities";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState(INDIAN_CITIES);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter cities based on input
  useEffect(() => {
    if (cityInput.trim() === "") {
      setFilteredCities(INDIAN_CITIES);
    } else {
      const filtered = INDIAN_CITIES.filter(
        (cityObj) =>
          cityObj.city.toLowerCase().includes(cityInput.toLowerCase()) ||
          cityObj.state.toLowerCase().includes(cityInput.toLowerCase()) ||
          cityObj.display.toLowerCase().includes(cityInput.toLowerCase()),
      );
      setFilteredCities(filtered);
    }
  }, [cityInput]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (cityObj: (typeof INDIAN_CITIES)[0]) => {
    setSelectedCity(cityObj.city);
    setCityInput(cityObj.display);
    setShowSuggestions(false);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Call geocoding API to get city name
          const res = await fetch(
            `/api/geocode?type=coordinates&lat=${latitude}&lng=${longitude}`,
          );

          if (!res.ok) {
            console.error("Geocode API error:", res.status, res.statusText);
            alert("Failed to get location details. Please try again.");
            setIsGettingLocation(false);
            return;
          }

          const data = await res.json();

          console.log("Geocode response:", data); // Debug log

          // Try to get city, area, or state as fallback
          const locationName = data.city || data.area || data.state;

          console.log("Detected location:", locationName); // Debug log

          if (locationName) {
            // Find matching city in our list
            const cityObj = INDIAN_CITIES.find(
              (c) =>
                c.city.toLowerCase() === locationName.toLowerCase() ||
                c.display.toLowerCase().includes(locationName.toLowerCase()),
            );

            console.log("Matched city object:", cityObj); // Debug log

            if (cityObj) {
              handleCitySelect(cityObj);
              console.log("Set city from list:", cityObj.display); // Debug log
            } else {
              // If not in our predefined list, just use the location name
              setSelectedCity(locationName);
              setCityInput(locationName);
              console.log("Set city directly:", locationName); // Debug log
            }
          } else {
            alert(
              "Could not determine city from your location. Please select manually.",
            );
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          alert("Failed to get location details. Please try again.");
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get your location. Please enable location access.");
        setIsGettingLocation(false);
      },
    );
  };

  const handleSearch = () => {
    // Build query params
    const params = new URLSearchParams();
    if (selectedCity) params.append("city", selectedCity);
    if (selectedType) params.append("type", selectedType);

    // Navigate to search page
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* City Input with Autocomplete */}
        <div className="md:col-span-5 relative" ref={suggestionsRef}>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
            City
          </label>
          <div className="relative">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => {
                setCityInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search by city (e.g., Mumbai, Maharashtra)"
              className="w-full px-4 py-3.5 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5b40e6] focus:border-[#5b40e6] outline-none transition-all text-sm font-medium text-gray-900"
            />
            <MapPin
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={isGettingLocation}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#5b40e6] hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
              title="Use current location"
            >
              <Navigation
                size={18}
                className={isGettingLocation ? "animate-pulse" : ""}
              />
            </button>
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
              {filteredCities.slice(0, 10).map((cityObj, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(cityObj)}
                  className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                >
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-900">
                    {cityObj.display}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hoarding Type Dropdown */}
        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
            Hoarding Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5b40e6] focus:border-[#5b40e6] outline-none transition-all bg-white text-sm font-medium text-gray-700"
          >
            <option value="">All Types</option>
            {HOARDING_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="md:col-span-3 flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-[#5b40e6] hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Search size={20} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
