import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { InteractiveBackground } from './components/InteractiveBackground';
import { generateImagesFromPrompt } from './services/geminiService';
import { DEFAULT_ASPECT_RATIO, DEFAULT_NUM_IMAGES } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>(DEFAULT_ASPECT_RATIO);
  const [numImages, setNumImages] = useState<number>(DEFAULT_NUM_IMAGES);
  
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImages = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImagesFromPrompt(prompt, aspectRatio, numImages);
      setGeneratedImages(images);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, numImages]);

  return (
    <>
      <InteractiveBackground />
      <div className="min-h-screen text-gray-100 flex flex-col items-center selection:bg-sky-500/30 selection:text-sky-100 relative z-10">
        <Header />
        <main className="container mx-auto p-4 w-full max-w-4xl flex-grow">
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            numImages={numImages}
            setNumImages={setNumImages}
            onSubmit={handleGenerateImages}
            isLoading={isLoading}
          />
          <ImageDisplay
            isLoading={isLoading}
            images={generatedImages}
            error={error}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;