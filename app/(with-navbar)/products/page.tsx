"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import LoaderNew from "@/components/LoaderNew";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/products");
      const { products } = await res.json();
      setProductsList(products);
      setFilteredList(products);

      // Apply category from URL
      const categoryFromURL = searchParams.get("category");
      if (categoryFromURL) {
        setCategory(categoryFromURL);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let tempList = [...productsList];

    if (searchTerm) {
      tempList = tempList.filter((product) =>
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      tempList = tempList.filter(
        (product) =>
          product.category.toLowerCase().trim() === category.toLowerCase().trim()
      );
    }

    if (sortOrder === "lowToHigh") {
      tempList.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      tempList.sort((a, b) => b.price - a.price);
    }

    setFilteredList(tempList);
  }, [searchTerm, sortOrder, category, productsList]);

  if (productsList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6">
        <div className="h-10 w-64 mx-auto bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div className="h-10 bg-gray-200 rounded w-full sm:max-w-md animate-pulse" />
          <div className="lg:hidden w-32 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block col-span-1 space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-full h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-4 space-y-3 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setSortOrder("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Browse Our Products
      </motion.h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md"
        />
        <div className="lg:hidden flex justify-end">
          <Button
            variant="outline"
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar filters */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block bg-white p-6 rounded-2xl shadow-md col-span-1"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="space-y-3">
            <Button
              variant={sortOrder === "lowToHigh" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSortOrder("lowToHigh")}
            >
              Price: Low to High
            </Button>
            <Button
              variant={sortOrder === "highToLow" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSortOrder("highToLow")}
            >
              Price: High to Low
            </Button>
            <Button
              variant={category === "Electronics" ? "default" : "outline"}
              className="w-full"
              onClick={() => setCategory("Electronics")}
            >
              Category: Electronics
            </Button>
            <Button
              variant={category === "Fashion" ? "default" : "outline"}
              className="w-full"
              onClick={() => setCategory("Fashion")}
            >
              Category: Fashion
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </motion.aside>

        {/* Product Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="col-span-1 lg:col-span-3"
        >
          <ProductList products={filteredList} />
        </motion.section>
      </div>

      {/* Mobile Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center lg:hidden">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-white w-11/12 rounded-2xl p-6 shadow-xl relative"
          >
            <button
              onClick={() => setShowFilter(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSortOrder("lowToHigh");
                  setShowFilter(false);
                }}
              >
                Price: Low to High
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSortOrder("highToLow");
                  setShowFilter(false);
                }}
              >
                Price: High to Low
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCategory("Electronics");
                  setShowFilter(false);
                }}
              >
                Category: Electronics
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCategory("Fashion");
                  setShowFilter(false);
                }}
              >
                Category: Fashion
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  handleResetFilters();
                  setShowFilter(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
