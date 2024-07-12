import React from 'react';

const RatingPopup = ({ rating, isPopupOpen, onClose }) => {
  if (!isPopupOpen) return null; // Don't render the popup if isPopupOpen is false

  const descriptions = {
    5: ["Woah! Great 🎉", "Better than the rest 🏆", "Outstanding! 🎉", "Top-notch! 🏆", "Impressive! 🌟", "Superb! 👌", "Excellent! 🥇", "That was a suprise! 😊"],
    4: ["Almost there 🏁", "Great selection 👍", "Very good! 👍", "Nice pick! 🎯", "Good job! 👏", "Pretty good! 😊", "Well done! 🙌", "That was a suprise! 👍"],
    3: ["Midd! 😐", "Very midd! 😑", "Not bad! 😐", "Fair enough! 🤔", "Could be better! 😕", "Average! 🆗", "So-so! 🔄", "That was a suprise! 😕"],
    2: ["Not quite right 😔", "Needs more work 🛠", "Needs improvement! 🚧", "Not great! 😒", "Could do better! 🤨", "Below average! ⬇️", "Meh! 😑", "That was a suprise! 😑"],
    1: ["Why even bother! 😞", "Disappointing! 😞", "Not good! 👎", "Poor choice! 😣", "Unsatisfactory! ❌", "Letdown! 😔", "That was a suprise! 😣", "Wasted my time! 👎", "Terrible! 💀"]
  };

  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push("⭐");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-8 bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-secondary">Rating</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className='ml-3 mr-3'>{stars.join('')} </span>
          </button>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold md:text-4xl lg:text-6xl">{rating}</span>
        </div>
        <div className='items-center justify-center'>
            <div className="mt-4 text-lg">
            {rating >= 1 && rating <= 5 ? (
                <p className={rating >= 4 ? "text-green-800" : rating >= 3 ? "text-yellow-600" : "text-red-600"}>
                {descriptions[rating][Math.floor(Math.random() * descriptions[rating].length)]}
                </p>
            ) : (
                <p>Please select a rating.</p>
            )}
            </div>
        </div>        
      </div>
    </div>
  );
};

export default RatingPopup;