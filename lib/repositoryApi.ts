// API client for code repositories

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface CodeFile {
  fileName: string;
  filePath: string;
  content: string;
  language: string;
  lines?: number;
}

export interface CodeRepository {
  id: number;
  name: string;
  description?: string;
  projectId?: number;
  files: CodeFile[];
  githubUrl?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const repositoryApi = {
  getAll: async (): Promise<CodeRepository[]> => {
    const response = await fetch(`${API_URL}/repositories`);
    if (!response.ok) throw new Error('Failed to fetch repositories');
    return response.json();
  },

  getById: async (id: number): Promise<CodeRepository> => {
    const response = await fetch(`${API_URL}/repositories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch repository');
    return response.json();
  },

  getByProjectId: async (projectId: number): Promise<CodeRepository[]> => {
    const response = await fetch(`${API_URL}/repositories/project/${projectId}`);
    if (!response.ok) throw new Error('Failed to fetch project repositories');
    return response.json();
  },

  create: async (repository: Omit<CodeRepository, 'id' | 'createdAt' | 'updatedAt'>): Promise<CodeRepository> => {
    const response = await fetch(`${API_URL}/repositories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(repository),
    });
    if (!response.ok) throw new Error('Failed to create repository');
    return response.json();
  },

  update: async (id: number, repository: Partial<CodeRepository>): Promise<CodeRepository> => {
    const response = await fetch(`${API_URL}/repositories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(repository),
    });
    if (!response.ok) throw new Error('Failed to update repository');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/repositories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete repository');
  },
};
