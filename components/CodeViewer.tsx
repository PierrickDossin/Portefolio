'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeFile } from '@/lib/repositoryApi';
import { FileCode, Copy, Check } from 'lucide-react';

interface CodeViewerProps {
  files: CodeFile[];
  repositoryName: string;
}

export default function CodeViewer({ files, repositoryName }: CodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(files[0] || null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (selectedFile) {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <FileCode className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">{repositoryName}</h3>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* File List */}
        <div className="md:w-64 bg-gray-800/30 border-b md:border-b-0 md:border-r border-gray-700 p-4">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Files ({files.length})
          </div>
          <div className="space-y-1">
            {files.map(file => (
              <button
                key={file.fileName}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedFile?.fileName === file.fileName
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {file.fileName}
              </button>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <div className="flex-1">
          {selectedFile && (
            <>
              {/* File Header */}
              <div className="bg-gray-800/30 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-300">{selectedFile.filePath}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
                >
                  {copied ? (
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
                >
                  {selectedFile.content}
                </SyntaxHighlighter>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
