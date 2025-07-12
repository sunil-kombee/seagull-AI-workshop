import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-semibold mb-2">CleanCo</div>
            <p className="text-sm text-gray-500">
              Professional cleaning services for homes and businesses. Quality
              guaranteed.
            </p>
          </div>
          {/* Services */}
          <div>
            <div className="font-semibold mb-2">Services</div>
            <ul className="space-y-1 text-gray-600">
              <li>House Cleaning</li>
              <li>Deep Cleaning</li>
              <li>Office Cleaning</li>
              <li>Move-in/Move-out</li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <div className="font-semibold mb-2">Company</div>
            <ul className="space-y-1 text-gray-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <div className="font-semibold mb-2">Support</div>
            <ul className="space-y-1 text-gray-600">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CleanCo. All rights reserved.
          </div>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-gray-900">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-900">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-900">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-900">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
