"use client";

import { useState } from "react";
import { Link2, ArrowRight } from "lucide-react";

// Mock Placeme Logo to match the screenshot
const PlacemeLogo = ({ className = "", textClass = "text-gray-900" }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 20V4H9L15 15V4H19V20H15L9 9V20H5Z" fill="currentColor" className="transform -skew-x-12" />
    </svg>
    <span className={`font-bold text-[13px] tracking-wide ${textClass}`}>PLACEME</span>
  </div>
);

export default function Features() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-white overflow-hidden font-sans">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[2.75rem] leading-tight font-medium text-gray-900 mb-5">
            Our Intelligent <span className="font-serif italic text-[#74929F]">Placement Tools</span>
          </h2>
          <p className="text-[1.1rem] text-gray-800 font-medium mb-4">
            Designed for students, placement cells, and recruiters
          </p>
          <p className="text-[15px] text-gray-500 leading-relaxed max-w-[600px] mx-auto">
            Our platform automates student profile management, recruiter discovery, placement drives, and internship coordination in one unified system.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          
          {/* Left Column - Fanned Out Cards */}
          <div className="w-full lg:w-[45%] relative h-[600px] flex justify-center pt-8">
            
            {/* Top Card (PM Agent) - Lowest Z-Index */}
            <div className="absolute top-4 left-4 right-12 z-10 bg-white border border-gray-200 shadow-[0_4px_20px_rgb(0,0,0,0.06)] rounded-sm aspect-[4/2.5] transform -rotate-[6deg] origin-bottom-left flex flex-col overflow-hidden">
              <div className="p-5 flex-shrink-0">
                <h3 className="font-bold text-gray-900 text-lg leading-tight w-4/5">Student Profile Manager</h3>
              </div>
              <div className="bg-[#f8f9fa] flex-grow relative overflow-hidden">
                {/* Mock Internal UI */}
                <div className="absolute top-4 left-8 right-0 bottom-0 bg-white shadow-sm border border-gray-200 rounded-tl-md p-3">
                  <div className="w-3/4 h-2 bg-gray-100 rounded mb-2"></div>
                  <div className="w-1/2 h-2 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>

            {/* Middle Card (QA Agent) */}
            <div className="absolute top-40 left-0 right-16 z-20 bg-gradient-to-br from-[#8a8d91] to-[#606368] border border-gray-400 shadow-[0_8px_25px_rgb(0,0,0,0.15)] rounded-sm aspect-[4/2.5] transform -rotate-[4deg] origin-bottom-left flex flex-col overflow-hidden">
              <div className="p-5 flex-shrink-0">
                <h3 className="font-bold text-white text-lg leading-tight w-4/5">Recruiter Discovery Dashboard</h3>
              </div>
              <div className="bg-white/10 flex-grow relative overflow-hidden">
                 <div className="absolute top-4 left-8 right-0 bottom-0 bg-white shadow-sm border border-gray-200 rounded-tl-md p-3">
                  <div className="flex gap-2">
                    <div className="w-1/3 h-20 bg-gray-100 rounded"></div>
                    <div className="w-2/3 h-20 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card (Helix) - Highest Z-Index */}
            <div className="absolute top-[280px] -left-4 right-20 z-30 bg-white border border-gray-200 shadow-[0_12px_30px_rgb(0,0,0,0.1)] rounded-sm aspect-[4/2.5] transform -rotate-[2deg] origin-bottom-left flex flex-col overflow-hidden">
              <div className="p-5 flex-shrink-0">
                <h3 className="font-bold text-gray-900 text-lg leading-tight">Placement Drive Manager</h3>
                <p className="text-[10px] text-gray-500 mt-1">Coordinate hiring drives, shortlist candidates, and manage recruiter interactions easily.</p>
              </div>
              <div className="bg-[#f8f9fa] flex-grow relative overflow-hidden">
                <div className="absolute top-4 left-4 right-4 bottom-0 bg-white shadow-sm border border-gray-200 rounded-t-md p-3 flex">
                   <div className="w-12 border-r border-gray-100 flex flex-col gap-1 pr-2">
                     <div className="w-full h-1 bg-gray-200"></div>
                     <div className="w-3/4 h-1 bg-gray-200"></div>
                   </div>
                   <div className="pl-2 flex-grow">
                     <div className="w-1/2 h-1 bg-blue-100 mb-1"></div>
                     <div className="w-3/4 h-1 bg-gray-100"></div>
                   </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Video Player & Details */}
          <div className="w-full lg:w-[55%] flex flex-col">
            
            {/* Video Container */}
            <div 
              className="relative w-full aspect-[16/10] bg-[#f8f9fa] flex items-center justify-center cursor-pointer overflow-hidden border border-gray-100 shadow-sm"
              onClick={() => setIsPlaying(true)}
            >
              {isPlaying ? (
                // VIDEO PLACEHOLDER - Add your <video> tag here later
                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white p-6">
                  <p className="text-sm font-medium animate-pulse">Playing Video...</p>
                  <p className="text-xs text-gray-400 mt-2">(Replace this block with your video component)</p>
                </div>
              ) : (
                <>
                  {/* Mock UI Background for Video Thumbnail */}
                  <div className="absolute top-0 left-0 w-full h-full p-8 pb-0 pt-12 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 w-1/2 leading-tight mb-8 z-0">
                      Manage Student Profiles & Placement Drives
                    </h2>
                    
                    {/* Mock internal dashboard components floating */}
                    <div className="relative flex-grow">
                      <div className="absolute top-0 left-10 w-[350px] bg-white border border-gray-100 shadow-md rounded-md p-4 z-10 transform -rotate-2">
                         <div className="flex items-center gap-2 mb-4">
                           <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                           <span className="text-xs font-bold">Student Applications</span>
                         </div>
                         <div className="text-xs text-gray-400 mb-2">Latest Updates</div>
                         <div className="bg-gray-50 p-2 rounded text-[10px] text-gray-500 flex justify-between items-center border border-gray-100 mb-2">
                           <span>New Internship Applications</span>
                           <span className="bg-white border border-gray-200 px-2 py-0.5 rounded">View</span>
                         </div>
                      </div>
                      
                      <div className="absolute top-10 right-0 w-[400px] bg-white border border-gray-100 shadow-lg rounded-tl-md p-5 z-20">
                         <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                           <span className="text-sm font-bold">Placement Drive</span>
                           <div className="flex gap-1">
                             <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">All</span>
                             <span className="text-[10px] text-gray-500 px-2 py-0.5">Active</span>
                           </div>
                         </div>
                         <div className="text-xs font-bold mb-2">Shortlist</div>
                         <div className="flex items-center gap-2 mb-2">
                           <input type="checkbox" className="w-3 h-3 rounded-sm border-gray-300" checked readOnly/>
                           <span className="text-[11px] text-gray-600">Shortlist eligible students</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <input type="checkbox" className="w-3 h-3 rounded-sm border-gray-300" />
                           <span className="text-[11px] text-gray-600">Schedule recruiter interviews</span>
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay (Thin Stroke style matching screenshot) */}
                  <div className="absolute inset-0 flex items-center justify-center z-30 transition-transform hover:scale-105">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 4V20L21 12L7 4Z" stroke="#111" strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Info Row */}
            <div className="mt-5 flex items-end justify-between px-1">
              <div>
                <h4 className="text-[1.35rem] font-serif italic text-[#74929F] mb-1">Placement Manager</h4>
                <p className="text-[13px] text-gray-400 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" /> Smart Campus Placement System
                </p>
              </div>
              <button className="bg-[#1c1c1c] text-white px-4 py-2 rounded-[4px] hover:bg-black transition-colors flex items-center gap-2 text-[13px] font-medium tracking-wide">
                Explore Platform <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}