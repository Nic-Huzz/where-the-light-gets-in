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
          <label className="block text-sm font-medium text-white mb-2">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3
            text-white placeholder:text-white/50
            bg-white/15
            backdrop-blur-md
            border-2 border-white/30
            rounded-xl
            transition-all duration-200
            focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20
            resize-none
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
            ${className}
          `}
          {...props}
        />

        {hint && !error && (
          <p className="mt-2 text-sm text-white/60">{hint}</p>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-300">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
