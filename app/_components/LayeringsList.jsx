import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';

function LayeringsList({ selectedCategory, selectedItems, setSelectedItems, selectedItemCount, setSelectedItemCount }) {
  const [layeringList, setLayeringList] = useState([]);

  useEffect(() => {
    getLayeringList();
  }, []);

  const getLayeringList = () => {
    GlobalApi.GetLayerings().then((resp) => {
      setLayeringList(resp.layerings);
    });
  };

  if (selectedCategory === 'drinks') return null;

  const handleItemClick = (layeringIndex, itemIndex) => {
    const updatedLayeringList = [...layeringList];
    const selectedItem = updatedLayeringList[layeringIndex].layeringItems[itemIndex];
    selectedItem.selected = !selectedItem.selected;
    setLayeringList(updatedLayeringList);

    // Update selected items count
    const updatedSelectedItemCount = selectedItem.selected
      ? selectedItemCount + 1
      : selectedItemCount - 1;
    setSelectedItemCount(updatedSelectedItemCount);

    // Update selected items
    const updatedItems = { ...selectedItems };
    if (selectedItem.selected) {
      updatedItems.layerings.push(selectedItem.name);
    } else {
      updatedItems.layerings = updatedItems.layerings.filter(item => item !== selectedItem.name);
    }
    setSelectedItems(updatedItems);
  };

  return (
    <div className='p-4 mt-10 bg-transparent rounded-lg shadow-lg'>
      {layeringList.map((layering, layeringIndex) => (
        <div key={layering.id} className='p-4 mb-4 rounded-lg shadow-sm hover:shadow-md'>
          <div className='flex items-center mb-4'>
            <Image
              src={layering.icon?.url}
              alt={layering.name}
              width={40}
              height={40}
              className='object-cover mr-4'
            />
            <h1 className='text-xl font-bold text-tertiary'>{layering.name}</h1>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {layering.layeringItems.map((item, itemIndex) => (
              <div 
                key={item.id} 
                className={`items-center p-4 border rounded-lg shadow-md cursor-pointer ${item.selected ? 'bg-quaternary text-white' : 'bg-white'}`} 
                onClick={() => handleItemClick(layeringIndex, itemIndex)}
              >
                <span className='text-xl'>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LayeringsList;
