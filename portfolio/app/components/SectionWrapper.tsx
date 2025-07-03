import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-16 mb-16 ${className}`}
    >
      <div className="bg-gray-900/60 backdrop-blur-md rounded-xl shadow-lg p-10 max-w-5xl mx-auto text-gray-100">
        {children}
      </div>
    </section>
  );
}
