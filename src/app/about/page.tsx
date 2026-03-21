import Image from "next/image";
import { Building2, Target, Users, Award, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Modern About & Features Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Left Column: Heading & Content */}
          <div className="space-y-12 pr-0 lg:pr-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                About <span className="text-[#2563eb]">HoardSpace</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-semibold">
                Hoardspace is a digital marketplace transforming the way outdoor
                advertising is discovered, planned, and booked. Search, compare, and
                book premium locations across Indian cities through a
                transparent, technology-driven platform.
              </p>
              
              <div className="mt-12 flex flex-wrap gap-10">
                  <div className="flex flex-col">
                      <span className="text-4xl font-black text-slate-900">10k+</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mt-2">Premium Boards</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-4xl font-black text-slate-900">24/7</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mt-2">Support Team</span>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Column: Billboard Image & Floating Attached Features */}
          <div className="relative h-full w-full min-h-[600px] flex items-center justify-center mt-12 lg:mt-0">
            {/* Image Container */}
            <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 border-8 border-white mx-auto z-10">
              <Image
                src="/billboard.jpg"
                alt="HoardSpace Premium Billboard"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2563eb]/20 via-transparent to-transparent pointer-events-none mix-blend-multiply"></div>
            </div>

            {/* Floating Attached Feature 1: Top Left */}
            <div className="absolute top-[5%] left-0 lg:-left-12 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-1 transition-transform w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500 rounded-lg shrink-0">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 leading-tight">Premium Locations</h3>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-1">Prime hoarding spots across India.</p>
            </div>

            {/* Floating Attached Feature 2: Top Right */}
            <div className="absolute top-[25%] right-0 lg:-right-8 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-1 transition-transform w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#2563eb] rounded-lg shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 leading-tight">Verified Vendors</h3>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-1">Strict KYC for security & trust.</p>
            </div>

            {/* Floating Attached Feature 3: Bottom Left */}
            <div className="absolute bottom-[25%] left-4 lg:-left-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-1 transition-transform w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500 rounded-lg shrink-0">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 leading-tight">Transparent Pricing</h3>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-1">Clear pricing. No hidden costs.</p>
            </div>

            {/* Floating Attached Feature 4: Bottom Right */}
            <div className="absolute bottom-[5%] right-4 lg:-right-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-1 transition-transform w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-500 rounded-lg shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 leading-tight">Easy Booking</h3>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-1">Instant secure online payments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
