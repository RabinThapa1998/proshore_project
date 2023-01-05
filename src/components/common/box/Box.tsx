import React from 'react';

interface IBoxProps {
  direction?: 'row' | 'column';
  component?: 'flex' | 'block';
  align?: 'center' | 'start' | 'end';
  justify?: 'center' | 'start' | 'end';
  children: React.ReactNode;
  className?: string;
}

export function Box({
  component = 'block',
  direction = 'row',
  className = '',
  align = 'center',
  justify = 'center',
  children,
}: IBoxProps) {
  if (component === 'flex') {
    if (direction === 'row') {
      return (
        <div className={`flex flex-row  items-${align} justify-${justify} ${className}`}>
          {children}
        </div>
      );
    } else {
      return (
        <div className={`flex  flex-col items-${align} justify-${justify}  ${className}`}>
          {children}
        </div>
      );
    }
  } else {
    return <div className={className}>{children}</div>;
  }
}
