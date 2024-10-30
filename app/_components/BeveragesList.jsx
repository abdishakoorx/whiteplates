import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';

function BeveragesList({ selectedCategory, selectedItems, setSelectedItems, selectedItemCount, setSelectedItemCount }) {
  const [beverageList, setBeverageList] = useState([]);

  useEffect(() => {
    getBeverageList();
  }, []);

  const getBeverageList = () => {
    GlobalApi.GetBeverages().then((resp) => {
      setBeverageList(resp.beverages);
    });
  };

  if (selectedCategory === 'breakfast') return null;

  const handleItemClick = (index) => {
    const updatedBeverageList = [...beverageList];
    const selectedItem = updatedBeverageList[index];
    selectedItem.selected = !selectedItem.selected;
    setBeverageList(updatedBeverageList);

    // Update selected items count
    const updatedSelectedItemCount = selectedItem.selected
      ? selectedItemCount + 1
      : selectedItemCount - 1;
    setSelectedItemCount(updatedSelectedItemCount);

    // Update selected items
    const updatedItems = { ...selectedItems };
    if (selectedItem.selected) {
      updatedItems.beverages.push(selectedItem.name);
    } else {
      updatedItems.beverages = updatedItems.beverages.filter(item => item !== selectedItem.name);
    }
    setSelectedItems(updatedItems);
  };

  return (
    <div className='p-4 mt-10 bg-transparent rounded-lg shadow-lg'>
      <div className='flex items-center mb-4 ml-2'>
        <Image
            src='/drink.png' 
            alt='Drink Icon'
            width={40}
            height={40}
            className='object-cover mr-4'
          />
        <h1 className='text-2xl font-bold text-tertiary'>Beverages</h1>
      </div>
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {beverageList.map((beverage, index) => (
          <div 
            key={beverage.id} 
            className={`items-center p-4 border rounded-lg shadow-md cursor-pointer ${beverage.selected ? 'bg-quaternary text-white' : 'bg-white'}`} 
            onClick={() => handleItemClick(index)}
          >
            <span className='text-xl'>{beverage.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeveragesList;
