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
    <section id="skills" className="py-20 relative bg-black">
      {/* Subtle background gradient */}
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
              Technical Skills
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, categoryIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-blue-300 mb-6">
                {group.title}
              </h3>

              <div className="space-y-4">
                {group.skills.map((skill, skillIndex) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm">
                        {skill.name}
                      </span>
                      <span className="text-blue-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
