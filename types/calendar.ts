// Calendar and event related types
export type EventType = 'interview' | 'meeting' | 'deadline' | 'event' | 'reminder' | 'assignment';
export type EventPriority = 'low' | 'medium' | 'high' | 'urgent';
export type EventStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  priority: EventPriority;
  status: EventStatus;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  isAllDay: boolean;
  location?: string;
  attendees?: EventAttendee[];
  reminders?: EventReminder[];
  createdBy: string;
  assignedTo?: string[];
  relatedArticleId?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: EventMetadata;
}

export interface EventAttendee {
  id: string;
  name: string;
  email: string;
  role?: string;
  status: 'pending' | 'accepted' | 'declined' | 'tentative';
  responseAt?: string;
}

export interface EventReminder {
  id: string;
  type: 'email' | 'push' | 'sms';
  minutesBefore: number;
  sent: boolean;
  sentAt?: string;
}

export interface EventMetadata {
  color?: string;
  tags?: string[];
  attachments?: string[];
  notes?: string;
  recurring?: RecurringPattern;
}

export interface RecurringPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // every N days/weeks/months/years
  endDate?: string;
  occurrences?: number;
  daysOfWeek?: number[]; // 0-6, Sunday = 0
  dayOfMonth?: number;
}

export interface EventForm {
  title: string;
  description?: string;
  type: EventType;
  priority: EventPriority;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  isAllDay: boolean;
  location?: string;
  attendees?: Omit<EventAttendee, 'id' | 'status' | 'responseAt'>[];
  reminders?: Omit<EventReminder, 'id' | 'sent' | 'sentAt'>[];
  assignedTo?: string[];
  relatedArticleId?: string;
  metadata?: EventMetadata;
}

export interface CalendarFilter {
  type?: EventType;
  priority?: EventPriority;
  status?: EventStatus;
  startDate?: string;
  endDate?: string;
  assignedTo?: string;
  createdBy?: string;
  search?: string;
}