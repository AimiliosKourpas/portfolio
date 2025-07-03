'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
        {/* Brand */}
        <div className="text-white text-lg sm:text-xl font-bold select-none cursor-default">
          Aimilianos Kourpas-Danas
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex sm:items-center">
          <ul className="flex space-x-8 text-white text-lg font-semibold">
            {['home', 'about', 'education', 'projects', 'certifications', 'questions'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => handleLinkClick(e, section)}
                  className="hover:text-cyan-400 transition-colors duration-200"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="sm:hidden p-2 rounded-md text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 relative z-60"
        >
          {!isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>

        {/* Overlay behind menu */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            aria-hidden="true"
          />
        )}

        {/* Mobile slide-in menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full bg-black shadow-lg transform transition-transform duration-300 sm:hidden w-64 p-8 flex flex-col text-white font-semibold text-lg z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="menu"
          aria-label="Mobile menu"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Close button inside menu (top right) */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="self-end mb-8 p-2 rounded-md text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 z-60"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <ul className="flex flex-col space-y-6">
            {['home', 'about', 'education', 'projects', 'certifications', 'questions'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => handleLinkClick(e, section)}
                  className="hover:text-cyan-400 transition-colors duration-200"
                  role="menuitem"
                  tabIndex={0}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
    