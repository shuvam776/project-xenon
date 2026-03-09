import dbConnect from "@/lib/dbConnect";
import Hoarding from "@/models/Hoarding";
import HoardingsClient from "@/components/HoardingsClient";
import SearchBar from "@/components/SearchBar";

// Force dynamic rendering to ensure we get latest data
export const dynamic = "force-dynamic";

async function getHoardings() {
  await dbConnect();
  // In a real scenario, we might want to filter by status='approved'
  const hoardings = await Hoarding.find({ status: "approved" }).sort({
    createdAt: -1,
  });
  return JSON.parse(JSON.stringify(hoardings));
}

export default async function Home() {
  const hoardings = await getHoardings();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-[#2563eb] via-blue-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find the Perfect Hoarding Space
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover and book premium outdoor advertising locations across top
            cities in India.
          </p>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* All Hoardings Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <HoardingsClient hoardings={hoardings} />
      </div>
    </div>
  );
}
