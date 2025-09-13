"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 px-6 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-600/10 to-orange-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">InitStore</h3>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Your premium destination for high-quality smartphone cases and accessories. Protecting your device with style and elegance.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform">Home</Link></li>
            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform">Products</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform">About Us</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group">
              <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors group">
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </Link>
            <Link href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors group">
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </Link>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-400">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              support@initStore.com
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              +1 800 123 4567
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="border-t border-gray-700 mt-12 pt-8 text-center"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} InitStore. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
