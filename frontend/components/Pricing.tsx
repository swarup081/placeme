"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "MVP Blueprint",
      price: "$2,500",
      description: "Perfect for startups needing a robust architecture and strategy before coding.",
      features: [
        "Comprehensive Tech Stack Design",
        "Database Architecture Schema",
        "API Integration Roadmap",
        "Cost Optimization Strategy",
        "1-Week Delivery Time"
      ]
    },
    {
      name: "Sprint Build",
      price: "$10,000",
      description: "Fast-paced development sprints to deliver core features and iterate quickly.",
      popular: true,
      features: [
        "2-Week Dedicated Development Sprint",
        "Senior AI-Native Engineers",
        "Automated Test Coverage",
        "Daily Progress Updates",
        "Production Deployment Support",
        "Code Ownership Transfer"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale dedicated teams for complex enterprise systems and scaling.",
      features: [
        "Dedicated Product Manager",
        "Custom SLA & Compliance",
        "Scalability Testing & Optimization",
        "24/7 Priority Support",
        "Legacy System Migration",
        "Quarterly Strategic Reviews"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Transparent pricing, no surprises.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Choose the package that fits your stage. We build efficient software that scales with your budget.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white p-8 rounded-3xl border ${plan.popular ? 'border-black shadow-xl' : 'border-gray-200 shadow-sm'} flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500 font-medium">/mo</span>}
                </div>
                <p className="text-gray-600 leading-relaxed">{plan.description}</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-black shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-colors ${plan.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-50 text-black border border-gray-200 hover:bg-gray-100'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
