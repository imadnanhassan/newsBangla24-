'use client';

import ReporterLayout from '@/components/ReporterLayout';
import { useState, useEffect } from 'react';
import { ClientSession, SessionUser } from '@/lib/session';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  Award,
  FileText,
  Eye,
  MessageSquare,
  Star,
  Shield,
  Globe,
  Link as LinkIcon
} from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  facebook: string;
  joinDate: string;
  avatar: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    facebook: '',
    joinDate: '',
    avatar: ''
  });

  useEffect(() => {
    const sessionUser = ClientSession.getSession();
    setUser(sessionUser);
    
    if (sessionUser) {
      setProfile({
        name: sessionUser.name || '',
        email: sessionUser.email || '',
        phone: '+৮৮০১৭১২৩৪৫৬৭৮',
        bio: 'অভিজ্ঞ সংবাদকর্মী যিনি রাজনীতি, অর্থনীতি এবং সামাজিক বিষয়ে লেখালেখি করেন। ১০ বছরের অভিজ্ঞতা রয়েছে সংবাদ জগতে।',
        location: 'ঢাকা, বাংলাদেশ',
        website: 'https://example.com',
        twitter: '@reporter_name',
        facebook: 'facebook.com/reporter',
        joinDate: '২০২২-০৩-১৫',
        avatar: '/api/placeholder/150/150'
      });
    }
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your API
    console.log('Saving profile:', profile);
    setIsEditing(false);
    alert('প্রোফাইল আপডেট হয়েছে!');
  };

  const stats = [
    { label: 'মোট নিবন্ধ', value: '৪৭', icon: FileText, color: 'text-blue-600' },
    { label: 'মোট ভিউ', value: '১২৫K', icon: Eye, color: 'text-green-600' },
    { label: 'মোট মন্তব্য', value: '৮৯২', icon: MessageSquare, color: 'text-purple-600' },
    { label: 'রেটিং', value: '৪.৮', icon: Star, color: 'text-yellow-600' }
  ];

  const achievements = [
    { title: 'সেরা রিপোর্টার', description: 'মাসের সেরা রিপোর্টার পুরস্কার', date: '২০২৪-০১' },
    { title: 'জনপ্রিয় লেখক', description: '১০০K+ ভিউ অর্জন', date: '২০২৩-১২' },
    { title: 'নিয়মিত লেখক', description: '৫০+ নিবন্ধ প্রকাশ', date: '২০২৩-১১' }
  ];

  if (!user) {
    return (
      <ReporterLayout title="প্রোফাইল">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </ReporterLayout>
    );
  }

  return (
    <ReporterLayout title="আমার প্রোফাইল">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-red-500 to-orange-500"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
              <div className="relative">
                <img
                  src={profile.avatar || '/api/placeholder/150/150'}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white bg-white"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 mt-4 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-gray-600">সংবাদকর্মী</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>যোগদান: {profile.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        প্রোফাইল সম্পাদনা
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          সংরক্ষণ
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          বাতিল
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white p-4 rounded-lg border text-center">
                <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">ব্যক্তিগত তথ্য</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  নাম
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ইমেইল
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ফোন
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{profile.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  অবস্থান
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{profile.location}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  বায়ো
                </label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Links & Achievements */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">সামাজিক লিংক</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ওয়েবসাইট
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    টুইটার
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{profile.twitter}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ফেসবুক
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{profile.facebook}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">অর্জনসমূহ</h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">অ্যাকাউন্ট নিরাপত্তা</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">পাসওয়ার্ড</h4>
              <p className="text-sm text-gray-600 mb-3">সর্বশেষ পরিবর্তন: ৩০ দিন আগে</p>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                পাসওয়ার্ড পরিবর্তন করুন
              </button>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">দ্বি-ফ্যাক্টর অথেন্টিকেশন</h4>
              <p className="text-sm text-gray-600 mb-3">অতিরিক্ত নিরাপত্তার জন্য সক্রিয় করুন</p>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                সক্রিয় করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}