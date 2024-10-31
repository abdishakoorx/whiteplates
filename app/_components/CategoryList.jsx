"use client";
import React, { useEffect, useRef, useState, Suspense } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

function CategoryListContent() {
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

  return (
    <div className="space-y-2">
      {categoryList &&
        categoryList.map((category, index) => (
          <Link
            key={index}
            href={'?category=' + category.slug}
            className={`
              flex items-center justify-between p-2 rounded-lg transition-all duration-200 
              ${selectedCategory === category.slug 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-gray-100'}
            `}
          >
            <div className="flex items-center space-x-3">
              {category.icon?.url && (
                <Image
                  src={category.icon.url}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="object-cover rounded-md"
                />
              )}
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <ChevronRight 
              className={`
                w-5 h-5 transition-transform 
                ${selectedCategory === category.slug 
                  ? 'text-primary' 
                  : 'text-gray-400 group-hover:text-gray-600'}
              `} 
            />
          </Link>
        ))}
    </div>
  );
}

function CategoryListLoading() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="flex items-center space-x-3 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-md" />
          <div className="w-2/3 h-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

function CategoryList() {
  return (
    <Suspense fallback={<CategoryListLoading />}>
      <CategoryListContent />
    </Suspense>
  );
}

export default CategoryList;