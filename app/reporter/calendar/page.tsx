'use client';

import ReporterLayout from '@/components/ReporterLayout';
import { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  FileText,
  Video,
  Mic,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'interview' | 'meeting' | 'deadline' | 'event' | 'reminder';
  location?: string;
  attendees?: string[];
  priority: 'low' | 'medium' | 'high';
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'মেয়র সাক্ষাৎকার',
    description: 'স্থানীয় উন্নয়ন প্রকল্প নিয়ে মেয়রের সাথে সাক্ষাৎকার',
    date: '2024-01-20',
    time: '10:00',
    type: 'interview',
    location: 'সিটি কর্পোরেশন অফিস',
    attendees: ['মেয়র সাহেব', 'ক্যামেরাম্যান'],
    priority: 'high'
  },
  {
    id: 2,
    title: 'সম্পাদকীয় মিটিং',
    description: 'সাপ্তাহিক সম্পাদকীয় পরিকল্পনা নিয়ে আলোচনা',
    date: '2024-01-22',
    time: '14:00',
    type: 'meeting',
    location: 'অফিস কনফারেন্স রুম',
    attendees: ['প্রধান সম্পাদক', 'অন্যান্য রিপোর্টার'],
    priority: 'medium'
  },
  {
    id: 3,
    title: 'নিবন্ধ জমা দেওয়ার শেষ তারিখ',
    description: 'কৃষি উৎপাদন নিয়ে নিবন্ধ জমা দিতে হবে',
    date: '2024-01-25',
    time: '17:00',
    type: 'deadline',
    priority: 'high'
  },
  {
    id: 4,
    title: 'শিক্ষা মেলা কভারেজ',
    description: 'বার্ষিক শিক্ষা মেলার সংবাদ সংগ্রহ',
    date: '2024-01-28',
    time: '09:00',
    type: 'event',
    location: 'জাতীয় জাদুঘর',
    priority: 'medium'
  },
  {
    id: 5,
    title: 'ভিডিও এডিটিং সেশন',
    description: 'গত সপ্তাহের সাক্ষাৎকার ভিডিও এডিট করা',
    date: '2024-01-30',
    time: '15:00',
    type: 'reminder',
    priority: 'low'
  }
];

const eventTypeConfig = {
  interview: { icon: Mic, color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-100' },
  meeting: { icon: Users, color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-100' },
  deadline: { icon: Clock, color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-100' },
  event: { icon: CalendarIcon, color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-100' },
  reminder: { icon: FileText, color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-100' }
};

const priorityConfig = {
  low: { color: 'border-l-gray-400', bg: 'bg-gray-50' },
  medium: { color: 'border-l-yellow-400', bg: 'bg-yellow-50' },
  high: { color: 'border-l-red-400', bg: 'bg-red-50' }
};

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [showEventModal, setShowEventModal] = useState(false);

  const monthNames = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const dayNames = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <ReporterLayout title="ক্যালেন্ডার">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ক্যালেন্ডার</h2>
            <p className="mt-1 text-sm text-gray-600">
              আপনার সব ইভেন্ট এবং ডেডলাইন পরিচালনা করুন
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-2 text-sm ${view === 'month' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                মাস
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-2 text-sm ${view === 'week' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                সপ্তাহ
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-2 text-sm ${view === 'list' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                তালিকা
              </button>
            </div>
            <button
              onClick={() => setShowEventModal(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              নতুন ইভেন্ট
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            {view === 'month' && (
              <div className="bg-white rounded-lg border">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="p-4">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth().map((day, index) => (
                      <div
                        key={index}
                        className={`min-h-[100px] p-2 border border-gray-100 rounded ${
                          day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                        }`}
                      >
                        {day && (
                          <>
                            <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                            <div className="space-y-1">
                              {getEventsForDate(day).map(event => {
                                const config = eventTypeConfig[event.type];
                                return (
                                  <div
                                    key={event.id}
                                    className={`text-xs p-1 rounded ${config.bgColor} ${config.textColor} truncate cursor-pointer hover:opacity-80`}
                                    title={event.title}
                                  >
                                    {event.title}
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {view === 'list' && (
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">সব ইভেন্ট</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {events.map(event => {
                    const config = eventTypeConfig[event.type];
                    const priorityStyle = priorityConfig[event.priority];
                    const EventIcon = config.icon;
                    
                    return (
                      <div
                        key={event.id}
                        className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${priorityStyle.color} ${priorityStyle.bg}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                              <EventIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{event.time}</span>
                                </div>
                                {event.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">আজকের ইভেন্ট</h3>
              <div className="space-y-3">
                {events.filter(event => event.date === new Date().toISOString().split('T')[0]).length > 0 ? (
                  events
                    .filter(event => event.date === new Date().toISOString().split('T')[0])
                    .map(event => {
                      const config = eventTypeConfig[event.type];
                      const EventIcon = config.icon;
                      return (
                        <div key={event.id} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded ${config.color} flex items-center justify-center`}>
                            <EventIcon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                            <p className="text-xs text-gray-600">{event.time}</p>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <p className="text-sm text-gray-600">আজ কোনো ইভেন্ট নেই</p>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">আসন্ন ইভেন্ট</h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => {
                  const config = eventTypeConfig[event.type];
                  const EventIcon = config.icon;
                  return (
                    <div key={event.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded ${config.color} flex items-center justify-center`}>
                        <EventIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-600">{event.date} - {event.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Add */}
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">দ্রুত যোগ করুন</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded">
                  <Mic className="w-4 h-4 text-blue-500" />
                  <span>সাক্ষাৎকার</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>মিটিং</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>ডেডলাইন</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded">
                  <CalendarIcon className="w-4 h-4 text-purple-500" />
                  <span>ইভেন্ট</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReporterLayout>
  );
}