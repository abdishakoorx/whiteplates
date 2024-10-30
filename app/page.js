"use client";
import React, { useState, useEffect, Suspense } from "react";
import BasesList from "./_components/BasesList";
import BeveragesList from "./_components/BeveragesList";
import CategoryList from "./_components/CategoryList";
import LayeringsList from "./_components/LayeringsList";
import SizesList from "./_components/SizesList";
import ToppingsList from "./_components/ToppingsList";
import RatingPopup from "./_components/RatingPopup";
import { useSearchParams } from 'next/navigation';
import GlobalAPI from "./_utils/GlobalApi";

// Define group-specific compatibility matrices
const calculateCompatibility = async (selectedItems) => {
  return Math.floor(Math.random() * 5) + 1;
};

// Component that uses useSearchParams
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
    console.log("selectedItems:", selectedItems);
    if (selectedItemCount === 0) {
      alert("Please select at least one item.");
      return;
    }
    const compatibilityRating = await calculateCompatibility(selectedItems);
    setRating(compatibilityRating);
    setSubmitted(true);
    setIsPopupOpen(true);
    console.log("showRatingPopup:", isPopupOpen);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <CategoryList />
      <SizesList />
      {selectedCategory !== 'drinks' && 
        <BasesList
          selectedCategory={selectedCategory}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemCount={selectedItemCount}
          setSelectedItemCount={setSelectedItemCount}
        />}
      {['all', 'breakfast', 'lunch', 'dinner'].includes(selectedCategory) &&
        <LayeringsList
          selectedCategory={selectedCategory}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemCount={selectedItemCount}
          setSelectedItemCount={setSelectedItemCount}
        />}
      {selectedCategory !== 'breakfast' && selectedCategory !== 'lunch' && selectedCategory !== 'dinner' &&
        <BeveragesList
          selectedCategory={selectedCategory}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemCount={selectedItemCount}
          setSelectedItemCount={setSelectedItemCount}
        />}
       
      <ToppingsList
        selectedCategory={selectedCategory}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectedItemCount={selectedItemCount}
        setSelectedItemCount={setSelectedItemCount}
      />
      <div className={`p-4 ${selectedItemCount > 0 ? 'fixed bottom-4 right-4 sm:bottom-20 sm:right-0' : ''}`}>
        {selectedItemCount > 0 && (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 mb-4 font-bold text-white shadow-2xl bg-primary rounded-3xl sm:px-4 sm:py-2 md:px-5 md:py-2 lg:px-6 lg:py-3"
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

// Main component with Suspense
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}