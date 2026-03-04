"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex text-[#1A1A1A]">
                {/* Custom 'P' Logo */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 4H14C17.3137 4 20 6.68629 20 10C20 13.3137 17.3137 16 14 16H10V20H7V4ZM10 7V13H14C15.6569 13 17 11.6569 17 10C17 8.34315 15.6569 7 14 7H10Z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-widest text-[#1A1A1A] uppercase">Placeme</span>
            </Link>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-[15px] text-[#333333] hover:text-black transition-colors font-medium">About</Link>
            <div className="group relative cursor-pointer text-[15px] text-[#333333] hover:text-black transition-colors font-medium flex items-center gap-1">
              Events <span className="text-[10px]">▼</span>
            </div>
            <div className="group relative cursor-pointer text-[15px] text-[#333333] hover:text-black transition-colors font-medium flex items-center gap-1">
              Whitepapers <span className="text-[10px]">▼</span>
            </div>
            <Link href="#blogs" className="text-[15px] text-[#333333] hover:text-black transition-colors font-medium">Blogs</Link>
            <Link href="#careers" className="text-[15px] text-[#333333] hover:text-black transition-colors font-medium">Careers</Link>
            
            {/* CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#333333] text-white px-5 py-2.5 text-sm hover:bg-black transition-colors flex items-center gap-2"
            >
              Book a Strategy Call <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile menu dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-gray-100 shadow-xl"
        >
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link href="#about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">About</Link>
            <Link href="#events" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Events</Link>
            <Link href="#whitepapers" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Whitepapers</Link>
            <Link href="#blogs" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Blogs</Link>
            <Link href="#careers" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Careers</Link>
            <div className="px-3 pt-2">
              <button className="w-full bg-[#333333] text-white px-6 py-3 font-medium hover:bg-black transition-colors flex justify-center items-center gap-2">
                Book a Strategy Call <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}