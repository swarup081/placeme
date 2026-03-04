"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <main className="relative min-h-screen flex flex-col font-sans overflow-hidden bg-[#f3f7f6]">
      
      {/* Sharp, Clean Geometric Background Facets */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left geometric shape */}
        <div 
          className="absolute top-0 left-0 w-[60%] h-[100%] bg-gradient-to-br from-[#71a2b6] to-transparent opacity-30"
          style={{ clipPath: 'polygon(0 0, 50% 0, 20% 100%, 0 100%)' }}
        ></div>
        {/* Top-right geometric shape */}
        <div 
          className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-to-bl from-[#8cb5c2] to-transparent opacity-20"
          style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 80%, 15% 100%)' }}
        ></div>
        {/* Center subtle beam */}
        <div 
          className="absolute top-0 left-[20%] w-[60%] h-[100%] bg-gradient-to-b from-[#ffffff] to-transparent opacity-40"
          style={{ clipPath: 'polygon(30% 0, 70% 0, 50% 100%, 10% 100%)' }}
        ></div>
      </div>

      {/* Structural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[85rem] border-l border-r border-[#2C6E8F]/40 h-full"></div>
      </div>
      <div className="absolute top-[80px] w-full border-b border-[#2C6E8F]/40 z-0"></div>

      {/* Navbar with Placeme Branding */}
      <nav className="relative z-20 w-full max-w-[85rem] mx-auto h-[80px] px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
         
          <span className="text-xl font-bold tracking-widest text-[#1A1A1A] uppercase">PlaceMe</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[15px] text-[#333333]">
          <a href="#" className="hover:text-black">Platform</a>
          <a href="#" className="hover:text-black flex items-center gap-1">Recruiters <span className="text-[10px]">▼</span></a>
          <a href="#" className="hover:text-black flex items-center gap-1">For Colleges <span className="text-[10px]">▼</span></a>
          <a href="#" className="hover:text-black">Student Hub</a>
          <a href="#" className="hover:text-black">Opportunities</a>
        </div>

        <button className="hidden md:flex bg-[#333333] text-white px-5 py-2.5 text-sm hover:bg-black transition-colors items-center gap-2">
          Request a Demo <ArrowRight size={16} />
        </button>
      </nav>

      {/* Main Hero Content */}
      <section className="flex-grow flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 mt-12 mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-[3.5rem] md:text-[5rem] font-bold tracking-tight leading-[1.1] text-[#2C3236]">
            Smarter Campus <br />
            <span className="font-serif italic font-medium text-[#2C6E8F] relative inline-block mt-1">
              Placements & Internships
              <span className="absolute bottom-[10%] left-[5%] right-[5%] h-[2px] bg-[#2C6E8F]/40"></span>
            </span>
          </h1>

          <p className="text-[1.35rem] text-[#4A5560] mt-8 mb-10 max-w-2xl mx-auto font-light">
            A unified platform connecting students, placement cells, and recruiters to manage internships and placements seamlessly.
          </p>

          <button className="bg-[#2D3134] text-white px-6 py-3.5 text-[15px] hover:bg-black transition-colors inline-flex items-center gap-2">
            Explore the Platform <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Bottom Logos Section */}
      <div className="relative z-10 w-full max-w-[85rem] mx-auto border-t border-[#2C6E8F]/40">
        <div className="flex flex-col md:flex-row w-full min-h-[160px]">
          
          <div className="flex-1 md:w-[70%] border-b md:border-b-0 md:border-r border-[#2C6E8F]/40 p-6 flex flex-col">
            <p className="text-center text-[13px] font-medium text-[#4A5560] mb-6">
              Used by Leading Colleges & Recruiters
            </p>
            <div className="flex flex-wrap justify-center md:justify-around items-center gap-8 px-4 flex-grow">
              <div className="flex flex-col items-center justify-center opacity-80">
                <Image src="/IIT_Bombay_logo.png" alt="ITC" width={160} height={60} className="object-contain w-[160px] h-[60px]" />
              </div>
              <div className="flex flex-col items-center justify-center opacity-80">
                <Image src="/png-clipart-national-institute-of-technology-silchar-national-institutes-of-technology-national-institute-of-technology-karnataka-malaviya-national-institute-of-technology-jaipur-others-text-orange-re.png" alt="Hindustan Unilever Limited" width={160} height={60} className="object-contain w-[160px] h-[60px]" />
              </div>
              <div className="flex flex-col items-center justify-center opacity-80">
                 <Image src="/nita-removebg-preview.png" alt="DHL" width={160} height={60} className="object-contain w-[160px] h-[60px]" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[30%] p-6 flex flex-col">
            <p className="text-center text-[13px] font-medium text-[#4A5560] mb-6">
              Technology Partners
            </p>
            <div className="flex items-center justify-center opacity-90 flex-grow">
              <Image src="/google-logo-transparent.png" alt="Titan Capital" width={160} height={60} className="object-contain w-[160px] h-[60px]" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}