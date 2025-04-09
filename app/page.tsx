"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";
import UserProfileButton from "@/components/UserProfileButton";
import { useSession } from "next-auth/react";
import { Carousel } from "@/components/carousel";
import { useRouter } from "next/navigation";
import LoaderNew from "@/components/LoaderNew";
import { Menu, X } from "lucide-react";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Cart", path: "/cart" },
];
  const router = useRouter();
  const { data, status } = useSession();
  const [productList, setproductList] = useState<any>();
  const categories = ["Electronics", "Fashion", "Home", "Books", "Fitness"];
//added
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/products`);
      const { products } = await data.json();
      setproductList(products);
    };
    fetchData();
  }, []);

  if (!productList)
    return (
      <div className="flex min-h-screen w-full justify-center items-center">
        {/* <Loader color="#171717" glow="#737272" /> */}
        <LoaderNew />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
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


        {/* Hero Section */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-12 sm:py-16">
          {/* Sidebar Overlay */}
{isSidebarOpen && (
  <div
    className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.4)]"
    onClick={toggleSidebar}
  />
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Discover the Future of Shopping
            </h2>
            <p className="text-gray-600 text-md sm:text-lg">
              Explore top products with exclusive deals and unmatched
              convenience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button asChild className="px-6 py-3 text-lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" className="px-6 py-3 text-lg">
              <Link href="/about">About us</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              <Image
                src={productList[0].images[0]}
                alt="Hero Product"
                width={450}
                height={450}
                className="rounded-2xl shadow-lg object-cover w-full h-auto"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-2 right-2 bg-white shadow-md rounded-full p-2"
              >
                <ShoppingBag className="w-6 h-6 text-gray-800" />
              </motion.div>
            </div>
          </motion.div>
        </main>

        {/* Features Section */}
        <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Fast Shipping", "Top Rated", "24/7 Support"].map(
            (feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {feature}
                  </h3>
                </div>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  itaque.
                </p>
              </motion.div>
            )
          )}
        </section>

        {/* Carousel */}
        <section className="py-12">
          <Carousel products={productList} />
        </section>
        {/* Hero Banner */}
        {/* <div className="mt-6 sm:h-[400px] rounded-xl bg-[url('/hero-banner.png')] bg-cover bg-center flex justify-center items-center">
          <div className="bg-white/80 p-6 sm:p-10 rounded-xl text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2">Big Deals. Bigger Savings.</h2>
            <p className="text-gray-700 mb-4">Up to 50% off on select categories</p>
            <Button asChild>
              <Link href="/products">Shop Deals</Link>
            </Button>
          </div>
        </div> */}

        {/* Category Tiles */}
        {/* <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div key={cat} className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{cat}</h3>
                <p className="text-sm text-gray-600">Explore now</p>
              </div>
            ))}
          </div>
        </section> */}
      </div>
    </div>
  );
}


