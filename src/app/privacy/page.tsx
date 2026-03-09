import { Shield, Lock, Eye, Users, FileText, Globe, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <Shield className="w-12 h-12 text-[#2563eb]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy <span className="text-[#2563eb]">Policy</span>
          </h1>
          <p className="text-lg text-gray-600">Last Updated: March 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Hoardspace Bookings Private Limited ("Hoardspace", "we", "our", or
            "us") values your privacy and is committed to protecting your
            personal information. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website or use our services.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <FileText className="w-6 h-6 text-[#2563eb]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Information We Collect
            </h2>
          </div>
          <p className="text-gray-700 mb-6">
            We may collect the following types of information when you use our
            platform:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Personal Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Company name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Billing information</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Business Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Advertising campaign details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Hoarding location listings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Vendor or advertiser account details</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Technical Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>IP address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Browser type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Device information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563eb] mt-1">•</span>
                  <span>Pages visited on our platform</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: How We Use Your Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-50 rounded-xl">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              2. How We Use Your Information
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            We use the collected information to:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Provide and operate the Hoardspace platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>
                Enable advertisers to discover and book hoarding spaces
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>
                Allow vendors to list and manage advertising inventory
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Process payments and bookings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Improve platform performance and user experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>
                Communicate updates, support responses, and service
                notifications
              </span>
            </li>
          </ul>
        </div>

        {/* Section 3: Information Sharing */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Information Sharing
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            We do not sell personal information. However, we may share
            information with:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>
                Advertising vendors or advertisers involved in bookings
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Payment processing partners</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Service providers supporting our platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Legal authorities when required by law</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Data Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-50 rounded-xl">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Data Security
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable technical and organizational measures to
            protect your personal information from unauthorized access, misuse,
            or disclosure.
          </p>
        </div>

        {/* Section 5: Cookies */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 rounded-xl">
              <Globe className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Cookies and Tracking Technologies
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Our website may use cookies and similar technologies to enhance
              user experience, analyze website traffic, and improve our
              services.
            </p>
            <p>
              Users may disable cookies through their browser settings, though
              some platform features may not function properly.
            </p>
          </div>
        </div>

        {/* Section 6: Third-Party Services */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our platform may integrate with third-party services such as payment
            gateways, analytics tools, or hosting providers. These services
            operate under their own privacy policies.
          </p>
        </div>

        {/* Section 7: User Rights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. User Rights
          </h2>
          <p className="text-gray-700 mb-4">Users may request to:</p>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Access their personal information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Correct inaccurate data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Request deletion of their account information</span>
            </li>
          </ul>
          <p className="text-gray-700">
            Such requests can be made by contacting us through the details
            below.
          </p>
        </div>

        {/* Section 8: Changes to Policy */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Changes to this Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Hoardspace may update this Privacy Policy periodically. Updated
            versions will be posted on this page with a revised effective date.
          </p>
        </div>

        {/* Section 9: Contact Us */}
        <div className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">9. Contact Us</h2>
          </div>
          <p className="mb-6 leading-relaxed">
            If you have questions about this Privacy Policy or how your data is
            handled, please contact:
          </p>
          <div className="space-y-2">
            <p className="font-semibold">Hoardspace Bookings Private Limited</p>
            <p>Email: support@hoardspace.in</p>
            <p>Website: www.hoardspace.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
