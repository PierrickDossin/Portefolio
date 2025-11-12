"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Activity, BookOpen, Dumbbell, Database, Cloud, Workflow, BarChart, Server, GitBranch, Code, X, ArrowLeft, Globe, Fish, Gamepad2, Brain, TrendingUp, Receipt, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { projectApi, Project } from "@/lib/api";
import { repositoryApi, CodeRepository } from "@/lib/repositoryApi";
import CodeViewer from "@/components/CodeViewer";
import Link from "next/link";

const iconMap: Record<string, any> = {
  Activity,
  BookOpen,
  Dumbbell,
  Database,
  Cloud,
  Workflow,
  BarChart,
  Server,
  GitBranch,
  Globe,
  Fish,
  Gamepad2,
  Brain,
  TrendingUp,
  Receipt,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [codeRepositories, setCodeRepositories] = useState<CodeRepository[]>([]);
  const [loadingCode, setLoadingCode] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectApi.getFeatured();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchCodeForProject = async () => {
      if (selectedProject) {
        try {
          setLoadingCode(true);
          const repos = await repositoryApi.getByProjectId(selectedProject.id);
          setCodeRepositories(repos);
        } catch (err) {
          console.error("Error fetching code repositories:", err);
          setCodeRepositories([]);
        } finally {
          setLoadingCode(false);
        }
      }
    };

    fetchCodeForProject();
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <div className="border-b border-purple-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-purple-400" size={32} />
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  All Projects
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Explore all {projects.length} innovative projects across different domains
            </p>
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const IconComponent = iconMap[project.iconName || 'Database'] || Database;
            const gradientClass = `from-${project.gradientFrom || 'purple-600'} to-${project.gradientTo || 'pink-600'}`;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Card Container with Glass Effect */}
                <div className="relative h-full bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-purple-500/20 overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/20">
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:via-pink-600/5 group-hover:to-blue-600/5 transition-all duration-500" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                  </div>

                  <div className="relative p-6 flex flex-col h-full">
                    {/* Icon with Enhanced Gradient */}
                    <div className="relative mb-5">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <IconComponent className="text-white" size={32} />
                      </div>
                      {/* Glow effect behind icon */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                    </div>

                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30 backdrop-blur-sm">
                        {project.category.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm flex-grow group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + i * 0.05 }}
                          className="px-2.5 py-1 bg-slate-800/50 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/10 backdrop-blur-sm hover:border-purple-500/30 hover:bg-purple-500/10 transition-all"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-purple-500/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all text-sm font-semibold group/btn"
                      >
                        <Code size={16} className="group-hover/btn:rotate-12 transition-transform" />
                        <span>View Code</span>
                      </button>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all text-sm font-semibold group/btn"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} className="group-hover/btn:scale-110 transition-transform" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Code Viewer Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-purple-500/30 w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {selectedProject.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
                >
                  <X className="text-gray-400 hover:text-white" size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                {loadingCode ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="text-purple-400 text-lg">Loading code...</div>
                  </div>
                ) : codeRepositories.length > 0 ? (
                  <div className="p-6">
                    {codeRepositories.map((repo) => (
                      <div key={repo.id} className="mb-8 last:mb-0">
                        <div className="mb-4">
                          <h4 className="text-xl font-bold text-white mb-2">
                            {repo.name}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">
                            {repo.description}
                          </p>
                          {repo.githubUrl && (
                            <a
                              href={repo.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={16} />
                              View on GitHub
                            </a>
                          )}
                        </div>
                        <CodeViewer 
                          repositoryName={repo.name}
                          files={repo.files} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <Code className="text-gray-600 mb-4" size={48} />
                    <p className="text-gray-400 text-lg mb-2">
                      No code available for this project yet
                    </p>
                    <p className="text-gray-500 text-sm">
                      Code will be added soon!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
