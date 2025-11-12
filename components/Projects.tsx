import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Activity, BookOpen, Dumbbell, Database, Cloud, Workflow, BarChart, Server, GitBranch, Code, X, ArrowRight, Globe, Fish, Gamepad2, Brain, TrendingUp, Receipt, Sparkles, Zap } from "lucide-react";
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
    <section id="projects" className="py-20 relative overflow-hidden">
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
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 backdrop-blur-sm"
          >
            <Sparkles className="text-purple-400" size={20} />
            <span className="text-purple-300 text-sm font-semibold">FEATURED WORK</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions across <span className="text-purple-400 font-semibold">data engineering</span>, 
            <span className="text-pink-400 font-semibold"> machine learning</span>, and 
            <span className="text-blue-400 font-semibold"> full-stack development</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.slice(0, 6).map((project, index) => {
            const IconComponent = iconMap[project.iconName || 'Database'] || Database;
            const gradientClass = `from-${project.gradientFrom || 'purple-600'} to-${project.gradientTo || 'pink-600'}`;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Main Card */}
                <div className="relative h-full bg-gradient-to-br from-slate-900/95 via-purple-900/10 to-slate-900/95 backdrop-blur-2xl rounded-3xl border border-purple-500/20 overflow-hidden transition-all duration-500 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/25">
                  
                  {/* Animated Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/5 group-hover:to-blue-600/10 transition-all duration-700" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                  </div>

                  {/* Corner Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-7 flex flex-col h-full">
                    {/* Icon Section */}
                    <div className="relative mb-6">
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className={`relative w-20 h-20 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                      >
                        <IconComponent className="text-white" size={36} />
                        {/* Icon Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-2xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
                      </motion.div>
                      
                      {/* Floating Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="absolute -top-2 -right-2"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                          <Zap className="text-white" size={18} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="mb-4"
                    >
                      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30 backdrop-blur-sm shadow-lg">
                        {project.category.replace('_', ' ')}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-grow group-hover:text-gray-300 transition-colors line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ delay: index * 0.05 + i * 0.1 }}
                          className="px-3 py-1.5 bg-slate-800/60 text-purple-300 rounded-xl text-xs font-semibold border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 hover:bg-purple-500/20 transition-all shadow-sm"
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1.5 bg-slate-800/60 text-gray-400 rounded-xl text-xs font-semibold border border-gray-600/20">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-5 border-t border-purple-500/10">
                      <motion.button
                        whileHover={{ scale: 1.05, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50"
                      >
                        <Code size={16} />
                        <span>View Code</span>
                      </motion.button>
                      
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.githubUrl}
                          className="p-2 bg-slate-800/50 text-purple-400 hover:text-purple-300 rounded-lg transition-all border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Bottom Gradient Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all relative overflow-hidden group"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                </div>
                
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles size={24} />
                  View All {projects.length} Projects
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
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
