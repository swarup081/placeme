"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CEO, TechFlow",
      content: "Heizen completely transformed our development process. What took our previous agency 6 months to build, they delivered in 6 weeks with zero bugs.",
      avatar: "https://placehold.co/100x100?text=SJ"
    },
    {
      name: "Marcus Chen",
      role: "Founder, DataSync",
      content: "The AI-native approach is game-changing. We cut our MVP budget in half and launched ahead of schedule. Highly recommended.",
      avatar: "https://placehold.co/100x100?text=MC"
    },
    {
      name: "Elena Rodriguez",
      role: "CTO, HealthTech Innovators",
      content: "Finally, a development partner that speaks both business and technical languages fluently. The code quality is immaculate.",
      avatar: "https://placehold.co/100x100?text=ER"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Don't just take our word for it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            See what founders and engineering leaders are saying about building with Heizen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-black mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-800 text-lg leading-relaxed mb-8 italic">"{testimonial.content}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full bg-gray-200 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
