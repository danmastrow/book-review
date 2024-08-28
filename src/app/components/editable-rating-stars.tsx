import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

export interface EditableRatingStarsProps {
  initialRating?: number;
  totalStars?: number;
  onRatingChange: (rating: number) => void;
}

const EditableRatingStars: React.FC<EditableRatingStarsProps> = ({
  initialRating = 0,
  totalStars = 5,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const displayedRating = hoveredRating !== null ? hoveredRating : rating;

  return (
    <div
      className="flex items-center gap-x-1"
      onMouseLeave={handleMouseLeave}
      data-testid="editable-rating-stars"
    >
      {[...Array(totalStars)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= displayedRating;
        return (
          <StarIcon
            key={`star-${index}`}
            className={`size-6 cursor-pointer ${
              isFilled ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => handleStarClick(starRating)}
            onMouseEnter={() => handleStarHover(starRating)}
            data-testid={
              isFilled ? `filled-star-${index}` : `empty-star-${index}`
            }
          />
        );
      })}
      {/* X stars */}
    </div>
  );
};

export default EditableRatingStars;
