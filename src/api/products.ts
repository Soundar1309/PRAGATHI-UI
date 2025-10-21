import api from './axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  offer_price?: number;
  stock: number;
  unit: string;
  product_type: 'solid' | 'liquid' | 'other';
  image?: string;
  image_url?: string;
  category: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
  has_offer?: boolean;
  discount_percentage?: number;
  default_variation?: ProductVariation;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductVariation {
  id: number;
  product: number;
  product_title?: string;
  quantity: number;
  unit: 'ml' | 'l' | 'g' | 'kg' | 'nos' | 'pcs';
  price: number;
  original_price?: number;
  stock: number;
  image?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  available?: boolean;
  has_offer?: boolean;
  discount_percentage?: number;
  display_name?: string;
}

export interface CreateProductData {
  title: string;
  description: string;
  price: number;
  original_price?: number;
  stock: number;
  unit: string;
  product_type: 'solid' | 'liquid' | 'other';
  category_id: number;
  image?: File;
}


export interface CreateProductVariationData {
  product: number;
  quantity: number;
  unit: string;
  price: number;
  original_price?: number;
  stock: number;
  image?: File;
  is_active?: boolean;
}

// Products API
export const productsApi = {
  // Get all products with optional filtering
  getAll: async (params?: {
    category_id?: number;
    product_type?: string;
    is_in_stock?: boolean;
    has_offer?: boolean;
    min_price?: number;
    max_price?: number;
    min_stock?: number;
    max_stock?: number;
    search?: string;
    ordering?: string;
    page?: number;
  }) => {
    const response = await api.get('/products/products/', { params });
    return response.data;
  },

  // Get single product
  getById: async (id: number) => {
    const response = await api.get(`/products/products/${id}/`);
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
    
    const response = await api.post('/products/products/', formData, {
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
    
    const response = await api.patch(`/products/products/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete product (admin only)
  delete: async (id: number) => {
    await api.delete(`/products/products/${id}/`);
  },

  // Get product with variations
  getWithVariations: async (id: number) => {
    const response = await api.get(`/products/products/${id}/with-variations/`);
    return response.data;
  },
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async () => {
    const response = await api.get('/products/categories/');
    return response.data;
  },

  // Get single category
  getById: async (id: number) => {
    const response = await api.get(`/products/categories/${id}/`);
    return response.data;
  },

  // Create category
  create: async (data: { name: string; description?: string }) => {
    const response = await api.post('/products/categories/', data);
    return response.data;
  },

  // Update category
  update: async (id: number, data: { name: string; description?: string }) => {
    const response = await api.patch(`/products/categories/${id}/`, data);
    return response.data;
  },

  // Delete category
  delete: async (id: number) => {
    await api.delete(`/products/categories/${id}/`);
  },
};

// Product Variations API
export const productVariationsApi = {
  // Get all variations with optional filtering
  getAll: async (params?: {
    product_id?: number;
    unit?: string;
    is_active?: boolean;
  }) => {
    const response = await api.get('/products/variations/', { params });
    return response.data;
  },

  // Get single variation
  getById: async (id: number) => {
    const response = await api.get(`/products/variations/${id}/`);
    return response.data;
  },

  // Create variation (admin only)
  create: async (data: CreateProductVariationData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'number' || typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });
    
    const response = await api.post('/products/variations/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update variation (admin only)
  update: async (id: number, data: Partial<CreateProductVariationData>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'number' || typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });
    
    const response = await api.patch(`/products/variations/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete variation (admin only)
  delete: async (id: number) => {
    await api.delete(`/products/variations/${id}/`);
  },
}; 