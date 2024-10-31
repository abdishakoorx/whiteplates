"use client";
import React, { useState, useEffect, Suspense } from "react";
import BasesList from "./_components/BasesList";
import BeveragesList from "./_components/BeveragesList";
import LayeringsList from "./_components/LayeringsList";
import SizesList from "./_components/SizesList";
import ToppingsList from "./_components/ToppingsList";
import RatingPopup from "./_components/RatingPopup";
import { useSearchParams } from 'next/navigation';

const calculateCompatibility = async (selectedItems) => {
  return Math.floor(Math.random() * 5) + 1;
};

function HomeContent() {
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [submitted, setSubmitted] = useState(false);
  const [selectedItems, setSelectedItems] = useState({ bases: [], layerings: [], toppings: [], beverages: [] });
  const [rating, setRating] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItemCount, setSelectedItemCount] = useState(0);

  useEffect(() => {
    setSelectedCategory(params.get('category') || 'all');
  }, [params]);

  const handleSubmit = async () => {
    if (selectedItemCount === 0) {
      alert("Please select at least one item.");
      return;
    }
    const compatibilityRating = await calculateCompatibility(selectedItems);
    setRating(compatibilityRating);
    setSubmitted(true);
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="space-y-6">
      <SizesList />
      
      {selectedCategory !== 'drinks' && (
        <BasesList
          selectedCategory={selectedCategory}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemCount={selectedItemCount}
          setSelectedItemCount={setSelectedItemCount}
        />
      )}
      
      {['all', 'breakfast', 'lunch', 'dinner'].includes(selectedCategory) && (
        <LayeringsList
          selectedCategory={selectedCategory}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemCount={selectedItemCount}
          setSelectedItemCount={setSelectedItemCount}
        />
      )}
      
      {selectedCategory !== 'breakfast' && selectedCategory !== 'lunch' && selectedCategory !== 'dinner' && (
        <BeveragesList
          selectedCategory={selectedCategory}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemCount={selectedItemCount}
          setSelectedItemCount={setSelectedItemCount}
        />
      )}
      
      <ToppingsList
        selectedCategory={selectedCategory}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectedItemCount={selectedItemCount}
        setSelectedItemCount={setSelectedItemCount}
      />
      
      <div className={`${selectedItemCount > 0 ? 'fixed bottom-4 right-4 sm:bottom-20 sm:right-0' : ''}`}>
        {selectedItemCount > 0 && (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 font-bold text-white shadow-2xl bg-primary rounded-3xl"
          >
            Send ({selectedItemCount})
          </button>
        )}
      </div>

      <RatingPopup
        rating={rating}
        isPopupOpen={isPopupOpen}
        onClose={handleClose}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
