"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { skillApi, Skill, SkillCategory } from "@/lib/api";

interface SkillGroup {
  category: SkillCategory;
  title: string;
  skills: Skill[];
}

const categoryTitles: Record<SkillCategory, string> = {
  [SkillCategory.DATA_ENGINEERING]: "Data Engineering",
  [SkillCategory.CLOUD_INFRASTRUCTURE]: "Cloud & Infrastructure",
  [SkillCategory.PROGRAMMING_DATABASES]: "Programming & Databases",
  [SkillCategory.ANALYTICS_ML]: "Analytics & ML",
  [SkillCategory.DEVELOPMENT_TOOLS]: "Development Tools",
  [SkillCategory.WEB_DEVELOPMENT]: "Web Development",
};

const Skills = () => {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const allSkills = await skillApi.getAll();
        
        // Group skills by category
        const grouped = Object.values(SkillCategory).map((category) => ({
          category,
          title: categoryTitles[category],
          skills: allSkills.filter((skill) => skill.category === category),
        })).filter(group => group.skills.length > 0);

        setSkillGroups(grouped);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-purple-400">Loading skills...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-400">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern data solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, categoryIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                {group.title}
              </h3>

              <div className="space-y-4">
                {group.skills.map((skill, skillIndex) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium">
                        {skill.name}
                      </span>
                      <span className="text-purple-400 text-sm font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional education & expertise section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-2xl border border-purple-500/30"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Education & Expertise
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">Data Engineering</div>
              <p className="text-gray-400 text-sm">ETL/ELT, Pipeline Architecture, Cloud Integration</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">Machine Learning</div>
              <p className="text-gray-400 text-sm">Predictive Models, Computer Vision, AI Systems</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">Full-Stack Dev</div>
              <p className="text-gray-400 text-sm">React, Spring Boot, 3D Graphics, IoT</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
