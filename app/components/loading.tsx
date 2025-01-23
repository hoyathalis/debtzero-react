import React from 'react';

type LoadingProps = {
  message: string;
};

export default function Loading({ message }: LoadingProps) {
    return (
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2">{message}</p>
      </div>
    );
}