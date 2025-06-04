import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageDisplayProps {
  isLoading: boolean;
  images: string[];
  error: string | null;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, images, error }) => {
  const handleDownload = (base64Image: string, index: number) => {
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = `kaalgen_img_${Date.now()}_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <LoadingSpinner size="h-16 w-16" />
        <p className="mt-4 text-lg text-gray-300">Generating your masterpiece... Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-red-900/20 backdrop-blur-md border border-red-500/30 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Oops! Something went wrong.</h3>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-10 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-400">
          Enter a prompt above and click "Generate Images" to see the magic happen!
        </p>
        <img src="https://picsum.photos/seed/placeholder-kaalgen/400/200" alt="Placeholder depicting an abstract artistic creation" className="mt-4 rounded-lg opacity-30 mx-auto" />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-200 text-center">Generated Images</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${images.length === 1 ? 'md:grid-cols-1 max-w-lg mx-auto' : images.length > 2 ? 'md:grid-cols-2' : 'md:grid-cols-2' }`}>
        {images.map((base64Image, index) => (
          <div 
            key={index} 
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-lg shadow-xl transition-all duration-300 hover:border-purple-500/50 group"
          >
            <img
              src={base64Image}
              alt={`Generated image ${index + 1}`}
              className="w-full h-auto rounded-md object-contain mb-4 border-2 border-gray-700 group-hover:border-purple-500/30 transition-colors"
            />
            <button
              onClick={() => handleDownload(base64Image, index)}
              className="w-full mt-2 bg-sky-600/80 hover:bg-sky-500/80 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out focus:ring-2 focus:ring-sky-400 focus:outline-none"
            >
              Download Image {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};