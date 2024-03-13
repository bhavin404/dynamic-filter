import React, { useState } from 'react';

const AlphabetFilter = ({ handlerChange, selected }) => {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {alphabets.split('').map((alphabet, index) => (
        <button
          key={index}
          className={`rounded-lg p-2 ${selected === alphabet ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlerChange(alphabet)}
        >
          {alphabet}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;
