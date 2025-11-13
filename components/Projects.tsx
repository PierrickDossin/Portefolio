"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Database, Code, X } from "lucide-react";
import { useEffect, useState } from "react";
import { projectApi, Project } from "@/lib/api";
import { repositoryApi, CodeRepository } from "@/lib/repositoryApi";
import CodeViewer from "@/components/CodeViewer";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [codeRepos, setCodeRepos] = useState<CodeRepository[]>([]);

  useEffect(() => {
    projectApi.getFeatured().then(setProjects).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      repositoryApi.getByProjectId(selectedProject.id)
        .then(setCodeRepos)
        .catch(() => setCodeRepos([]));
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(project)}
              className="bg-slate-900/50 border border-blue-500/20 hover:border-blue-500/40 rounded-lg p-6 cursor-pointer transition-all"
            >
              <Database className="text-blue-400 mb-4" size={32} />
              
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 rounded text-xs mb-3">
                {project.category.replace('_', ' ')}
              </span>

              <h3 className="text-xl font-semibold mb-3 text-white">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-800 text-gray-400 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm">
                <Code size={16} />
                View Code
              </button>
            </motion.div>
          ))}
        </div>

        {/* Code Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-slate-900 rounded-2xl border border-purple-500/30 w-full max-w-6xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                    <p className="text-gray-400 text-sm">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-purple-500/10 rounded-lg"
                  >
                    <X className="text-gray-400" size={24} />
                  </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
                  {codeRepos.length > 0 ? (
                    codeRepos.map(repo => (
                      <div key={repo.id} className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-2">{repo.name}</h4>
                        <p className="text-gray-400 text-sm mb-4">{repo.description}</p>
                        <CodeViewer repositoryName={repo.name} files={repo.files} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Code className="text-gray-600 mx-auto mb-4" size={48} />
                      <p className="text-gray-400">No code available for this project</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
