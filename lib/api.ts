// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Project API
export const projectApi = {
  getAll: () => apiRequest<Project[]>('/projects'),
  getFeatured: () => apiRequest<Project[]>('/projects/featured'),
  getByCategory: (category: string) => 
    apiRequest<Project[]>(`/projects/category/${category}`),
  getByTag: (tag: string) => 
    apiRequest<Project[]>(`/projects/tag/${tag}`),
  getById: (id: number) => apiRequest<Project>(`/projects/${id}`),
  create: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    }),
  update: (id: number, project: Partial<Project>) =>
    apiRequest<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    }),
  delete: (id: number) =>
    apiRequest<void>(`/projects/${id}`, { method: 'DELETE' }),
};

// Skill API
export const skillApi = {
  getAll: () => apiRequest<Skill[]>('/skills'),
  getByCategory: (category: string) =>
    apiRequest<Skill[]>(`/skills/category/${category}`),
  getById: (id: number) => apiRequest<Skill>(`/skills/${id}`),
  create: (skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<Skill>('/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    }),
  update: (id: number, skill: Partial<Skill>) =>
    apiRequest<Skill>(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill),
    }),
  delete: (id: number) =>
    apiRequest<void>(`/skills/${id}`, { method: 'DELETE' }),
};

// Contact Message API
export const contactApi = {
  getAll: () => apiRequest<ContactMessage[]>('/contact'),
  getUnread: () => apiRequest<ContactMessage[]>('/contact/unread'),
  getById: (id: number) => apiRequest<ContactMessage>(`/contact/${id}`),
  create: (message: Omit<ContactMessage, 'id' | 'isRead' | 'createdAt'>) =>
    apiRequest<ContactMessage>('/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    }),
  markAsRead: (id: number) =>
    apiRequest<ContactMessage>(`/contact/${id}/read`, { method: 'PATCH' }),
  delete: (id: number) =>
    apiRequest<void>(`/contact/${id}`, { method: 'DELETE' }),
};

// Type Definitions
export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  iconName?: string;
  gradientFrom?: string;
  gradientTo?: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export enum ProjectCategory {
  DATA_ENGINEERING = 'DATA_ENGINEERING',
  WEB_DEVELOPMENT = 'WEB_DEVELOPMENT',
  MOBILE_DEVELOPMENT = 'MOBILE_DEVELOPMENT',
  MACHINE_LEARNING = 'MACHINE_LEARNING',
  DEVOPS = 'DEVOPS',
  OTHER = 'OTHER',
}

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  level: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export enum SkillCategory {
  DATA_ENGINEERING = 'DATA_ENGINEERING',
  CLOUD_INFRASTRUCTURE = 'CLOUD_INFRASTRUCTURE',
  PROGRAMMING_DATABASES = 'PROGRAMMING_DATABASES',
  ANALYTICS_ML = 'ANALYTICS_ML',
  DEVELOPMENT_TOOLS = 'DEVELOPMENT_TOOLS',
  WEB_DEVELOPMENT = 'WEB_DEVELOPMENT',
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
