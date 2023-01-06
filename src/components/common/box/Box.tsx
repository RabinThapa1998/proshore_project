import React from 'react';

interface IBoxProps {
  direction?: 'row' | 'column';
  component?: 'flex' | 'block';
  align?: 'center' | 'start' | 'end' | 'between' | 'around';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around';
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
  const alignItems = `items-${align}`;
  const justifyContent = `justify-${justify}`;
  if (component === 'flex') {
    if (direction === 'row') {
      return (
        <div className={`flex flex-row  ${alignItems} ${justifyContent} ${className}`}>
          {children}
        </div>
      );
    } else {
      return (
        <div className={`flex  flex-col ${alignItems} ${justifyContent}  ${className}`}>
          {children}
        </div>
      );
    }
  } else {
    return <div className={className}>{children}</div>;
  }
}
