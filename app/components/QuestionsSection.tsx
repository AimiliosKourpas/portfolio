'use client';

import { useState } from 'react';
import SectionWrapper from './SectionWrapper';

const faqs = [
  {
    question: "Who am I?",
    answer: "I'm Aimilianos Kourpas-Danas, a passionate Frontend Developer and Informatics graduate."
  },
  {
    question: "What about my military service?",
    answer: "I have successfully completed my mandatory military service with dedication and discipline."
  },
  {
    question: "What technologies do I specialize in?",
    answer: "I specialize in React.js, JavaScript (ES6+), HTML5, CSS3, and backend basics with Python and Azure."
  },
  {
    question: "What certifications do I hold?",
    answer: `Frontend Expert (Feb 2024 - Aug 2024), Programming Expert (Jan 2023 - May 2023),
             Microsoft AZ-104 (July 2023), and Microsoft DP-100 (Nov 2022).`
  },
  {
    question: "Where can I find my projects?",
    answer: "Check out my GitHub and portfolio website for my latest projects and contributions."
  }
];

export default function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper
      id="questions"
      className="py-16 px-4 sm:px-6 md:px-10 max-w-4xl lg:max-w-5xl mx-auto"
    >
      <h2 className="text-3xl sm:text-3xl font-bold mb-8 text-center drop-shadow-md">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map(({ question, answer }, index) => (
          <div
            key={index}
            className="border border-cyan-500 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-content-${index}`}
              id={`faq-header-${index}`}
              className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 hover:bg-gray-700 transition rounded-t-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <span className="text-base sm:text-lg font-medium text-gray-100">
                {question}
              </span>
              <svg
                className={`w-5 h-5 text-cyan-300 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
  id={`faq-content-${index}`}
  role="region"
  aria-labelledby={`faq-header-${index}`}
  className={`text-gray-300 text-sm sm:text-base leading-relaxed bg-gray-900 rounded-b-xl border-l-4 border-cyan-500 shadow-lg transition-all duration-300 ease-in-out ${
    openIndex === index
      ? 'max-h-96 opacity-100 visible px-8 pt-4 pb-6'
      : 'max-h-0 opacity-0 invisible px-0 pt-0 pb-0'
  }`}
  style={{ transitionProperty: 'max-height, opacity, padding' }}
>
  <p>{answer}</p>
</div>

          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
