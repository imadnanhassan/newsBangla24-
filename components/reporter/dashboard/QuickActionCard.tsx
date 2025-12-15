'use client';

import Link from 'next/link';
import { Card } from '@/components/shared/ui';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  className?: string;
}

export default function QuickActionCard({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  color,
  className 
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <Card 
        variant="glass" 
        hover 
        className={cn("group relative overflow-hidden cursor-pointer", className)}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color}/5 ${color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        <div className="relative p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h3 className={`text-xl font-bold text-slate-900 group-hover:${color.split(' ')[1].replace('to-', 'text-')} transition-colors`}>
                {title}
              </h3>
              <p className="text-slate-600 font-medium">{description}</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            {title === 'নতুন নিবন্ধ' && 'আপনার পরবর্তী গুরুত্বপূর্ণ সংবাদ তৈরি করুন'}
            {title === 'ছবি আপলোড' && 'আপনার সংবাদের জন্য ছবি ও ভিডিও আপলোড করুন'}
            {title === 'ভিডিও রিপোর্ট' && 'ভিডিও রিপোর্ট তৈরি ও সম্পাদনা করুন'}
          </div>
        </div>
      </Card>
    </Link>
  );
}