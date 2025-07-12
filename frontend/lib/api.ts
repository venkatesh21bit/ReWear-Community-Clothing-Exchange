// Complete API client for ReWear platform
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://rewear-community-clothing-exchange-production.up.railway.app/api";

// Types for better TypeScript support
export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  bio?: string;
  location?: string;
  avatar?: string;
  phone_number?: string;
  points_balance: number;
  total_swaps: number;
  items_listed: number;
  completed_swaps: number;
  ongoing_swaps: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
}

export interface Item {
  item_id: string;
  uploader: User;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  brand?: string;
  color?: string;
  points_value: number;
  tags: string;
  tag_list: string[];
  status: string;
  images: ItemImage[];
  primary_image?: string;
  likes_count: number;
  is_liked: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface ItemImage {
  image_id: string;
  image: string;
  is_primary: boolean;
  alt_text?: string;
  created_at: string;
}

export interface Transaction {
  transaction_id: string;
  method: string;
  status: string;
  my_item?: Item;
  their_item?: Item;
  partner: User;
  points_amount: number;
  created_at: string;
  updated_at: string;
}

export interface Rating {
  rating_id: string;
  rater: User;
  rated_user: User;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
}

// Helper function to handle API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('access_token');
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  let json;
  try {
    json = await response.json();
  } catch (e) {
    throw new Error('Invalid server response');
  }

  if (!response.ok) {
    const errorMessage = json.message || json.detail || JSON.stringify(json.errors) || 'Request failed';
    throw new Error(errorMessage);
  }

  return json;
}

// Authentication API
export const authAPI = {
  async login(email: string, password: string) {
    const response = await apiRequest('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store tokens in localStorage
    if (response.success && response.token) {
      localStorage.setItem('access_token', response.token.access);
      localStorage.setItem('refresh_token', response.token.refresh);
    }
    
    return response;
  },

  async signup(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) {
    return apiRequest('/auth/signup/', {
      method: 'POST',
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        password_confirm: data.confirmPassword ?? data.password,
      }),
    });
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

// User API
export const userAPI = {
  async getCurrentUser(): Promise<User> {
    return apiRequest('/users/me/');
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return apiRequest('/users/me/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async getPublicProfile(userId: string): Promise<User> {
    return apiRequest(`/users/${userId}/`);
  },

  async getUserRatings(userId: string): Promise<{ success: boolean; count: number; average_rating: number; results: Rating[] }> {
    return apiRequest(`/users/${userId}/ratings/`);
  },

  async rateUser(userId: string, rating: number, comment?: string): Promise<{ success: boolean; rating: Rating }> {
    return apiRequest(`/users/${userId}/rate/`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    });
  },
};

// Items API
export const itemsAPI = {
  async getAllItems(filters?: {
    category?: string;
    size?: string;
    condition?: string;
    min_points?: number;
    max_points?: number;
    search?: string;
  }): Promise<{ success: boolean; count: number; results: Item[] }> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const endpoint = params.toString() ? `/items/?${params.toString()}` : '/items/';
    return apiRequest(endpoint);
  },

  async getItemDetails(itemId: string): Promise<Item> {
    return apiRequest(`/items/${itemId}/`);
  },

  async createItem(data: {
    title: string;
    description: string;
    category: string;
    type: string;
    size: string;
    condition: string;
    brand?: string;
    color?: string;
    points_value: number;
    tags?: string;
    images?: string[];
  }): Promise<{ success: boolean; item: Item }> {
    return apiRequest('/items/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateItem(itemId: string, data: Partial<Item>): Promise<{ success: boolean; item: Item }> {
    return apiRequest(`/items/${itemId}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteItem(itemId: string): Promise<{ success: boolean; message: string }> {
    return apiRequest(`/items/${itemId}/`, {
      method: 'DELETE',
    });
  },

  async getMyItems(status?: string): Promise<{ success: boolean; count: number; results: Item[] }> {
    const endpoint = status ? `/users/me/items/?status=${status}` : '/users/me/items/';
    return apiRequest(endpoint);
  },

  async purchaseItem(itemId: string, mode: 'points' | 'currency', amount?: number, pointsUsed?: number): Promise<{ success: boolean; message: string; transaction?: Transaction }> {
    return apiRequest(`/items/${itemId}/purchase/`, {
      method: 'POST',
      body: JSON.stringify({
        mode,
        amount,
        points_used: pointsUsed,
      }),
    });
  },
};

// Transactions/Swaps API
export const transactionsAPI = {
  async getAllTransactions(status?: string): Promise<{ success: boolean; count: number; results: Transaction[] }> {
    const endpoint = status ? `/swaps/?status=${status}` : '/swaps/';
    return apiRequest(endpoint);
  },

  async getTransactionDetails(transactionId: string): Promise<Transaction> {
    return apiRequest(`/swaps/${transactionId}/`);
  },

  async createSwapRequest(data: {
    requested_item_id: string;
    offered_item_id?: string;
    method: 'swap' | 'points' | 'donation';
    message?: string;
    points_amount?: number;
  }): Promise<{ success: boolean; transaction: Transaction }> {
    return apiRequest('/swaps/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateTransactionStatus(transactionId: string, action: 'accept' | 'decline' | 'complete'): Promise<{ success: boolean; message: string }> {
    return apiRequest(`/swaps/${transactionId}/`, {
      method: 'PUT',
      body: JSON.stringify({ action }),
    });
  },
};

// Image Upload API
export const uploadAPI = {
  async uploadImages(images: File[]): Promise<{ success: boolean; images: { filename: string; url: string }[] }> {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    const token = localStorage.getItem('access_token');
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/upload/images/`, {
      method: 'POST',
      headers,
      body: formData,
    });

    let json;
    try {
      json = await response.json();
    } catch (e) {
      throw new Error('Invalid server response');
    }

    if (!response.ok) {
      const errorMessage = json.message || json.detail || JSON.stringify(json.errors) || 'Upload failed';
      throw new Error(errorMessage);
    }

    return json;
  },
};

// Admin API (if needed)
export const adminAPI = {
  async getApiRoot() {
    return apiRequest('/');
  },
};

// Export legacy functions for backward compatibility
export const loginUser = authAPI.login;
export const signupUser = authAPI.signup;
