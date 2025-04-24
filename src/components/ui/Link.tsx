import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
  onClick,
}) => {
  const baseClasses = 'transition-colors duration-200';
  
  return (
    <a
      href={href}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};