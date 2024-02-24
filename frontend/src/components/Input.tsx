import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons from react-icons

interface InputProps {
  title: string;
  placeHolder: string;
  inputType: string;
  min?:number;
  max: number;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

function Input({
  title,
  placeHolder,
  inputType,
  min,
  max,
  error,
  onChange,
  value,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col">
      <label htmlFor={placeHolder} className="pb-2">
        {title}
      </label>
      <div className="relative">
        <input
          value={value}
          id={`input-${placeHolder}`}
          placeholder={placeHolder}
          type={showPassword ? 'text' : inputType}
          autoComplete="off"
          minLength={min}
          maxLength={max}
          onChange={onChange}
          className="block w-full text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-[#a855f7]"
        />
        {inputType === 'password' && (
          <button
            className="absolute top-0 right-0 h-full px-2 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <HiEye /> : <HiEyeOff />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-[14px] font-semibold">{error}</span>
      )}
    </div>
  );
}

export default Input;
