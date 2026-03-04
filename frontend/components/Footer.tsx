"use client";

import Link from "next/link";
import { Linkedin, Youtube, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-16 gap-10">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold tracking-tight">PLACEME</span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-gray-400 font-medium">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/partner" className="hover:text-white transition-colors">Partner With Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 gap-6 text-gray-500">
          <p>© 2026 Placeme. All Rights Reserved</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="mt-20 overflow-hidden select-none opacity-10 flex justify-center">
          <span className="text-[15vw] font-black leading-none tracking-tighter">PLACEME</span>
        </div>
      </div>
    </footer>
  );
}
