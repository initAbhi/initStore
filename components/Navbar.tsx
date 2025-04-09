"use client";
import React, { useState } from "react";
import Link from "next/link";
import UserProfileButton from "./UserProfileButton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
//fixed db
const Navbar = () => {
  const { status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <div className="bg-gradient-to-br from-white to-gray-100 px-4 sm:px-6 py-4 shadow-sm">
        <header className="flex justify-between items-center">
          {/* Logo */}
          <motion.h1
            className="text-3xl font-[pacifico] font-bold text-gray-800 hover:text-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">InitStore</Link>
          </motion.h1>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2 mr-4">
              {navLinks.map((link) => (
                <Button key={link.name} variant="ghost">
                  <Link href={link.path} className="hover:text-blue-600">
                    {link.name}
                  </Link>
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="block md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            {/* Auth/Profile */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {status === "loading" && <p>Loading...</p>}
              {status === "unauthenticated" && (
                <Link
                  href="/signin"
                  className="font-[poppins] font-bold bg-black text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                >
                  Sign in
                </Link>
              )}
              {status !== "loading" && status !== "unauthenticated" && <UserProfileButton />}
            </motion.div>
          </div>
        </header>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.4)]"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-gray-700 hover:text-blue-600 text-lg font-medium"
              onClick={toggleSidebar}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
