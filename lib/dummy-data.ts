import { Article, Category, Author, Tag } from '@/types/article';

// Dummy categories
export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'জাতীয়',
    slug: 'national',
    description: 'জাতীয় সংবাদ',
    color: '#ef4444',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'আন্তর্জাতিক',
    slug: 'international',
    description: 'আন্তর্জাতিক সংবাদ',
    color: '#3b82f6',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'খেলাধুলা',
    slug: 'sports',
    description: 'খেলাধুলার সংবাদ',
    color: '#10b981',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'বিনোদন',
    slug: 'entertainment',
    description: 'বিনোদন সংবাদ',
    color: '#f59e0b',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'প্রযুক্তি',
    slug: 'technology',
    description: 'প্রযুক্তি সংবাদ',
    color: '#8b5cf6',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'অর্থনীতি',
    slug: 'economy',
    description: 'অর্থনীতি সংবাদ',
    color: '#06b6d4',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Dummy authors
export const dummyAuthors: Author[] = [
  {
    id: '1',
    name: 'রহিম উদ্দিন',
    email: 'rahim@newsbangla24.com',
    avatar: '/images/authors/rahim.jpg',
    bio: 'জ্যেষ্ঠ সাংবাদিক ও সম্পাদক',
    role: 'editor'
  },
  {
    id: '2',
    name: 'ফাতেমা খাতুন',
    email: 'fatema@newsbangla24.com',
    avatar: '/images/authors/fatema.jpg',
    bio: 'রাজনৈতিক সংবাদদাতা',
    role: 'reporter'
  },
  {
    id: '3',
    name: 'করিম আহমেদ',
    email: 'karim@newsbangla24.com',
    avatar: '/images/authors/karim.jpg',
    bio: 'খেলাধুলার সংবাদদাতা',
    role: 'reporter'
  },
  {
    id: '4',
    name: 'সালমা বেগম',
    email: 'salma@newsbangla24.com',
    avatar: '/images/authors/salma.jpg',
    bio: 'বিনোদন সংবাদদাতা',
    role: 'reporter'
  }
];

// Dummy tags
export const dummyTags: Tag[] = [
  { id: '1', name: 'ব্রেকিং নিউজ', slug: 'breaking-news', usageCount: 25, createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'সরকার', slug: 'government', usageCount: 20, createdAt: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'ক্রিকেট', slug: 'cricket', usageCount: 15, createdAt: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'ফুটবল', slug: 'football', usageCount: 12, createdAt: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'চলচ্চিত্র', slug: 'movies', usageCount: 18, createdAt: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'স্মার্টফোন', slug: 'smartphone', usageCount: 10, createdAt: '2024-01-01T00:00:00Z' }
];

// Generate 50 dummy articles with compatibility for existing components
export const dummyArticles: any[] = [
  {
    id: '1',
    title: 'প্রধানমন্ত্রীর নতুন উন্নয়ন প্রকল্প ঘোষণা',
    slug: 'pm-announces-new-development-project-1',
    excerpt: 'দেশের অবকাঠামো উন্নয়নে নতুন মেগা প্রকল্পের ঘোষণা দিয়েছেন প্রধানমন্ত্রী।',
    content: '<p>প্রধানমন্ত্রী আজ এক বিশেষ সংবাদ সম্মেলনে দেশের অবকাঠামো উন্নয়নে একটি নতুন মেগা প্রকল্পের ঘোষণা দিয়েছেন। এই প্রকল্পের মাধ্যমে দেশের যোগাযোগ ব্যবস্থার আমূল পরিবর্তন আনা হবে।</p>',
    image_url: 'https://picsum.photos/800/400?random=1',
    featuredImage: 'https://picsum.photos/800/400?random=1',
    status: 'published',
    category: dummyCategories[0],
    tags: [dummyTags[0], dummyTags[1]],
    author: dummyAuthors[0],
    reporter: dummyAuthors[1],
    publishedAt: '2024-12-16T10:00:00Z',
    createdAt: '2024-12-16T09:00:00Z',
    updatedAt: '2024-12-16T10:00:00Z',
    metadata: {
      views: 1250,
      likes: 89,
      shares: 45,
      comments: 23,
      readingTime: 3,
      wordCount: 450
    }
  },
  {
    id: '2',
    title: 'বাংলাদেশ ক্রিকেট দলের নতুন অধিনায়ক নিয়োগ',
    slug: 'bangladesh-cricket-new-captain-2',
    excerpt: 'আগামী সিরিজের জন্য বাংলাদেশ ক্রিকেট দলের নতুন অধিনায়ক নিয়োগ দেওয়া হয়েছে।',
    content: '<p>বাংলাদেশ ক্রিকেট বোর্ড আজ ঘোষণা করেছে যে আগামী সিরিজের জন্য দলের নতুন অধিনায়ক নিয়োগ দেওয়া হয়েছে। এই সিদ্ধান্ত নিয়ে ক্রিকেট অনুরাগীদের মধ্যে ব্যাপক আলোচনা শুরু হয়েছে।</p>',
    image_url: 'https://picsum.photos/800/400?random=2',
    featuredImage: 'https://picsum.photos/800/400?random=2',
    status: 'published',
    category: dummyCategories[2],
    tags: [dummyTags[2]],
    author: dummyAuthors[2],
    reporter: dummyAuthors[2],
    publishedAt: '2024-12-16T09:30:00Z',
    createdAt: '2024-12-16T08:30:00Z',
    updatedAt: '2024-12-16T09:30:00Z',
    metadata: {
      views: 980,
      likes: 156,
      shares: 78,
      comments: 45,
      readingTime: 2,
      wordCount: 320
    }
  }
];

// Generate remaining 48 articles programmatically
const generateMoreArticles = (): any[] => {
  const titles = [
    'শিক্ষা মন্ত্রণালয়ের নতুন নীতিমালা প্রকাশ',
    'আন্তর্জাতিক বাজারে তেলের দাম বৃদ্ধি',
    'ঢাকায় নতুন মেট্রোরেল লাইনের কাজ শুরু',
    'জাতীয় বিশ্ববিদ্যালয়ের পরীক্ষার ফলাফল প্রকাশ',
    'বিশ্বকাপ ফুটবলে বাংলাদেশের সম্ভাবনা',
    'নতুন স্মার্টফোনের বাজারে আগমন',
    'ঢাকা শহরে বায়ু দূষণের মাত্রা বৃদ্ধি',
    'গার্মেন্টস শিল্পে নতুন রপ্তানি রেকর্ড',
    'জাতীয় চলচ্চিত্র পুরস্কার ঘোষণা',
    'কৃষি খাতে নতুন প্রযুক্তির ব্যবহার',
    'স্বাস্থ্য মন্ত্রণালয়ের নতুন হাসপাতাল উদ্বোধন',
    'বিদ্যুৎ সাশ্রয়ী নতুন প্রকল্প চালু',
    'পদ্মা সেতুতে যানবাহন চলাচল বৃদ্ধি',
    'জাতীয় সংসদের নতুন অধিবেশন শুরু',
    'আন্তর্জাতিক মাতৃভাষা দিবস উদযাপন',
    'নতুন বছরে অর্থনৈতিক প্রবৃদ্ধির লক্ষ্য',
    'ডিজিটাল বাংলাদেশ বাস্তবায়নে নতুন পদক্ষেপ',
    'পরিবেশ সংরক্ষণে সরকারি নতুন উদ্যোগ',
    'শিল্প কারখানায় নিরাপত্তা ব্যবস্থা জোরদার',
    'নতুন রেলপথ নির্মাণ প্রকল্প অনুমোদন',
    'জাতীয় দিবস উদযাপনের প্রস্তুতি',
    'আন্তর্জাতিক বাণিজ্যে বাংলাদেশের অগ্রগতি',
    'নতুন বিমানবন্দর নির্মাণের পরিকল্পনা',
    'কৃষকদের জন্য নতুন ভর্তুকি ঘোষণা',
    'তথ্য প্রযুক্তি খাতে বিনিয়োগ বৃদ্ধি',
    'জাতীয় বাজেটে শিক্ষা খাতে বরাদ্দ বৃদ্ধি',
    'নতুন গ্যাস সংযোগ প্রকল্প চালু',
    'পর্যটন শিল্পে সরকারি নতুন পরিকল্পনা',
    'জাতীয় ক্রীড়া প্রতিযোগিতার আয়োজন',
    'নতুন চিকিৎসা কলেজ স্থাপনের ঘোষণা',
    'আন্তর্জাতিক বিনিয়োগকারীদের আগ্রহ বৃদ্ধি',
    'নতুন সড়ক নির্মাণ প্রকল্প উদ্বোধন',
    'জাতীয় পুস্তক মেলার আয়োজন',
    'কৃষি গবেষণায় নতুন আবিষ্কার',
    'নতুন ইন্টারনেট সেবা চালু',
    'জাতীয় নিরাপত্তায় নতুন ব্যবস্থা',
    'পানি সংকট সমাধানে নতুন প্রকল্প',
    'নতুন শিল্প এলাকা স্থাপনের পরিকল্পনা',
    'জাতীয় সংগীত প্রতিযোগিতার আয়োজন',
    'নতুন কারিগরি শিক্ষা প্রতিষ্ঠান চালু',
    'আন্তর্জাতিক সম্মেলনে বাংলাদেশের অংশগ্রহণ',
    'নতুন ব্যাংকিং সেবা চালু',
    'জাতীয় বিজ্ঞান দিবস উদযাপন',
    'নতুন পরিবহন ব্যবস্থার পরিকল্পনা',
    'কৃষি পণ্য রপ্তানিতে নতুন রেকর্ড',
    'নতুন সৌর বিদ্যুৎ প্রকল্প চালু',
    'জাতীয় যুব দিবস উদযাপন',
    'নতুন আবাসন প্রকল্পের ঘোষণা'
  ];

  const articles: any[] = [];
  
  for (let i = 0; i < 48; i++) {
    const categoryIndex = i % dummyCategories.length;
    const authorIndex = i % dummyAuthors.length;
    const tagIndex = i % dummyTags.length;
    
    articles.push({
      id: (i + 3).toString(),
      title: titles[i],
      slug: `news-article-${i + 3}`,
      excerpt: `${titles[i]} সম্পর্কে বিস্তারিত তথ্য এবং আপডেট।`,
      content: `<p>${titles[i]} সম্পর্কে বিস্তারিত খবর। এই ঘটনাটি দেশের জন্য অত্যন্ত গুরুত্বপূর্ণ এবং এর প্রভাব ব্যাপক হবে বলে আশা করা হচ্ছে।</p><p>সংশ্লিষ্ট কর্তৃপক্ষ জানিয়েছেন যে এই বিষয়ে আরও তথ্য শীঘ্রই প্রকাশ করা হবে।</p>`,
      image_url: `https://picsum.photos/800/400?random=${i + 3}`,
      featuredImage: `https://picsum.photos/800/400?random=${i + 3}`,
      status: 'published',
      category: dummyCategories[categoryIndex],
      tags: [dummyTags[tagIndex]],
      author: dummyAuthors[authorIndex],
      reporter: dummyAuthors[authorIndex],
      publishedAt: new Date(Date.now() - (i * 3600000)).toISOString(),
      createdAt: new Date(Date.now() - (i * 3600000) - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - (i * 3600000)).toISOString(),
      metadata: {
        views: Math.floor(Math.random() * 2000) + 100,
        likes: Math.floor(Math.random() * 200) + 10,
        shares: Math.floor(Math.random() * 100) + 5,
        comments: Math.floor(Math.random() * 50) + 2,
        readingTime: Math.floor(Math.random() * 5) + 2,
        wordCount: Math.floor(Math.random() * 800) + 200
      }
    });
  }
  
  return articles;
};

// Combine all articles
export const allDummyArticles: any[] = [
  ...dummyArticles,
  ...generateMoreArticles()
];

// Helper functions
export const getArticlesByCategory = (categorySlug: string): any[] => {
  return allDummyArticles.filter(article => article.category.slug === categorySlug);
};

export const getArticleBySlug = (slug: string): any | undefined => {
  return allDummyArticles.find(article => article.slug === slug);
};

export const getLatestArticles = (limit: number = 10): any[] => {
  return allDummyArticles
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
    .slice(0, limit);
};

export const getFeaturedArticles = (limit: number = 5): any[] => {
  return allDummyArticles
    .sort((a, b) => b.metadata.views - a.metadata.views)
    .slice(0, limit);
};