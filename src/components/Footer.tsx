import { Fragment } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

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
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#5b40e6] group-hover:bg-[#4834b8] transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] tracking-widest font-semibold text-gray-400">
                  THE
                </span>
                <span className="text-lg font-bold tracking-wide text-white">
                  HOARDSPACE
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              India's leading platform for booking premium outdoor advertising
              spaces. Connect with verified vendors and grow your brand's
              visibility across top cities.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:support@hoardspace.com"
                className="flex items-center gap-2 text-sm hover:text-[#5b40e6] transition-colors"
              >
                <Mail size={16} />
                <span>support@hoardspace.com</span>
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 text-sm hover:text-[#5b40e6] transition-colors"
              >
                <Phone size={16} />
                <span>+91 123 456 7890</span>
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>
                  123 Business Hub, Andheri East,
                  <br />
                  Mumbai, Maharashtra 400069
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
                    className="text-sm hover:text-[#5b40e6] transition-colors"
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
                    className="text-sm hover:text-[#5b40e6] transition-colors"
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
                    className="text-sm hover:text-[#5b40e6] transition-colors"
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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#5b40e6] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#5b40e6] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#5b40e6] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#5b40e6] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6">
            {legal.map((link, index) => (
              <Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-[#5b40e6] transition-colors"
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
            <p className="text-xs text-gray-600 mt-2">Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
