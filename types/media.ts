// Media and file related types
export type MediaType = 'image' | 'video' | 'document' | 'audio';

export interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  type: MediaType;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  uploadedBy: string;
  uploadedAt: string;
  updatedAt: string;
  metadata: MediaMetadata;
  usageCount: number;
  tags?: string[];
}

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number; // for video/audio
  format?: string;
  quality?: string;
  compression?: string;
}

export interface MediaUploadData {
  file: File;
  alt?: string;
  caption?: string;
  tags?: string[];
}

export interface MediaFilter {
  type?: MediaType;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  uploadedBy?: string;
  sortBy?: 'uploadedAt' | 'name' | 'size' | 'usageCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface MediaStats {
  total: number;
  images: number;
  videos: number;
  documents: number;
  audio: number;
  totalSize: number;
  storageUsed: number;
  storageLimit: number;
}