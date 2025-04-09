"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#171717] text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">initStore</h3>
          <p className="text-sm">
            Your one-stop destination for top-quality products with seamless shopping experiences.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-md font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="#"><Facebook className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Instagram className="w-5 h-5 hover:text-white" /></Link>
            <Link href="#"><Twitter className="w-5 h-5 hover:text-white" /></Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-md font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@initStore.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 800 123 4567</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-white mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} initStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
