'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Image as ImageIcon,
  Video,
  File,
  Download,
  Trash2,
  Eye,
  Copy,
  Calendar,
  FileText,
  MoreVertical
} from 'lucide-react';
import { ReporterLayout } from '@/components/reporter/layout';

interface MediaItem {
  id: number;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
  uploadDate: string;
  usedIn: number;
  alt?: string;
}

const mockMedia: MediaItem[] = [
  {
    id: 1,
    name: 'নির্বাচন-ভোটকেন্দ্র.jpg',
    type: 'image',
    url: '/api/placeholder/300/200',
    size: '2.4 MB',
    uploadDate: '২০২৪-০১-১৫',
    usedIn: 3,
    alt: 'স্থানীয় নির্বাচনের ভোটকেন্দ্র'
  },
  {
    id: 2,
    name: 'শিক্ষা-সংস্কার-প্রেজেন্টেশন.pdf',
    type: 'document',
    url: '/documents/education-reform.pdf',
    size: '1.8 MB',
    uploadDate: '২০২৪-০১-১৪',
    usedIn: 1
  },
  {
    id: 3,
    name: 'কৃষি-উৎপাদন-ভিডিও.mp4',
    type: 'video',
    url: '/videos/agriculture-production.mp4',
    size: '15.2 MB',
    uploadDate: '২০২৪-০১-১৩',
    usedIn: 2
  },
  {
    id: 4,
    name: 'প্রযুক্তি-অফিস.jpg',
    type: 'image',
    url: '/api/placeholder/300/200',
    size: '1.9 MB',
    uploadDate: '২০২৪-০১-১২',
    usedIn: 0,
    alt: 'প্রযুক্তি কোম্পানির অফিস'
  },
  {
    id: 5,
    name: 'স্বাস্থ্য-সেবা-রিপোর্ট.jpg',
    type: 'image',
    url: '/api/placeholder/300/200',
    size: '3.1 MB',
    uploadDate: '২০২৪-০১-১১',
    usedIn: 5,
    alt: 'গ্রামীণ স্বাস্থ্য সেবা কেন্দ্র'
  },
  {
    id: 6,
    name: 'সাক্ষাৎকার-ভিডিও.mp4',
    type: 'video',
    url: '/videos/interview.mp4',
    size: '25.7 MB',
    uploadDate: '২০২৪-০১-১০',
    usedIn: 1
  }
];

const typeConfig = {
  image: { icon: ImageIcon, color: 'text-green-600', bg: 'bg-green-100' },
  video: { icon: Video, color: 'text-blue-600', bg: 'bg-blue-100' },
  document: { icon: File, color: 'text-purple-600', bg: 'bg-purple-100' }
};

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>(mockMedia);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(filteredMedia.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const deleteSelected = () => {
    if (confirm('নির্বাচিত ফাইলগুলো মুছে দিতে চান?')) {
      setMedia(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  return (
    <ReporterLayout title="মিডিয়া লাইব্রেরি">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">মিডিয়া লাইব্রেরি</h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার সব ছবি, ভিডিও এবং ডকুমেন্ট পরিচালনা করুন
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/reporter/media/upload"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              নতুন আপলোড
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">ছবি</p>
                <p className="text-2xl font-bold text-gray-900">
                  {media.filter(m => m.type === 'image').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Video className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">ভিডিও</p>
                <p className="text-2xl font-bold text-gray-900">
                  {media.filter(m => m.type === 'video').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <File className="w-8 h-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">ডকুমেন্ট</p>
                <p className="text-2xl font-bold text-gray-900">
                  {media.filter(m => m.type === 'document').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-orange-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">মোট ফাইল</p>
                <p className="text-2xl font-bold text-gray-900">{media.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="ফাইল খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">সব ধরনের</option>
                <option value="image">ছবি</option>
                <option value="video">ভিডিও</option>
                <option value="document">ডকুমেন্ট</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {selectedItems.length} টি নির্বাচিত
                  </span>
                  <button
                    onClick={deleteSelected}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={clearSelection}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    বাতিল
                  </button>
                </div>
              )}
            </div>
          </div>

          {selectedItems.length === 0 && filteredMedia.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={selectAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                সব নির্বাচন করুন
              </button>
            </div>
          )}
        </div>

        {/* Media Grid/List */}
        <div className="bg-white rounded-lg border overflow-hidden">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
              {filteredMedia.map((item) => {
                const TypeIcon = typeConfig[item.type].icon;
                const isSelected = selectedItems.includes(item.id);
                
                return (
                  <div
                    key={item.id}
                    className={`relative group border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                      isSelected ? 'ring-2 ring-red-500 border-red-500' : 'border-gray-200'
                    }`}
                    onClick={() => toggleSelection(item.id)}
                  >
                    {/* Media Preview */}
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.alt || item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-lg ${typeConfig[item.type].bg} flex items-center justify-center`}>
                          <TypeIcon className={`w-8 h-8 ${typeConfig[item.type].color}`} />
                        </div>
                      )}
                    </div>

                    {/* Selection Checkbox */}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelection(item.id)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                          <Eye className="w-3 h-3 text-gray-600" />
                        </button>
                        <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                          <Download className="w-3 h-3 text-gray-600" />
                        </button>
                        <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
                          <MoreVertical className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                        <span>{item.size}</span>
                        <span>{item.usedIn} টি নিবন্ধে</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMedia.map((item) => {
                const TypeIcon = typeConfig[item.type].icon;
                const isSelected = selectedItems.includes(item.id);
                
                return (
                  <div
                    key={item.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelection(item.id)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      
                      <div className="flex-shrink-0">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.alt || item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className={`w-12 h-12 rounded ${typeConfig[item.type].bg} flex items-center justify-center`}>
                            <TypeIcon className={`w-6 h-6 ${typeConfig[item.type].color}`} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>{item.size}</span>
                          <span>{item.uploadDate}</span>
                          <span>{item.usedIn} টি নিবন্ধে ব্যবহৃত</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 rounded">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredMedia.length === 0 && (
            <div className="p-12 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">কোনো মিডিয়া পাওয়া যায়নি</h3>
              <p className="text-gray-600 mb-4">
                আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ফাইল খুঁজে পাওয়া যায়নি।
              </p>
              <Link
                href="/reporter/media/upload"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                প্রথম ফাইল আপলোড করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </ReporterLayout>
  );
}