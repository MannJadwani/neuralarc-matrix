import React from 'react';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  dark = false,
}) => {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 ${
        dark ? 'bg-black' : 'bg-gradient-to-b from-gray-900 to-black'
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
};