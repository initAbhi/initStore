"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ArrowRight, Sparkles, Shield, Truck, Award } from "lucide-react";
import UserProfileButton from "@/components/UserProfileButton";
import { useSession } from "next-auth/react";
import { Carousel } from "@/components/carousel";
import { useRouter } from "next/navigation";
import LoaderNew from "@/components/LoaderNew";
import { Menu, X } from "lucide-react";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      // console.log(products)
      setproductList(products);
    };
    fetchData();
  }, []);

  if (!productList)
    return (
      <div className="flex min-h-screen w-full justify-center items-center">
        <LoaderNew />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <header className="flex justify-between items-center relative z-50">
          {/* Logo */}
          <motion.h1
            className="text-3xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              InitStore
            </Link>
          </motion.h1>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2 mr-4">
              {navLinks.map((link) => (
                <Button key={link.name} variant="ghost" className="hover:bg-blue-50 transition-premium">
                  <Link href={link.path} className="hover:text-blue-600 font-medium">
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
                  className="btn-premium text-sm font-semibold"
                >
                  Sign in
                </Link>
              )}
              {status !== "loading" && status !== "unauthenticated" && (
                <UserProfileButton />
              )}
            </motion.div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 sm:py-24">
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
            className="space-y-8 text-center md:text-left relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Premium Quality Cases
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Protect Your Phone with
              <span className="text-gradient block mt-2">Premium Style</span>
            </h2>
            
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-lg">
              Discover our collection of premium smartphone cases designed to protect and enhance your device with unmatched style and durability.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <Button asChild className="btn-premium text-lg px-8 py-4 group">
                <Link href="/products" className="flex items-center gap-2">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg border-2 hover:bg-gray-50 transition-premium">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center md:justify-start gap-6 pt-8 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" />
                <span>Premium Quality</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center relative"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md group">
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
              
              <Image
                src={productList[0].images[0]}
                alt="Hero Product"
                width={450}
                height={450}
                className="rounded-3xl shadow-premium object-cover w-full h-auto group-hover:scale-105 transition-premium relative z-10"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-4 right-4 glass-morphism rounded-full p-3 animate-pulse-glow"
              >
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </motion.div>
              
              {/* Price tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-4 left-4 glass-morphism rounded-2xl px-4 py-2"
              >
                <div className="text-sm font-semibold text-gray-800">Starting at</div>
                <div className="text-lg font-bold text-gradient">${productList[0].price}</div>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </main>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Fast Shipping", "Top Rated", "24/7 Support"].map(
            (feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="card-premium p-8 text-center hover-lift"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Experience premium service with our commitment to excellence and customer satisfaction.
                  </p>
                </div>
              </motion.div>
            )
          )}
        </section>

        {/* Carousel */}
        <section className="py-12">
          <Carousel products={productList} />
        </section>
        {/* added */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our carefully curated collection of premium smartphone accessories
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[
              ...new Map(
                productList.map((p) => [p.category.toLowerCase(), p])
              ).values(),
            ].map((product: any, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center hover-lift cursor-pointer group"
              >
                <Link
                  href={`/products?category=${encodeURIComponent(
                    product.category
                  )}`}
                  className="block"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.category}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 rounded-2xl object-cover h-24 w-24 group-hover:scale-110 transition-premium shadow-lg"
                  />
                  <p className="text-gray-700 font-semibold capitalize">
                    {product.category}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="text-gradient">Best Sellers</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our most popular products loved by customers worldwide
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList.slice(0, 4).map((product, i) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium overflow-hidden hover-lift group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.productname}
                    width={400}
                    height={400}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-premium"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-premium"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {product.productname}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gradient">${product.price}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.ratings}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl"></div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What Our <span className="text-gradient">Customers Say</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us with their device protection
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                customer: "John Doe",
                review:
                  "Absolutely love my new case! The quality is outstanding and it fits perfectly. The design is sleek and modern.",
                rating: 5
              },
              {
                customer: "Alex",
                review:
                  "Best phone case I've ever owned. Dropped my phone multiple times and it's still in perfect condition!",
                rating: 5
              },
              {
                customer: "Huxn",
                review:
                  "Premium quality at an affordable price. The customer service is exceptional too. Highly recommended!",
                rating: 5
              },
            ].map((data, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="card-premium p-8 hover-lift"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(data.rating)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                  {data.review}
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {data.customer.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-gray-800 block">
                      {data.customer}
                    </span>
                    <span className="text-sm text-gray-500">Verified Customer</span>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}
