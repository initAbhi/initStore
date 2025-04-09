"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Star, Truck, ShieldCheck } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-8">
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      <motion.section
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg text-gray-600 mb-10">
          Welcome to ShopSphere! We're more than just an online store—we're a
          team of passionate individuals dedicated to bringing you top-quality
          products, exceptional service, and a seamless shopping experience.
        </p>
      </motion.section>

      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {[
          {
            icon: <Users />,
            title: "Dedicated Team",
            desc: "Our team works around the clock to provide the best shopping experience.",
          },
          {
            icon: <Truck />,
            title: "Fast Delivery",
            desc: "Reliable shipping that gets your order to your door quickly.",
          },
          {
            icon: <ShieldCheck />,
            title: "Secure Shopping",
            desc: "Your data is safe with us thanks to top-notch security.",
          },
          {
            icon: <Star />,
            title: "Customer Satisfaction",
            desc: "Thousands of happy customers keep coming back!",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="flex justify-center mb-4 text-primary">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="mt-20 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600">
          We strive to revolutionize the way people shop online by offering a
          wide range of quality products, outstanding support, and a
          community-driven experience that puts our customers first.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutPage;
