"use client";
import React from "react";
type InputFormType = {
  required?: boolean;
  placeholder?: string;
  name: string;
  className?: string;
  classPlus?: string;
  id?: string;
  type: "text" | "email" | "password" | "textarea";
  lable?: string;
  onChange?: (value: any) => void;
  slotProps?: string;
  rows?: number;
};
export default function InputForm({
  placeholder,
  required,
  className,
  name,
  id,
  type,
  onChange,
  classPlus,
  lable,
  slotProps,
  rows,
}: InputFormType) {
  const classInput =
    "p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md " +
    classPlus;
  const InputCom = () => {
    if (type === "textarea") {
      return (
        <textarea
          rows={rows}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          name={name}
          className={className ? className : classInput +" resize-none"}
          id={id}
        />
      );
    }
    if (slotProps) {
      return (
        <div className="relative">
          <input
            type={type}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            name={name}
            className={className ? className : classInput}
            id={id}
          />
          <span className="absolute left-2 text-xs top-1/2 bg-slate-100 h-[90%] flex items-center transform -translate-y-1/2">
            {slotProps}
          </span>
        </div>
      );
    } else {
      return (
        <input
          type={type}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          name={name}
          className={className ? className : classInput}
          id={id}
        />
      );
    }
  };
  return lable ? (
    <div className="flex flex-col gap-2">
      <label className="text-sm" htmlFor={id}>
        {lable}:{required ? "*" : null}
      </label>
      <InputCom />
    </div>
  ) : (
    <InputCom />
  );
}
