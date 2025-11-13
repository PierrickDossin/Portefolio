"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, Zap, Award } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Database, label: "Projects Completed", value: "7+" },
    { icon: TrendingUp, label: "Years Experience", value: "1" },
    { icon: Zap, label: "Technologies Used", value: "15+" },
    { icon: Award, label: "Year of Study", value: "3rd" },
  ];

  return (
    <section id="about" className="py-20 relative bg-black">
      {/* Subtle background gradient to match galaxy fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Background</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I&apos;m a 3rd year Applied Computer Science student at UCLL (associated with KU Leuven), 
              focusing on Data Engineering and Business Management. I have 1 year of practical experience 
              building data pipelines, full-stack applications, and machine learning solutions across 
              healthcare, gambling, and technology sectors.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              My work involves creating scalable data infrastructure, implementing ETL processes, 
              and developing applications that solve real problems. I served as a Product Owner for 
              The Fish Gambling Platform, where I bridged technical and business requirements.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Beyond technical skills, I bring strong communication, problem-solving, and leadership 
              abilities. I&apos;ve taught courses to elderly people on internet usage and PC basics, 
              and have experience in web development and business analysis. I&apos;m particularly 
              interested in how data engineering intersects with business operations.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                Contact
              </a>
              <a
                href="#projects"
                className="px-6 py-3 border border-blue-500/30 text-white rounded-lg font-medium hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
              >
                Projects
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-3">
                  <stat.icon className="text-blue-400" size={24} />
                </div>
                <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
