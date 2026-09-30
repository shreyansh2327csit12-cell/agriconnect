import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              AgriConnect
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering Farmers Through Technology
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                Registered Office:
              </p>
              <address className="text-gray-600 dark:text-gray-400 not-italic">
                123 Agri Tech Park<br />
                New Delhi - 110001<br />
                India
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-green-600 dark:text-gray-400">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-green-600 dark:text-gray-400">About Us</a>
              </li>
              <li>
                <a href="/products" className="text-gray-600 hover:text-green-600 dark:text-gray-400">Products</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-green-600 dark:text-gray-400">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Contact Us
            </h4>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                Phone: <a href="tel:+911234567890" className="hover:text-green-600">+91 12345 67890</a>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Email: <a href="mailto:support@agriconnect.com" className="hover:text-green-600">support@agriconnect.com</a>
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} AgriConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}