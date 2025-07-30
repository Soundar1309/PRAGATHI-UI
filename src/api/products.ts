import api from './axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  category: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  title: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image?: File;
}

// Products API
export const productsApi = {
  // Get all products with optional filtering
  getAll: async (params?: {
    category_id?: number;
    search?: string;
    page?: number;
  }) => {
    const response = await api.get('/products/', { params });
    return response.data;
  },

  // Get single product
  getById: async (id: number) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  // Create product (admin only)
  create: async (data: CreateProductData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });
    
    const response = await api.post('/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update product (admin only)
  update: async (id: number, data: Partial<CreateProductData>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });
    
    const response = await api.patch(`/products/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete product (admin only)
  delete: async (id: number) => {
    await api.delete(`/products/${id}/`);
  },
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },

  // Get single category
  getById: async (id: number) => {
    const response = await api.get(`/categories/${id}/`);
    return response.data;
  },

  // Create category
  create: async (data: { name: string; description?: string }) => {
    const response = await api.post('/categories/', data);
    return response.data;
  },

  // Update category
  update: async (id: number, data: { name: string; description?: string }) => {
    const response = await api.patch(`/categories/${id}/`, data);
    return response.data;
  },

  // Delete category
  delete: async (id: number) => {
    await api.delete(`/categories/${id}/`);
  },
}; 