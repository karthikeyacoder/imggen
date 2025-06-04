
export interface AspectRatioOption {
  label: string;
  value: string; // e.g., "1:1"
  width: number;
  height: number;
}

export interface NumImagesOption {
  label: string;
  value: number;
}

export interface SelectOption<T extends string | number> {
  label: string;
  value: T;
}
