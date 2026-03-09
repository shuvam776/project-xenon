import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Mail,
} from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <CreditCard className="w-12 h-12 text-[#2563eb]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Refund & <span className="text-[#2563eb]">Cancellation Policy</span>
          </h1>
          <p className="text-lg text-gray-600">Last Updated: March 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            At Hoardspace, we aim to provide a transparent and reliable platform
            for outdoor advertising bookings.
          </p>
        </div>

        {/* Section 1: Booking Confirmation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl">
              <FileText className="w-6 h-6 text-[#2563eb]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Booking Confirmation
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Bookings are considered confirmed only after successful payment and
            confirmation from the platform.
          </p>
        </div>

        {/* Section 2: Cancellation Policy */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 rounded-xl">
              <XCircle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              2. Cancellation Policy
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Advertisers may request cancellation of bookings before the campaign
            start date. Cancellation requests must be submitted through the
            Hoardspace platform or via official communication channels.
          </p>
        </div>

        {/* Section 3: Refund Eligibility */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Refund Eligibility
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            Refunds may be provided under the following circumstances:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Campaign cancellation before vendor confirmation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Unavailability of the selected hoarding location</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Technical or booking errors caused by the platform</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Non-Refundable Situations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-50 rounded-xl">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Non-Refundable Situations
            </h2>
          </div>
          <p className="text-gray-700 mb-4">Refunds may not be issued if:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>The advertising campaign has already started</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>Cancellation occurs after the campaign start date</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>Services have already been delivered by the vendor</span>
            </li>
          </ul>
        </div>

        {/* Section 5: Refund Processing */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Refund Processing
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Approved refunds will be processed through the original payment
            method within 7–10 business days, depending on the payment provider.
          </p>
        </div>

        {/* Section 6: Contact for Refund Requests */}
        <div className="bg-blue-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">
              6. Contact for Refund Requests
            </h2>
          </div>
          <p className="mb-6 leading-relaxed">
            For cancellation or refund requests, contact:
          </p>
          <div className="space-y-2">
            <p className="font-semibold">Hoardspace Bookings Private Limited</p>
            <p>Email: bookings@hoardspace.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
