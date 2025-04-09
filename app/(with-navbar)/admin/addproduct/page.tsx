"use client";
import React, { FormEvent } from "react";

const page = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const data = event.currentTarget;
    try {
      const response = await fetch("/api/admin/addproduct", {
        method: "POST",
        body: data,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="md:w-[60%]">
        <form onSubmit={handleSubmit} className="">
          <div className="relative mb-6">
            <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
              Product Name
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "></div>
              <input
                type="text"
                name="productname"
                id="productname"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
          </div>
          {/* ------------- */}
          <div className="relative mb-6">
            <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
              Description
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "></div>
              <input
                type="text"
                name="productdescription"
                id="productdescription"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
          </div>
          {/* ------------- */}
          <div className="relative mb-6">
            <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
              Images
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "></div>
              <input
                type="text"
                name="images"
                id="images"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
          </div>
          {/* ------------- */}
          <div className="relative mb-6">
            <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
              Category
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "></div>
              <input
                type="text"
                name="category"
                id="category"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
          </div>
          {/* ------------- */}
          <div className="relative mb-6">
            <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
              Price
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "></div>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
          </div>
          {/* ------------- */}
          <div className="relative mb-6">
            <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
              Ratings
            </label>
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "></div>
              <input
                type="text"
                name="ratings"
                id="ratings"
                className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
          </div>
          {/* ------------- */}
          <div className="flex items-center justify-center">
            <button className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
