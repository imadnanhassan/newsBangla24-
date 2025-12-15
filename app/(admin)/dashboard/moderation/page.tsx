'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, Eye, Check, X, Flag, MessageSquare, User, Clock } from 'lucide-react';

const ModerationPage = () => {
  const [moderationQueue, setModerationQueue] = useState([
    {
      id: 1,
      type: 'comment',
      content: 'This article is completely biased and misleading!',
      author: 'user123',
      article: 'Economic Policy Analysis',
      reportReason: 'Inappropriate content',
      reportedBy: 'user456',
      status: 'pending',
      createdAt: '2024-01-15T14:30:00Z',
      reviewedAt: undefined,
      priority: 'high'
    },
    {
      id: 2,
      type: 'article',
      content: 'Breaking: Unverified claims about government corruption',
      author: 'reporter789',
      article: '',
      reportReason: 'Misinformation',
      reportedBy: 'user789',
      status: 'pending',
      createdAt: '2024-01-15T13:15:00Z',
      reviewedAt: undefined,
      priority: 'critical'
    },
    {
      id: 3,
      type: 'comment',
      content: 'Great article, very informative!',
      author: 'reader456',
      article: 'Technology Summit Coverage',
      reportReason: 'Spam',
      reportedBy: 'user123',
      status: 'reviewed',
      createdAt: '2024-01-15T11:00:00Z',
      reviewedAt: '2024-01-15T12:00:00Z',
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('pending');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comment': return <MessageSquare className="w-4 h-4" />;
      case 'article': return <Eye className="w-4 h-4" />;
      case 'user': return <User className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const filteredQueue = filter === 'all' ? moderationQueue : moderationQueue.filter(item => item.status === filter);

  const handleApprove = (id: number) => {
    setModerationQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'approved' as const, reviewedAt: new Date().toISOString() } : item
    ));
  };

  const handleReject = (id: number) => {
    setModerationQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'rejected' as const, reviewedAt: new Date().toISOString() } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
            <p className="text-gray-600">Review and moderate reported content</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected Today</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <X className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Flag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          </div>
          <div className="flex space-x-2">
            {['all', 'pending', 'approved', 'rejected', 'reviewed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === status
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Moderation Queue</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredQueue.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <span className="text-sm font-medium text-gray-600 capitalize">{item.type}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <p className="text-gray-900 font-medium mb-1">Reported Content:</p>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><span className="font-medium">Author:</span> {item.author}</p>
                      {item.article && <p><span className="font-medium">Article:</span> {item.article}</p>}
                      <p><span className="font-medium">Report Reason:</span> {item.reportReason}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Reported By:</span> {item.reportedBy}</p>
                      <p><span className="font-medium">Created:</span> {new Date(item.createdAt).toLocaleDateString()}</p>
                      {item.reviewedAt && (
                        <p><span className="font-medium">Reviewed:</span> {new Date(item.reviewedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {item.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation Guidelines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Moderation Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Content to Reject:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Hate speech or discriminatory content</li>
              <li>• Misinformation or false claims</li>
              <li>• Spam or promotional content</li>
              <li>• Personal attacks or harassment</li>
              <li>• Inappropriate or offensive language</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Content to Approve:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Constructive criticism or feedback</li>
              <li>• Factual information with sources</li>
              <li>• Respectful disagreement or debate</li>
              <li>• Relevant questions or clarifications</li>
              <li>• Positive engagement and discussion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModerationPage;