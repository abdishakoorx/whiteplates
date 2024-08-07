import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CategoryList() {
  const listRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setSelectedCategory(params.get('category') || 'all');
  }, [params]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then((resp) => {
      setCategoryList(resp.categories);
    });
  };

  const ScrollLeftHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const ScrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative mt-10'>
      <div className='flex gap-12 overflow-x-auto scrollbar-hide' ref={listRef}>
        {categoryList &&
          categoryList.map((category, index) => (
            <div key={index}>
              <Link
                href={'?category=' + category.slug}
                className={
                  'flex flex-col items-center gap-2 rounded-xl min-w-[200px] hover:border-primary hover:bg-orange-50 cursor-pointer group ' +
                  (selectedCategory === category.slug &&
                    'text-primary scale-110 border-primary bg-orange-150  rounded-xl mb-3')
                }
              >
                <Image
                  src={category.icon?.url}
                  alt={category.name}
                  width={500}
                  height={130}
                  className='h-[160px] object-cover rounded-xl hover:border-primary cursor-pointer'
                />
                <h2 className='font-bold text-l group-hover:text-primary '>
                  {category.name}
                </h2>
              </Link>
            </div>
          ))}
      </div>
      <ArrowLeftCircle
        className='absolute w-10 h-10 mr-4 text-white bg-gray-500 rounded-full cursor-pointer xl:hidden -left-12 top-20'
        onClick={ScrollLeftHandler}
      />
      <ArrowRightCircle
        className='absolute w-10 h-10 ml-4 text-white bg-gray-500 rounded-full cursor-pointer xl:hidden -right-12 top-20'
        onClick={ScrollRightHandler}
      />
    </div>
  );
}

export default CategoryList;
