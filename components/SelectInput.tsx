import React from 'react';
import { SelectOption } from '../types';

interface SelectInputProps<T extends string | number> {
  label: string;
  id: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  disabled?: boolean;
}

export const SelectInput = <T extends string | number,>({
  label,
  id,
  value,
  onChange,
  options,
  disabled = false,
}: SelectInputProps<T>): React.ReactNode => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const numericOption = options.find(opt => opt.value.toString() === selectedValue);
    if (numericOption && typeof numericOption.value === 'number') {
      onChange(parseInt(selectedValue, 10) as T);
    } else {
      onChange(selectedValue as T);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="bg-white/5 border border-white/10 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-500 focus:bg-white/10 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {options.map((option) => (
          <option key={option.value.toString()} value={option.value} className="bg-gray-800 text-gray-200">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};