import React from 'react';

interface IBodyProps {
  children: React.ReactNode;
}

function Body({ children }: IBodyProps) {
  return <p className='text-base font-normal'>{children}</p>;
}

export default Body;
