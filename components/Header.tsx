import React from 'react';
import { APP_NAME } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          {APP_NAME}
        </h1>
        <p className="text-center text-gray-300 mt-1">AI-Powered Image Generation</p>
      </div>
    </header>
  );
};