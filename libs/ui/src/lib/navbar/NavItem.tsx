import { HTMLProps, MouseEventHandler, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export type NavItemProps = {
  className?: string;
  children: ReactNode;
} & (
  | Required<Pick<HTMLProps<HTMLButtonElement>, 'onClick'>>
  | {
      to: string;
    }
);

export function NavItem({ className, children, ...props }: NavItemProps) {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    'onClick' in props ? props.onClick(e) : navigate(props.to);
  };

  return (
    <button
      className={twMerge(
        'px-2 text-neutral-500 hover:text-neutral-700 [&.active]:text-black/90 dark:[&.active]:text-zinc-400',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default NavItem;
