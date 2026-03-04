"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">HEIZEN</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-600 hover:text-black transition-colors font-medium">How it works</Link>
            <Link href="#services" className="text-gray-600 hover:text-black transition-colors font-medium">Services</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-black transition-colors font-medium">Pricing</Link>
            <Link href="#faq" className="text-gray-600 hover:text-black transition-colors font-medium">FAQ</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Book a Call
            </motion.button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-black p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-gray-100"
        >
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link href="#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">How it works</Link>
            <Link href="#services" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Services</Link>
            <Link href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Pricing</Link>
            <Link href="#faq" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">FAQ</Link>
            <div className="px-3 pt-2">
              <button className="w-full bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Book a Call
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
