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

// Create a wrapper component for the search params logic
function HomeContent() {
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [submitted, setSubmitted] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    bases: [],
    layerings: [],
    toppings: [],
    beverages: []
  });
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
    <>
      {selectedCategory !== 'drinks' && <BasesList />}
      {['all', 'breakfast', 'lunch', 'dinner'].includes(selectedCategory) && <LayeringsList />}
      {selectedCategory !== 'breakfast' && 
       selectedCategory !== 'lunch' && 
       selectedCategory !== 'dinner' && <ToppingsList />}
      
      <div className={`${selectedItemCount > 0 ? 'fixed bottom-4 right-4 sm:bottom-20 sm:right-0' : ''}`}>
        {selectedItemCount > 0 && (
          <button onClick={handleSubmit}>
            Send ({selectedItemCount})
          </button>
        )}
      </div>
      
      {/* Show the rating popup if submitted */}
      {isPopupOpen && (
        <RatingPopup 
          rating={rating} 
          onClose={handleClose} 
        />
      )}
    </>
  );
}

// Main component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}