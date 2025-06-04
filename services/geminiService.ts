
import { GoogleGenAI, GenerateImagesResponse } from "@google/genai";
import { ASPECT_RATIO_OPTIONS } from '../constants';

// IMPORTANT: This relies on process.env.API_KEY being set in the environment.
// In a typical Vite/CRA setup, prefix with VITE_ or REACT_APP_ respectively.
// For this exercise, we assume process.env.API_KEY is directly available.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.error("API_KEY environment variable is not set. Image generation will not work.");
}

export const generateImagesFromPrompt = async (
  prompt: string,
  aspectRatioValue: string,
  numImages: number
): Promise<string[]> => {
  if (!ai) {
    throw new Error("Gemini API client is not initialized. Is the API_KEY configured?");
  }
  if (!API_KEY) { // Redundant check, but good for safety if ai somehow gets initialized without key
    throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
  }

  const selectedAspectRatio = ASPECT_RATIO_OPTIONS.find(opt => opt.value === aspectRatioValue);
  if (!selectedAspectRatio) {
    throw new Error("Invalid aspect ratio selected.");
  }

  const { width, height } = selectedAspectRatio;

  try {
    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: {
        numberOfImages: numImages,
        outputMimeType: 'image/png',
        width: width, // Moved into config
        height: height, // Moved into config
        // negativePrompt was removed as it's not supported
        // It's good practice to add safety settings if needed, though defaults are often reasonable.
        // Refer to Gemini documentation for available safety settings for Imagen models.
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("The API did not return any images. This might be due to safety filters or an issue with the prompt.");
    }

    return response.generatedImages.map(img => {
        if (!img.image || !img.image.imageBytes) {
            console.warn("Received an image object without imageBytes:", img);
            throw new Error("API returned an invalid image object.");
        }
        return `data:image/png;base64,${img.image.imageBytes}`;
    });

  } catch (error) {
    console.error("Error generating images with Gemini API:", error);
    let errorMessage = "An unknown error occurred while generating images.";
    if (error instanceof Error) {
      // Check for common error messages from Gemini or network issues
      if (error.message.toLowerCase().includes("api key not valid")) {
        errorMessage = "Invalid API Key. Please check your configuration.";
      } else if (error.message.toLowerCase().includes("quota")) {
        errorMessage = "API quota exceeded. Please check your Gemini API plan or usage limits.";
      } else if (error.message.toLowerCase().includes("safety") || error.message.toLowerCase().includes("blocked")) {
        errorMessage = "The prompt or generated content was blocked due to safety policies. Please try a different or less sensitive prompt.";
      } else if (error.message.toLowerCase().includes("failed to fetch") || error.message.toLowerCase().includes("networkerror")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else {
        errorMessage = `Failed to generate images: ${error.message}`;
      }
    }
    throw new Error(errorMessage);
  }
};
