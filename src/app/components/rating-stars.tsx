import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

interface RatingStarsProps {
    rating: number;
    totalStars?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, totalStars = 5 }) => {
    const roundedRating = Math.round(rating);
    const filledStars = Math.min(roundedRating, totalStars);
    const emptyStars = totalStars - filledStars;

    return (
        <dd className="flex items-center gap-x-1">
            {[...Array(filledStars)].map((_, i) => (
                <StarIcon key={`filled-${i}`} className="size-5 text-yellow-400" />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <StarIcon key={`empty-${i}`} className="size-5 text-gray-300" />
            ))}
        </dd>
    );
};