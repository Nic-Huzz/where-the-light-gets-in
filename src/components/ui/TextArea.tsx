'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, hint, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-2">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3
            text-text placeholder:text-text-light
            bg-white
            border-2 border-gray-200
            rounded-xl
            transition-all duration-200
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            resize-none
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
            ${className}
          `}
          {...props}
        />

        {hint && !error && (
          <p className="mt-2 text-sm text-text-light">{hint}</p>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
