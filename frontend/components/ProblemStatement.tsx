"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, DollarSign, Bug } from "lucide-react";

export default function ProblemStatement() {
  const problems = [
    {
      icon: <Clock className="w-6 h-6 text-black" />,
      title: "Missed Deadlines",
      description: "Projects drag on for months, costing you market share and frustrating your investors."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-black" />,
      title: "Blown Budgets",
      description: "What starts as a simple MVP quickly balloons into a massive expense with constant scope creep."
    },
    {
      icon: <Bug className="w-6 h-6 text-black" />,
      title: "Buggy Code",
      description: "You launch with a product that barely works, spending more time fixing issues than building features."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-black" />,
      title: "Poor Communication",
      description: "You're left in the dark about progress, with developers speaking a language you don't understand."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Software development shouldn't be a nightmare.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            We've seen it all. The industry is broken, but we're here to fix it with an AI-first approach.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
