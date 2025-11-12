'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeFile } from '@/lib/repositoryApi';
import { FileCode, Copy, Check, Download, ExternalLink, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';

interface CodeViewerProps {
  files: CodeFile[];
  repositoryName: string;
  githubUrl?: string;
}

interface FolderNode {
  name: string;
  type: 'file' | 'folder';
  file?: CodeFile;
  children?: FolderNode[];
  path: string;
}

export default function CodeViewer({ files, repositoryName, githubUrl }: CodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(files[0] || null);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/']));

  // Build folder tree structure from flat file list
  const folderTree = useMemo(() => {
    const root: FolderNode = {
      name: '/',
      type: 'folder',
      children: [],
      path: '/'
    };

    files.forEach(file => {
      const pathParts = file.filePath.split('/').filter(Boolean);
      let currentNode = root;

      // Navigate/create folder structure
      pathParts.forEach((part, index) => {
        const isFile = index === pathParts.length - 1;
        const currentPath = '/' + pathParts.slice(0, index + 1).join('/');

        if (isFile) {
          currentNode.children!.push({
            name: part,
            type: 'file',
            file: file,
            path: currentPath
          });
        } else {
          let folderNode = currentNode.children!.find(
            child => child.type === 'folder' && child.name === part
          );

          if (!folderNode) {
            folderNode = {
              name: part,
              type: 'folder',
              children: [],
              path: currentPath
            };
            currentNode.children!.push(folderNode);
          }

          currentNode = folderNode;
        }
      });
    });

    // Sort: folders first, then files, alphabetically
    const sortNodes = (nodes: FolderNode[]) => {
      nodes.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      nodes.forEach(node => {
        if (node.children) sortNodes(node.children);
      });
    };

    if (root.children) sortNodes(root.children);
    return root;
  }, [files]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleCopyCode = async (content: string, fileName: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadFile = (file: CodeFile) => {
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Recursive component to render folder tree
  const FolderTreeNode = ({ node, depth = 0 }: { node: FolderNode; depth?: number }) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile?.fileName === node.file?.fileName;

    if (node.type === 'file' && node.file) {
      return (
        <button
          onClick={() => setSelectedFile(node.file!)}
          className={`
            w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-all flex items-center gap-2
            ${
              isSelected
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            }
          `}
          style={{ paddingLeft: `${depth * 1.5 + 0.75}rem` }}
        >
          <FileCode className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{node.name}</span>
          {node.file.lines && (
            <span className="text-xs text-gray-500 ml-auto">
              {node.file.lines}
            </span>
          )}
        </button>
      );
    }

    if (node.type === 'folder' && node.children) {
      return (
        <div>
          <button
            onClick={() => toggleFolder(node.path)}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-all flex items-center gap-2 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            style={{ paddingLeft: `${depth * 1.5 + 0.75}rem` }}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 flex-shrink-0 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 flex-shrink-0 text-blue-400" />
            )}
            <span className="truncate font-semibold">{node.name}</span>
            <span className="text-xs text-gray-500 ml-auto">
              {node.children.length}
            </span>
          </button>
          {isExpanded && (
            <div className="mt-1">
              {node.children.map((child, index) => (
                <FolderTreeNode key={`${child.path}-${index}`} node={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <FileCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No code files available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileCode className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">{repositoryName}</h3>
        </div>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
          >
            View on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* File List Sidebar with Folder Tree */}
        <div className="md:w-64 bg-gray-800/30 border-b md:border-b-0 md:border-r border-gray-700">
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Files ({files.length})
            </div>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {folderTree.children && folderTree.children.map((child, index) => (
                <FolderTreeNode key={`${child.path}-${index}`} node={child} />
              ))}
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedFile && (
              <motion.div
                key={selectedFile.fileName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* File Header */}
                <div className="bg-gray-800/30 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-gray-300">
                      {selectedFile.filePath}
                    </span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs font-medium text-gray-300">
                      {selectedFile.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadFile(selectedFile)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                      title="Download file"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyCode(selectedFile.content, selectedFile.fileName)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                      title="Copy code"
                    >
                      {copiedFile === selectedFile.fileName ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Code Content */}
                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    language={selectedFile.language}
                    style={vscDarkPlus}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.875rem',
                    }}
                    lineNumberStyle={{
                      minWidth: '3em',
                      paddingRight: '1em',
                      color: '#6b7280',
                      userSelect: 'none',
                    }}
                  >
                    {selectedFile.content}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
