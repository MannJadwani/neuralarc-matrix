import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  outlined?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  secondary,
  outlined,
  className = '',
  onClick,
  href,
  disabled = false,
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-2.5 font-medium text-sm rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500';
  
  let variantClasses = '';
  
  if (primary) {
    variantClasses = outlined
      ? 'text-blue-400 border-2 border-blue-400 hover:bg-blue-900/20'
      : 'bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500';
  } else if (secondary) {
    variantClasses = outlined
      ? 'text-white border-2 border-white/20 hover:bg-white/5'
      : 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20';
  } else {
    variantClasses = outlined
      ? 'text-gray-300 border-2 border-gray-700 hover:bg-gray-800'
      : 'bg-gray-800 text-white hover:bg-gray-700';
  }
  
  const allClasses = `${baseClasses} ${variantClasses} ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  } ${className}`;
  
  if (href) {
    return (
      <a href={href} className={allClasses}>
        {children}
      </a>
    );
  }
  
  return (
    <button
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};