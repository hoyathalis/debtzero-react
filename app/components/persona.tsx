import React from 'react';

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default Card;