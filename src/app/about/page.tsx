import { Building2, Target, Users, Award, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-[#2563eb]">HoardSpace</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search, Book and Manage thousands of hoardings all across India.
          </p>
        </div>

        {/* About Us */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Target className="w-8 h-8 text-[#2563eb]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">About Us</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Hoardspace is a digital marketplace transforming the way outdoor
              advertising is discovered, planned, and booked. Our platform
              enables brands, advertisers, and agencies to search, compare, and
              book premium hoarding locations across cities through a
              transparent and technology-driven system. By bringing outdoor
              advertising online, Hoardspace simplifies campaign planning and
              makes it easier for advertisers to access high-visibility
              advertising spaces.
            </p>
            <p>
              The platform also empowers hoarding vendors and media owners to
              list their inventory, manage bookings, and connect directly with
              advertisers and agencies. By streamlining discovery, availability,
              and campaign management, Hoardspace aims to bring efficiency and
              transparency to the outdoor advertising ecosystem.
            </p>
            <p>
              Hoardspace is led by a team of passionate innovators from leading
              institutions including IIT and NIT, working to modernize the
              traditional billboard advertising industry through technology. Our
              vision is to build a scalable digital infrastructure for outdoor
              advertising that makes launching and managing campaigns faster,
              smarter, and more accessible across India.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="p-3 bg-green-50 rounded-xl w-fit mb-4">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Premium Locations
            </h3>
            <p className="text-gray-600">
              Access to thousands of prime hoarding locations in major cities
              across India.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="p-3 bg-blue-50 rounded-xl w-fit mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Verified Vendors
            </h3>
            <p className="text-gray-600">
              All vendors are verified through our KYC process for your security
              and trust.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="p-3 bg-purple-50 rounded-xl w-fit mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Transparent Pricing
            </h3>
            <p className="text-gray-600">
              Clear pricing with no hidden costs. Book with confidence and
              manage everything online.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="p-3 bg-orange-50 rounded-xl w-fit mb-4">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Simple booking process with instant confirmation and secure
              payment options.
            </p>
          </div>
        </div>

         
        {/* Team Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-[#2563eb]">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Driven by innovation and expertise, our team is committed to
              transforming outdoor advertising in India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Debi Prasad Sahoo
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Founder & CEO
                </p>
                <p className="text-sm text-gray-600">
                  Chemical Engineering
                  <br />
                  NIT Rourkela
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Ankush Senapati
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Chief Financial Officer
                </p>
                <p className="text-sm text-gray-600">
                  BS Economics
                  <br />
                  IIT Patna
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Roupya Swasat Prusty
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Business Development Lead
                </p>
                <p className="text-sm text-gray-600">
                  Petroleum Engineering
                  <br />
                  IIT (ISM) Dhanbad
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Preetam Samal
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Head of Marketing
                </p>
                <p className="text-sm text-gray-600">
                  Food Processing
                  <br />
                  NIT Rourkela
                </p>
              </div>
            </div>

            {/* Team Member 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Debansh Sahu
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Co-founder & CTO
                </p>
                <p className="text-sm text-gray-600">
                  Computer Science
                  <br />
                  NIT Rourkela
                </p>
              </div>
            </div>

            {/* Team Member 6 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Churepally Neha
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Head of Design
                </p>
                <p className="text-sm text-gray-600">
                  Civil Engineering
                  <br />
                  NIT Rourkela
                </p>
              </div>
            </div>

            {/* Team Member 7 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Pulin Mohapatra
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Head of Operations
                </p>
                <p className="text-sm text-gray-600">
                  Mechanical Engineering
                  <br />
                  NIT Rourkela
                </p>
              </div>
            </div>

            {/* Team Member 8 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Durgaprasad Sahoo
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Co-founder & Head of AI/ML
                </p>
                <p className="text-sm text-gray-600">
                  Artificial Intelligence
                  <br />& Machine Learning
                </p>
              </div>
            </div>

            {/* Team Member 9 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                  <User className="w-16 h-16 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Omkar Ashutosh Behera
                </h3>
                <p className="text-[#2563eb] font-semibold mb-2">
                  Head of Business Development
                </p>
                <p className="text-sm text-gray-600">
                  Electronics & Communication
                  <br />
                  NIT Rourkela
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
