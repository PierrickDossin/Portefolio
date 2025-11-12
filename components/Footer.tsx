"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-400 text-sm">
            © {currentYear} Data Engineer Portfolio. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="text-purple-500 fill-purple-500" size={16} />
            <span>using Next.js, TypeScript & Tailwind CSS</span>
          </div>

          <div className="flex gap-6">
            <a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Home
            </a>
            <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              About
            </a>
            <a href="#projects" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Contact
            </a>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Designed with inspiration from modern UI libraries • Optimized for performance and accessibility
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
