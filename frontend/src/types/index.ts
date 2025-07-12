/**
 * TypeScript type definitions for ReWear application
 */

// User types
export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  points: number;
  isActive: boolean;
  dateJoined: string;
  lastLogin?: string;
  bio?: string;
  location?: string;
}

export interface UserProfile extends User {
  itemsListed: number;
  swapsCompleted: number;
  rating: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

// Item types
export interface Item {
  id: number;
  title: string;
  description: string;
  category: ItemCategory;
  type: ItemType;
  size: ItemSize;
  condition: ItemCondition;
  brand?: string;
  color: string;
  images: ItemImage[];
  owner: User;
  pointsValue: number;
  isAvailable: boolean;
  status: ItemStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
}

export interface ItemImage {
  id: number;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export type ItemCategory = 
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories'
  | 'activewear'
  | 'formal'
  | 'sleepwear';

export type ItemType = 
  | 'casual'
  | 'formal'
  | 'party'
  | 'work'
  | 'sportwear'
  | 'vintage'
  | 'designer'
  | 'handmade';

export type ItemSize = 
  | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
  | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '16' | '18'
  | 'OS'; // One Size

export type ItemCondition = 
  | 'new'
  | 'like_new'
  | 'good'
  | 'fair'
  | 'poor';

export type ItemStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'archived';

// Swap types
export interface Swap {
  id: number;
  requester: User;
  owner: User;
  requestedItem: Item;
  offeredItems: Item[];
  status: SwapStatus;
  message?: string;
  pointsOffered?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  rating?: number;
  review?: string;
}

export type SwapStatus = 
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'completed'
  | 'cancelled';

// Authentication types
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
  totalPages: number;
  currentPage: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

// Search and Filter types
export interface SearchFilters {
  category?: ItemCategory;
  type?: ItemType;
  size?: ItemSize;
  condition?: ItemCondition;
  minPoints?: number;
  maxPoints?: number;
  brand?: string;
  color?: string;
  location?: string;
  sortBy?: SortOption;
}

export type SortOption = 
  | 'newest'
  | 'oldest'
  | 'points_low'
  | 'points_high'
  | 'popular'
  | 'nearest';

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Form types
export interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  isActive?: boolean;
  badge?: number;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Analytics types
export interface AnalyticsData {
  totalUsers: number;
  totalItems: number;
  totalSwaps: number;
  activeItems: number;
  itemsByCategory: Record<ItemCategory, number>;
  swapsByStatus: Record<SwapStatus, number>;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
}
