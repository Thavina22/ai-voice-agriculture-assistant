import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`glass-card rounded-2xl p-6 border border-gray-200/80 dark:border-dark-border bg-white dark:bg-dark-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
