import {
  FileText,
  Shield,
  Users,
  CreditCard,
  AlertCircle,
  Scale,
  Mail,
} from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <FileText className="w-12 h-12 text-[#2563eb]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="text-[#2563eb]">Conditions</span>
          </h1>
          <p className="text-lg text-gray-600">Last Updated: March 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Welcome to Hoardspace. These Terms and Conditions govern your use of
            the Hoardspace platform and services. By accessing or using our
            website, you agree to comply with and be bound by these terms.
          </p>
        </div>

        {/* Section 1: Platform Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Shield className="w-6 h-6 text-[#2563eb]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Platform Overview
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Hoardspace is a digital marketplace that connects advertisers,
            agencies, and hoarding vendors to discover, compare, and book
            outdoor advertising spaces.
          </p>
        </div>

        {/* Section 2: User Accounts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-50 rounded-xl">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              2. User Accounts
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To use certain services on our platform, users may be required to
            create an account. Users are responsible for maintaining the
            confidentiality of their login credentials and for all activities
            conducted under their accounts.
          </p>
        </div>

        {/* Section 3: Listings and Availability */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Listings and Availability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Hoardspace allows vendors to list advertising spaces and advertisers
            to browse and book available hoardings. While we aim to ensure
            accuracy, Hoardspace does not guarantee the completeness or
            reliability of vendor-provided listing information.
          </p>
        </div>

        {/* Section 4: Booking and Payments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-50 rounded-xl">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Booking and Payments
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Bookings made through Hoardspace may require payment through
            integrated payment gateways. Once a booking is confirmed, the
            advertiser and vendor must follow the agreed campaign timeline and
            advertising terms.
          </p>
        </div>

        {/* Section 5: User Responsibilities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 rounded-xl">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              5. User Responsibilities
            </h2>
          </div>
          <p className="text-gray-700 mb-4">Users agree not to:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Provide false or misleading information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>
                Use the platform for illegal or unauthorized activities
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2563eb] mt-1">•</span>
              <span>Attempt to disrupt or damage the platform</span>
            </li>
          </ul>
        </div>

        {/* Section 6: Intellectual Property */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content, design, logos, and materials on the Hoardspace platform
            are the intellectual property of Hoardspace Bookings Private Limited
            unless otherwise stated.
          </p>
        </div>

        {/* Section 7: Limitation of Liability */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-50 rounded-xl">
              <Scale className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Limitation of Liability
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Hoardspace acts as a marketplace connecting advertisers and vendors.
            We are not responsible for disputes, delays, or damages resulting
            from vendor services or advertising campaign execution.
          </p>
        </div>

        {/* Section 8: Changes to Terms */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Hoardspace may update these Terms & Conditions at any time.
            Continued use of the platform constitutes acceptance of the updated
            terms.
          </p>
        </div>

        {/* Section 9: Contact Information */}
        <div className="bg-blue-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">9. Contact Information</h2>
          </div>
          <p className="mb-6 leading-relaxed">
            For questions regarding these terms, contact:
          </p>
          <div className="space-y-2">
            <p className="font-semibold">Hoardspace Bookings Private Limited</p>
            <p>Email: bookings@hoardspace.in</p>
            <p>Website: www.hoardspace.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
