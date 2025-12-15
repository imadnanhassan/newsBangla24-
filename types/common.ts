// Common utility types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  search?: string;
  filters?: Record<string, any>;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimestampedEntity extends BaseEntity {
  createdBy?: string;
  updatedBy?: string;
}

export interface SoftDeletableEntity extends TimestampedEntity {
  deletedAt?: string;
  deletedBy?: string;
  isDeleted: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string;
  color?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: MenuItem[];
  badge?: string | number;
  badgeColor?: string;
  color?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export type Theme = 'light' | 'dark' | 'auto';
export type Language = 'bn' | 'en';
export type Currency = 'BDT' | 'USD' | 'EUR';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
export type TimeFormat = '12h' | '24h';