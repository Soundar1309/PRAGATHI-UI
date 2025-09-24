import api from './axios';

export interface BlogAuthor {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogComment {
  id: number;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  approved: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  thumbnail?: string;
  hero_image?: string;
  author: BlogAuthor;
  category?: BlogCategory;
  tags: BlogTag[];
  status: 'draft' | 'published';
  featured: boolean;
  published_date: string;
  created_at: string;
  updated_at?: string;
  reading_time: number;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  comments?: BlogComment[];
}

export interface CreateBlogData {
  title: string;
  summary: string;
  content: string;
  thumbnail?: File;
  hero_image?: File;
  category_id?: number;
  tag_ids?: number[];
  status: 'draft' | 'published';
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface BlogFilters {
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
}

// Blog API endpoints
export const blogsApi = {
  // Get all published blogs with optional filtering
  getAll: async (filters?: BlogFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    
    const response = await api.get(`/blogs/?${params.toString()}`);
    return response.data;
  },

  // Get single blog by slug
  getBySlug: async (slug: string) => {
    const response = await api.get(`/blogs/${slug}/`);
    return response.data;
  },

  // Get featured blogs
  getFeatured: async () => {
    const response = await api.get('/blogs/featured/');
    return response.data;
  },

  // Get related blogs
  getRelated: async (slug: string) => {
    const response = await api.get(`/blogs/${slug}/related/`);
    return response.data;
  },

  // Get blog categories
  getCategories: async () => {
    const response = await api.get('/blogs/categories/');
    return response.data;
  },

  // Get blog tags
  getTags: async () => {
    const response = await api.get('/blogs/tags/');
    return response.data;
  },

  // Create blog (admin only)
  create: async (data: CreateBlogData) => {
    const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              // Handle arrays (like tag_ids)
              value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item.toString());
              });
            } else if (typeof value === 'boolean') {
              formData.append(key, value.toString());
            } else if (typeof value === 'number') {
              formData.append(key, value.toString());
            } else {
              formData.append(key, value);
            }
          }
        });
    
    const response = await api.post('/blogs/admin/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update blog (admin only)
  update: async (slug: string, data: Partial<CreateBlogData>) => {
    const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              // Handle arrays (like tag_ids)
              value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item.toString());
              });
            } else if (typeof value === 'boolean') {
              formData.append(key, value.toString());
            } else if (typeof value === 'number') {
              formData.append(key, value.toString());
            } else {
              formData.append(key, value);
            }
          }
        });
    
    const response = await api.patch(`/blogs/admin/${slug}/update/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete blog (admin only)
  delete: async (slug: string) => {
    await api.delete(`/blogs/admin/${slug}/delete/`);
  },

  // Add comment to blog
  addComment: async (slug: string, comment: {
    author_name: string;
    author_email: string;
    content: string;
  }) => {
    const response = await api.post(`/blogs/${slug}/comments/`, comment);
    return response.data;
  },
};
