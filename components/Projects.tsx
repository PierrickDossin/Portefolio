import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Activity, BookOpen, Dumbbell, Database, Cloud, Workflow, BarChart, Server, GitBranch, Code, X, ArrowRight, Globe, Fish, Gamepad2, Brain, TrendingUp, Receipt } from "lucide-react";
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

const Projects = () => {
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
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-purple-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-400">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Selected work in data engineering, machine learning, and application development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.slice(0, 6).map((project, index) => {
            const IconComponent = iconMap[project.iconName || 'Database'] || Database;
            const gradientClass = `from-${project.gradientFrom || 'purple-600'} to-${project.gradientTo || 'pink-600'}`;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-full bg-slate-900/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all overflow-hidden p-6 flex flex-col backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-blue-500/10">
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all">
                        <IconComponent className="text-blue-400" size={24} />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 rounded text-xs border border-blue-500/20">
                        {project.category.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 text-sm flex-grow line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-800/60 text-gray-400 rounded text-xs border border-blue-500/10"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-slate-800/60 text-gray-500 rounded text-xs">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-blue-500/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <Code size={16} />
                        <span>View Code</span>
                      </button>
                      
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="p-2 bg-slate-800/50 text-blue-400 hover:text-blue-300 rounded-md transition-colors border border-blue-500/20"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-xl hover:shadow-blue-500/25"
              >
                View All {projects.length} Projects
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        )}

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
    </section>
  );
};

export default Projects;
