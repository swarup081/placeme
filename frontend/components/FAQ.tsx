"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "How do you define a \"Sprint\"?",
      answer: "A sprint is a focused 2-week development cycle where we deliver specific, agreed-upon features. It includes planning, development, testing, and deployment."
    },
    {
      question: "What tech stack do you support?",
      answer: "We specialize in modern web and mobile stacks, primarily Next.js, React, Node.js, Python, and scalable cloud infrastructure like AWS and Vercel. We choose the right tool for your specific needs."
    },
    {
      question: "How does payment work?",
      answer: "We typically work on a sprint-based or milestone-based payment structure. A deposit is required to start, with subsequent payments tied to successful delivery of predefined milestones."
    },
    {
      question: "How is Heizen different from a traditional dev shop or agency?",
      answer: "We are an AI-native agency. We leverage advanced AI tools to accelerate coding, automate testing, and generate boilerplate, allowing us to deliver higher quality software up to 3x faster and significantly cheaper than traditional agencies."
    },
    {
      question: "Can Heizen integrate with existing enterprise systems securely?",
      answer: "Absolutely. We have extensive experience building secure APIs and integrations with legacy enterprise systems, ensuring data compliance and robust security protocols are followed."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(3); // Open the specific one from screenshot

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Welcome to the <span className="italic text-gray-500 font-serif">AI-powered era</span> of software delivery.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-10"
            >
              Book a free strategy session and get a sprint roadmap, tailored to your goals.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#2c2c2c] text-white px-8 py-4 font-medium hover:bg-black transition-colors flex items-center gap-2 text-sm"
            >
              Book a Call <span className="text-gray-400">→</span>
            </motion.button>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-lg text-gray-900 pr-8">{faq.question}</span>
                    <span className="text-gray-400 shrink-0">
                      {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-white"
                      >
                        <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
