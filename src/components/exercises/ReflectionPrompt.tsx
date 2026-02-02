'use client';

import { TextArea } from '@/components/ui';

interface ReflectionPromptProps {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  example?: string;
  minRows?: number;
}

export function ReflectionPrompt({
  prompt,
  value,
  onChange,
  placeholder = 'Write your thoughts here...',
  hint,
  example,
  minRows = 4,
}: ReflectionPromptProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-text leading-relaxed">
        {prompt}
      </p>

      {example && (
        <div className="bg-cream rounded-xl p-4 text-sm text-text-light">
          <span className="font-medium">For example: </span>
          {example}
        </div>
      )}

      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        hint={hint}
        rows={minRows}
        className="text-base"
      />
    </div>
  );
}

export default ReflectionPrompt;
