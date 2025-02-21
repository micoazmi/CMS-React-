// src/components/InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  error?: string; // New prop for error messages
}

export default function InputField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
  error,
}: InputFieldProps) {
  return (
    <div className="w-full mb-4">
      <label className="text-gray-700 font-medium">{label}</label>
      <div
        className={`flex items-center border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2 mt-1`}
      >
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full focus:outline-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
