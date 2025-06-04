import React from 'react';
import { SelectInput } from './SelectInput';
import { ASPECT_RATIO_OPTIONS, NUM_IMAGES_OPTIONS } from '../constants';
import { SelectOption } from '../types';

interface PromptFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  aspectRatio: string;
  setAspectRatio: (value: string) => void;
  numImages: number;
  setNumImages: (value: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const mapToSelectOptions = <T extends { label: string; value: string | number }, >(options: T[]): SelectOption<T['value']>[] => {
  return options.map(opt => ({ label: opt.label, value: opt.value }));
};


export const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  numImages,
  setNumImages,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const aspectRatioSelectOptions: SelectOption<string>[] = mapToSelectOptions(ASPECT_RATIO_OPTIONS);
  const numImagesSelectOptions: SelectOption<number>[] = mapToSelectOptions(NUM_IMAGES_OPTIONS);


  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-white/5 backdrop-blur-lg border border-white/10 p-6 sm:p-8 rounded-xl shadow-2xl mb-8"
    >
      <div>
        <label htmlFor="prompt" className="block mb-2 text-lg font-medium text-gray-200">
          Your Creative Prompt
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-white/5 border border-white/10 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-500 focus:bg-white/10 block w-full p-2.5 placeholder-gray-400 transition-colors"
          placeholder="e.g., A majestic lion wearing a crown, photorealistic, golden hour lighting"
          disabled={isLoading}
          aria-required="true"
        />
        <p className="mt-1 text-xs text-gray-400">Describe the image you want to create. Be specific for best results.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput<string>
          label="Aspect Ratio"
          id="aspectRatio"
          value={aspectRatio}
          onChange={setAspectRatio}
          options={aspectRatioSelectOptions}
          disabled={isLoading}
        />
        <SelectInput<number>
          label="Number of Images"
          id="numImages"
          value={numImages}
          onChange={setNumImages}
          options={numImagesSelectOptions}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-700/50 font-medium rounded-lg text-lg px-5 py-3 text-center disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95"
        aria-label={isLoading ? 'Generating images, please wait' : 'Generate Images'}
      >
        {isLoading ? 'Generating Awesomeness...' : '✨ Generate Images'}
      </button>
    </form>
  );
};