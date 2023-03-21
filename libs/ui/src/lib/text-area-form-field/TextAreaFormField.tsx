import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface TextAreaFormFieldProps
  extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
  error?: string;
}

export const TextAreaFormField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFormFieldProps
>(({ id, label, placeholder, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={placeholder}
        {...props}
      />
      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  );
});

export default TextAreaFormField;
