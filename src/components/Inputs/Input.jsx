import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, id, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-slate-700 mb-2 block"
      >
        {label}
      </label>

      <div className="w-full flex items-center gap-3 text-sm text-slate-800 bg-white rounded-lg px-4 py-3 border border-slate-200 outline-none focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
        <input
          id={inputId}
          name={name || inputId}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent border-0 outline-none ring-0 focus:ring-0 placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={20}
              className="text-teal-600 cursor-pointer hover:text-teal-700 transition-colors flex-shrink-0"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors flex-shrink-0"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
