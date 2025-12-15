'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl focus-visible:ring-red-500',
      destructive: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl focus-visible:ring-red-600',
      outline: 'border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 hover:shadow-md focus-visible:ring-slate-500',
      secondary: 'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 hover:shadow-md focus-visible:ring-slate-500',
      ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-500',
      link: 'text-red-600 underline-offset-4 hover:underline focus-visible:ring-red-500',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3 text-sm',
      lg: 'h-12 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };