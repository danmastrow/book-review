import React from "react";
import { PhotoIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import RatingStars from "./rating-stars";

export interface BookReview {
  id: number;
  title: string;
  author: string;
  reviews: { rating: number }[];
}

export interface BookPreviewProps {
  book: BookReview;
}

const BookPreview: React.FC<BookPreviewProps> = ({ book }) => {
  const averageRating =
    book.reviews.reduce((acc, review) => acc + review.rating, 0) /
      book.reviews.length || 0;

  return (
    <li
      className="col-span-1 flex w-56 cursor-pointer flex-col divide-y divide-gray-200 rounded border bg-white text-center shadow-sm transition-all duration-200 hover:scale-110 hover:drop-shadow-lg lg:-mx-12 lg:shadow-none"
      data-testid="book-preview"
    >
      <div className="flex flex-1 flex-col gap-y-0 p-8">
        <PhotoIcon className="mx-auto my-2 size-32 text-gray-200" />
        <h3 className="my-1 line-clamp-1 overflow-hidden text-sm font-medium text-gray-900">
          {book.title}
        </h3>
        <dl className="flex grow flex-col justify-between gap-y-2">
          <dt className="sr-only">Title</dt>
          <dd className="line-clamp-1 overflow-hidden text-sm text-gray-500">
            By {book.author}
          </dd>
          <dt className="sr-only">Author</dt>

          <dd>
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-black">
              {book.reviews.length} review{book.reviews.length === 1 ? "" : "s"}
            </span>
          </dd>

          <dt className="sr-only">Average rating</dt>
          <RatingStars rating={averageRating} />
        </dl>
      </div>
      <div>
        <div className="flex items-center justify-center gap-0 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
          View details
          <ChevronRightIcon aria-hidden="true" className="size-5 text-black" />
        </div>
      </div>
    </li>
  );
};

export default BookPreview;
