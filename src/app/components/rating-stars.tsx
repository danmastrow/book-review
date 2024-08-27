import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

export interface RatingStarsProps {
  rating: number;
  totalStars?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  totalStars = 5,
}) => {
  const roundedRating = Math.round(rating);
  const filledStars = Math.min(roundedRating, totalStars);
  const emptyStars = totalStars - filledStars;

  return (
    <dd
      className="flex items-center justify-center gap-x-1"
      data-testid="rating-stars"
    >
      {[...Array(filledStars)].map((_, i) => (
        <StarIcon
          key={`filled-${i}`}
          data-testid="filled-star"
          className="size-5 text-yellow-400"
        />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon
          key={`empty-${i}`}
          data-testid="empty-star"
          className="size-5 text-gray-300"
        />
      ))}
    </dd>
  );
};

export default RatingStars;
