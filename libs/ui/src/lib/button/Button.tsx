import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warn'
    | 'info'
    | 'default';
  align?: 'left' | 'center' | 'right';
}

export function Button({
  color = 'default',
  align = 'left',
  children,
  className,
  ...props
}: ButtonProps) {
  const colorClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warn: 'btn-warn',
    info: 'btn-info',
    default: 'btn-default',
  }[color];
  const alignClass = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  }[align];

  return (
    <button
      className={twMerge('btn', colorClass, 'block', alignClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
