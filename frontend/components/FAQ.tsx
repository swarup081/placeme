"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "How does the platform help students with placements and internships?",
      answer: "Students can create verified profiles with resumes, projects, GitHub links, and academic details. Recruiters can then discover these profiles and connect with students for internships and placement opportunities."
    },
    {
      question: "How do recruiters use the platform?",
      answer: "Recruiters can search and filter student profiles based on skills, projects, academic performance, and assessments. This makes it easy to discover suitable candidates for internships and full-time roles."
    },
    {
      question: "How do placement cells manage hiring drives?",
      answer: "Placement cells can organize recruitment drives, shortlist students, coordinate interviews, and track hiring progress from a centralized dashboard."
    },
    {
      question: "How does the platform improve transparency?",
      answer: "All placement activities including applications, shortlists, and interview stages are visible within the system. This ensures students never miss opportunities and placement teams can track everything easily."
    },
    {
      question: "Is student data secure on the platform?",
      answer: "Yes. The platform is designed with strong security practices to ensure student information, recruiter interactions, and placement data are safely stored and managed."
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
              Simplifying the <span className="italic text-gray-500 font-serif">placement process</span> for modern campuses.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-10"
            >
              A unified platform that connects students, placement cells, and recruiters to manage internships and campus placements efficiently.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#2c2c2c] text-white px-8 py-4 font-medium hover:bg-black transition-colors flex items-center gap-2 text-sm"
            >
              Explore Platform <span className="text-gray-400">→</span>
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
