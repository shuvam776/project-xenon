import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
  ];

  const categories = [
    { name: "Billboard", href: "/search?type=Billboard" },
    { name: "Unipole", href: "/search?type=Unipole" },
    { name: "Gantry", href: "/search?type=Gantry" },
    { name: "Bus Shelter", href: "/search?type=Bus%20Shelter" },
    { name: "Kiosk", href: "/search?type=Kiosk" },
  ];

  const popularCities = [
    { name: "Mumbai", href: "/search?city=Mumbai" },
    { name: "Delhi", href: "/search?city=Delhi" },
    { name: "Bangalore", href: "/search?city=Bangalore" },
    { name: "Hyderabad", href: "/search?city=Hyderabad" },
    { name: "Chennai", href: "/search?city=Chennai" },
    { name: "Kolkata", href: "/search?city=Kolkata" },
  ];

  const legal = [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/companyLogo/Screenshot 2026-03-02 at 02.10.29.png"
                alt="HoardSpace Logo"
                width={180}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              India's leading platform for booking premium outdoor advertising
              spaces. Connect with verified vendors and grow your brand's
              visibility across top cities.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:bookings@hoardspace.in"
                className="flex items-center gap-2 text-sm hover:text-[#2563eb] transition-colors"
              >
                <Mail size={16} />
                <span>bookings@hoardspace.in</span>
              </a>
              <a
                href="tel:+917655052057"
                className="flex items-center gap-2 text-sm hover:text-[#2563eb] transition-colors"
              >
                <Phone size={16} />
                <span>7655-052057</span>
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>
                  TI-103(A), First Floor, TIIR Building (FTBI),
                  <br />
                  NIT Rourkela Campus, Odisha - 769008
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#2563eb] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm hover:text-[#2563eb] transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Popular Cities
            </h3>
            <ul className="space-y-2">
              {popularCities.map((city) => (
                <li key={city.name}>
                  <Link
                    href={city.href}
                    className="text-sm hover:text-[#2563eb] transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 md:mb-0">
                Follow Us
              </h4>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/hoardspace-bookings-private-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#2563eb] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/hoardspace1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#2563eb] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.youtube.com/@HoardSpace"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#2563eb] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Supported By Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center mb-6">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Supported By
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            <a
              href="https://msh.meity.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors w-full h-20 flex items-center justify-center"
            >
              <Image
                src="/logos/IMG_2179.PNG"
                alt="Institution Logo"
                width={100}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </a>
            <a
              href="https://msme.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors w-full h-20 flex items-center justify-center"
            >
              <Image
                src="/logos/IMG_2180.JPG"
                alt="Institution Logo"
                width={100}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </a>
            <a
              href="https://www.nitrkl.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors w-full h-20 flex items-center justify-center"
            >
              <Image
                src="/logos/IMG_2181.PNG"
                alt="Institution Logo"
                width={100}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </a>
            <a
              href="https://www.ftbi-nitrkl.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors w-full h-20 flex items-center justify-center"
            >
              <Image
                src="/logos/IMG_2182.PNG"
                alt="Institution Logo"
                width={100}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </a>
            <a
              href="https://startupodisha.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors w-full h-20 flex items-center justify-center"
            >
              <Image
                src="/logos/IMG_2183.PNG"
                alt="Institution Logo"
                width={100}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </a>
            <a
              href="https://www.startupindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors w-full h-20 flex items-center justify-center"
            >
              <Image
                src="/logos/IMG_2184.JPG"
                alt="Institution Logo"
                width={100}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6">
            {legal.map((link, index) => (
              <Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-[#2563eb] transition-colors"
                >
                  {link.name}
                </Link>
                {index < legal.length - 1 && (
                  <span className="text-gray-700">|</span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} HoardSpace. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Made with ❤️ by Team Webwiz
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
