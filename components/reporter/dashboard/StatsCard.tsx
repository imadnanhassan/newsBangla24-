'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/shared/ui';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: 'up' | 'down';
  className?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  trend = 'up',
  className 
}: StatsCardProps) {
  return (
    <Card 
      variant="glass" 
      hover 
      className={cn("group relative overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <p className="text-sm font-medium text-slate-600">{title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
          <span className="text-sm text-slate-500">গত সপ্তাহের তুলনায়</span>
        </div>
      </div>
    </Card>
  );
}