
import { AspectRatioOption, NumImagesOption } from './types';

export const APP_NAME = "kaalgen-img";

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { label: 'Square (1:1)', value: '1:1', width: 1024, height: 1024 },
  { label: 'Landscape (16:9)', value: '16:9', width: 1536, height: 864 },
  { label: 'Portrait (9:16)', value: '9:16', width: 864, height: 1536 },
  { label: 'Widescreen (21:9)', value: '21:9', width: 1792, height: 768 },
  { label: 'Tall (3:4)', value: '3:4', width: 768, height: 1024 },
  { label: 'Photo (3:2)', value: '3:2', width: 1536, height: 1024},
  { label: 'Portrait Photo (2:3)', value: '2:3', width: 1024, height: 1536},
];

export const NUM_IMAGES_OPTIONS: NumImagesOption[] = [
  { label: '1 Image', value: 1 },
  { label: '2 Images', value: 2 },
  { label: '4 Images', value: 4 },
  // Imagen 3 supports up to 8. Let's stick to 4 for simplicity in layout.
];

export const DEFAULT_ASPECT_RATIO = ASPECT_RATIO_OPTIONS[0].value;
export const DEFAULT_NUM_IMAGES = NUM_IMAGES_OPTIONS[0].value;
