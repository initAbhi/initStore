"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, LogOut, ShoppingCart, PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, getSession } from "next-auth/react";
import Loader from "@/components/Loader";

const UserProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
  };
  const goToOrders = () => router.push("/profile/my-orders");
  const goToCart = () => router.push("/cart");

  if (!user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md"
      >
        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-28 h-28 sm:w-32 sm:h-32"
          >
            <Image
              src={user.image || "/images/user-avatar.jpg"}
              alt="User Avatar"
              fill
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
          </motion.div>

          <div className="text-center flex flex-col justify-center  h-28 sm:text-left ">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            {user.bio && <p className="mt-2 text-gray-600">{user.bio}</p>}
            {user.address && (
              <p className="text-sm text-gray-600">{user.address}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={goToOrders}
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="text-gray-800 font-medium">My Orders</span>
            <PackageCheck className="w-5 h-5 text-gray-500" />
          </button>

          <button
            onClick={goToCart}
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="text-gray-800 font-medium">My Cart</span>
            <ShoppingCart className="w-5 h-5 text-gray-500" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="text-gray-800 font-medium">Log Out</span>
            <LogOut className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 border-t pt-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Account Info
          </h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>
              <strong>Joined:</strong> January 2023
            </li>
            <li>
              <strong>Role:</strong> Customer
            </li>
            <li>
              <strong>Orders:</strong> 12 completed
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserProfilePage;
