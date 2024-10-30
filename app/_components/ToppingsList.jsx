import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';

function ToppingsList({ selectedCategory, selectedItems, setSelectedItems, selectedItemCount, setSelectedItemCount }) {
  const [toppingList, setToppingList] = useState([]);

  useEffect(() => {
    getToppingList();
  }, []);

  const getToppingList = () => {
    GlobalApi.GetToppings().then((resp) => {
      setToppingList(resp.toppings);
    });
  };

  if (selectedCategory === 'drinks') return null;

  const handleItemClick = (toppingIndex, itemIndex) => {
    const updatedToppingList = [...toppingList];
    const selectedItem = updatedToppingList[toppingIndex].toppingItems[itemIndex];
    selectedItem.selected = !selectedItem.selected;
    setToppingList(updatedToppingList);

    // Update selected items count
    const updatedSelectedItemCount = selectedItem.selected
      ? selectedItemCount + 1
      : selectedItemCount - 1;
    setSelectedItemCount(updatedSelectedItemCount);

    // Update selected items
    const updatedItems = { ...selectedItems };
    if (selectedItem.selected) {
      updatedItems.toppings.push(selectedItem.name);
    } else {
      updatedItems.toppings = updatedItems.toppings.filter(item => item !== selectedItem.name);
    }
    setSelectedItems(updatedItems);
  };

  return (
    <div className='p-4 mt-10 bg-transparent rounded-lg shadow-lg'>
      {toppingList.map((topping, toppingIndex) => (
        <div key={topping.id} className='p-4 mb-4 rounded-lg shadow-sm hover:shadow-md'>
          <div className='flex items-center mb-4'>
            <Image
              src={topping.icon?.url}
              alt={topping.name}
              width={40}
              height={40}
              className='object-cover mr-4'
            />
            <h1 className='text-xl font-bold text-tertiary'>{topping.name}</h1>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {topping.toppingItems.map((item, itemIndex) => (
              <div 
                key={item.id} 
                className={`items-center p-4 border rounded-lg shadow-md cursor-pointer ${item.selected ? 'bg-quaternary text-white' : 'bg-white'}`} 
                onClick={() => handleItemClick(toppingIndex, itemIndex)}
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

export default ToppingsList;
