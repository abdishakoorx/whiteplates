import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';

const BasesList = ({
  selectedCategory,
  selectedItems,
  setSelectedItems,
  selectedItemCount,
  setSelectedItemCount
}) => {
  const [baseList, setBaseList] = useState([]);

  useEffect(() => {
    getBaseList();
  }, []);

  const getBaseList = () => {
    GlobalApi.GetBases().then((resp) => {
      setBaseList(resp.bases);
    });
  };

  const filterBases = (bases) => {
    if (selectedCategory === 'breakfast') {
      return bases.filter(base => base.name.toLowerCase().includes('bread'));
    }
    return bases;
  };

  const handleItemClick = (baseIndex, itemIndex) => {
    const updatedBaseList = [...baseList];
    const selectedItem = updatedBaseList[baseIndex].baseItems[itemIndex];
    selectedItem.selected = !selectedItem.selected;
    setBaseList(updatedBaseList);

    // Update selected items count
    const updatedSelectedItemCount = selectedItem.selected
      ? selectedItemCount + 1
      : selectedItemCount - 1;
    setSelectedItemCount(updatedSelectedItemCount);

    // Update selected items
    const updatedItems = { ...selectedItems };
    if (selectedItem.selected) {
      updatedItems.bases.push(selectedItem.name);
    } else {
      updatedItems.bases = updatedItems.bases.filter(item => item !== selectedItem.name);
    }
    setSelectedItems(updatedItems);
  };

  const filteredBases = filterBases(baseList);

  return (
    <div className="p-4 mt-10 bg-transparent rounded-lg shadow-lg">
      {filteredBases.map((base, baseIndex) => (
        <div key={base.id} className="p-4 mb-4 rounded-lg shadow-sm hover:shadow-md">
          <div className='flex items-center mb-4'>
            <Image
              src={base.icon?.url}
              alt={base.name}
              width={40}
              height={40}
              className='object-cover mr-4'
            />
            <h1 className="text-xl font-bold text-tertiary">{base.name}</h1>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {base.baseItems.map((item, itemIndex) => (
              <div
                key={item.id}
                className={`items-center p-2 border rounded-lg shadow-md cursor-pointer ${item.selected ? 'bg-quaternary text-white' : 'bg-white'}`}
                onClick={() => handleItemClick(baseIndex, itemIndex)}
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

export default BasesList;