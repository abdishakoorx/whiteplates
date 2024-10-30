import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';

function SizesList() {
  const [sizeList, setSizeList] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    getSizeList();
  }, []);

  const getSizeList = () => {
    GlobalApi.GetSizes().then((resp) => {
      setSizeList(resp.sizes);
    });
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className='p-4 mt-10 bg-transparent rounded-lg shadow-lg'>
      <div className="flex items-center mb-4">
        <Image
          src='/sizes.png' 
          alt='Sizes Icon'
          width={40}
          height={40}
          className='object-cover mr-2'
        />
        <h1 className='ml-2 text-2xl font-bold text-tertiary'>Sizes</h1>
      </div>
      <div className='flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-20'>
        {sizeList.map((size) => (
          <div
            key={size.id}
            className={`flex items-center justify-center cursor-pointer p-3 border rounded-lg transition-transform ${
              selectedSize === size ? 'bg-secondary border-blue-500 scale-105 text-white' : 'bg-white'
            }`}
            onClick={() => handleSizeClick(size)}
          >
            <h2 className='text-xl font-semibold'>{size.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SizesList;
