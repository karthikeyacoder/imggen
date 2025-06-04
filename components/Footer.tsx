import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/5 backdrop-blur-lg border-t border-white/10 text-center py-6 mt-auto shadow-top-lg">
      <p className="text-gray-400 text-sm">
        Created by{' '}
        <a
          href="https://karthikeyacoder.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-300 transition-colors"
        >
          Karthikeya
        </a>
      </p>
      <p className="text-gray-500 text-xs mt-1">
        Powered by Generative AI
      </p>
    </footer>
  );
};