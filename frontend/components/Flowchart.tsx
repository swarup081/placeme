"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function Flowchart() {
  const steps = [
    {
      id: "01",
      title: "Discovery Call",
      description: "We align on your goals, vision, and timeline in a free 30-minute strategy session."
    },
    {
      id: "02",
      title: "Blueprint & Architecture",
      description: "Our AI architects map out the optimal tech stack and system design for scale."
    },
    {
      id: "03",
      title: "Development Sprint",
      description: "AI-accelerated coding begins. We build robust, production-ready features fast."
    },
    {
      id: "04",
      title: "QA & Testing",
      description: "Automated test suites ensure everything runs smoothly before going live."
    },
    {
      id: "05",
      title: "Launch & Iterate",
      description: "We deploy to production and continuously monitor, optimize, and scale."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            How we build differently.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Our AI-native workflow turns complex requirements into shipped products in record time.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="absolute -top-5 left-8 bg-black text-white text-sm font-bold py-1 px-3 rounded-full border-4 border-white">
                  {step.id}
                </div>

                <h3 className="text-xl font-bold mb-4 mt-2 group-hover:text-gray-800 transition-colors">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow for mobile/tablet indicating flow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 text-gray-300">
                    <MoveRight className="rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
