// app/(with-navbar)/layout.tsx
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        {/* <ToastContainer  position="top-right" autoClose={3000} /> */}
      </main>
    </>
  );
}
