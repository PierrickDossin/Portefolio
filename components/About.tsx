"use client";

import { motion } from "framer-motion";
import { Database, TrendingUp, Zap, Award } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Database, label: "Projects Completed", value: "7+" },
    { icon: TrendingUp, label: "Years Experience", value: "2" },
    { icon: Zap, label: "Technologies Used", value: "15+" },
    { icon: Award, label: "Year of Study", value: "3rd" },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate about turning raw data into actionable insights through innovative engineering solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
            <p className="text-gray-300 leading-relaxed">
              I&apos;m currently in my 3rd year of Applied Computer Science at <span className="text-purple-400 font-semibold">UCLL</span>, 
              an associated school of <span className="text-purple-400 font-semibold">KU Leuven</span>, 
              specializing in Data Engineering and Business Management. With 2 years 
              of hands-on experience, I focus on building scalable data pipelines, 
              developing full-stack applications, and implementing machine learning solutions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My passion lies in transforming raw data into actionable insights and 
              creating efficient data infrastructure. Through academic projects and 
              practical experience, I&apos;ve developed expertise in modern data engineering 
              tools, cloud platforms, and software development best practices.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all hover:scale-105"
              >
                Let&apos;s Connect
              </a>
              <a
                href="#projects"
                className="px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all hover:scale-105"
              >
                View Projects
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
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105 glow-box"
              >
                <stat.icon className="text-purple-400 mb-3" size={32} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
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
