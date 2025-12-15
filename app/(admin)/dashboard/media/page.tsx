'use client';

import { useState } from 'react';
import { 
  Image, 
  Upload, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Download,
  Trash2,
  Eye,
  Edit,
  FolderPlus,
  Video,
  FileText,
  Music
} from 'lucide-react';

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const mediaFiles = [
    {
      id: 1,
      name: 'breaking-news-banner.jpg',
      type: 'image',
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-15',
      url: '/api/placeholder/300/200',
      category: 'News Images'
    },
    {
      id: 2,
      name: 'sports-championship.mp4',
      type: 'video',
      size: '45.2 MB',
      duration: '3:24',
      uploadDate: '2024-01-14',
      url: '/api/placeholder/300/200',
      category: 'Sports Videos'
    },
    {
      id: 3,
      name: 'interview-audio.mp3',
      type: 'audio',
      size: '8.7 MB',
      duration: '12:45',
      uploadDate: '2024-01-13',
      url: '/api/placeholder/300/200',
      category: 'Interviews'
    },
    {
      id: 4,
      name: 'economic-report.pdf',
      type: 'document',
      size: '1.2 MB',
      pages: '24 pages',
      uploadDate: '2024-01-12',
      url: '/api/placeholder/300/200',
      category: 'Reports'
    },
    {
      id: 5,
      name: 'political-rally.jpg',
      type: 'image',
      size: '3.1 MB',
      dimensions: '2048x1536',
      uploadDate: '2024-01-11',
      url: '/api/placeholder/300/200',
      category: 'Politics'
    },
    {
      id: 6,
      name: 'tech-conference.jpg',
      type: 'image',
      size: '2.8 MB',
      dimensions: '1800x1200',
      uploadDate: '2024-01-10',
      url: '/api/placeholder/300/200',
      category: 'Technology'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'audio':
        return <Music className="w-6 h-6" />;
      case 'document':
        return <FileText className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'text-green-600 bg-green-100';
      case 'video':
        return 'text-blue-600 bg-blue-100';
      case 'audio':
        return 'text-purple-600 bg-purple-100';
      case 'document':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectFile = (id: number) => {
    setSelectedFiles(prev =>
      prev.includes(id) ? prev.filter(fileId => fileId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Image className="w-8 h-8 mr-3 text-blue-600" />
            Media Library
          </h1>
          <p className="text-gray-600 mt-1">Manage images, videos, audio files, and documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center">
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border-3 border-green-100 p-6 hover:border-green-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {mediaFiles.filter(f => f.type === 'image').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <Image className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">12.4 MB total</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-3 border-blue-100 p-6 hover:border-blue-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {mediaFiles.filter(f => f.type === 'video').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Video className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">45.2 MB total</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-3 border-purple-100 p-6 hover:border-purple-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Audio</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {mediaFiles.filter(f => f.type === 'audio').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Music className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">8.7 MB total</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-3 border-orange-100 p-6 hover:border-orange-300 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {mediaFiles.filter(f => f.type === 'document').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">1.2 MB total</span>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-2xl border-3 border-gray-100 p-6 hover:border-primary/30 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all w-64"
              />
            </div>
            <select className="border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
              <option>All Types</option>
              <option>Images</option>
              <option>Videos</option>
              <option>Audio</option>
              <option>Documents</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedFiles.length > 0 && (
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <span className="text-sm text-blue-800">{selectedFiles.length} selected</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Delete
                </button>
              </div>
            )}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="bg-white rounded-2xl border-3 border-gray-100 hover:border-primary/30 transition-all duration-300">
        {viewMode === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFiles.map((file) => (
                <div key={file.id} className="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    {file.type === 'image' ? (
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getFileTypeColor(file.type)}`}>
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFileTypeColor(file.type)}`}>
                        {file.type}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 truncate mb-1">{file.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{file.category}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{file.size}</span>
                      <span>{file.uploadDate}</span>
                    </div>
                    
                    {file.dimensions && (
                      <p className="text-xs text-gray-500 mt-1">{file.dimensions}</p>
                    )}
                    {file.duration && (
                      <p className="text-xs text-gray-500 mt-1">{file.duration}</p>
                    )}
                    {file.pages && (
                      <p className="text-xs text-gray-500 mt-1">{file.pages}</p>
                    )}
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === filteredFiles.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${getFileTypeColor(file.type)}`}>
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          {file.dimensions && (
                            <div className="text-sm text-gray-500">{file.dimensions}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFileTypeColor(file.type)}`}>
                        {file.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {file.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}