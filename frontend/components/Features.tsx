"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Layers, Lock } from "lucide-react";
import Image from "next/image";

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-black" />,
      title: "AI-Accelerated Speed",
      description: "Ship 3x faster than traditional agencies. Our AI-native workflow generates boilerplate and repetitive tasks instantly."
    },
    {
      icon: <Layers className="w-6 h-6 text-black" />,
      title: "Scalable Architecture",
      description: "Built on modern, scalable infrastructure. Your product is designed to handle millions of users from day one."
    },
    {
      icon: <Lock className="w-6 h-6 text-black" />,
      title: "Enterprise-Grade Security",
      description: "Security isn't an afterthought. We implement robust, enterprise-level security measures by default."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-black" />,
      title: "Zero Technical Debt",
      description: "Clean, maintainable code verified by AI and senior engineers. Say goodbye to messy legacy systems."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Everything you need to ship a world-class product.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-12"
            >
              We provide end-to-end product development, from concept to deployment. No more managing multiple vendors.
            </motion.p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white rounded-[2.5rem] transform rotate-3 scale-105 -z-10" />
            <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl bg-white">
              <Image
                src="https://placehold.co/800x1000?text=App+Interface"
                alt="App Interface Preview"
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
