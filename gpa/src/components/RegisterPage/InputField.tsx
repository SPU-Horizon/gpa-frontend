import React from "react";

export type InputFieldProps = {
  header: string;
  placeholder: string;
};

export default function InputField({ header, placeholder }: InputFieldProps) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-600 ">{header}</label>
      <input
        type="password"
        placeholder={placeholder}
        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
      />
    </div>
  );
}
