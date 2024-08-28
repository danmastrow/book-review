import prisma from "@/db/db";
import { notFound } from "next/navigation";
import RatingStars from "@/app/components/rating-stars";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/util/cn";
import { Metadata } from "next";
import ReviewForm from "@/app/components/review-form";

interface BookPageProps {
  params: {
    id: string;
  };
}

async function getBook(id: string) {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
    include: {
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!book) {
    notFound();
  }

  return book;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const book = await getBook(params.id);

  return {
    title: `${book.title} | Book Review`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBook(params.id);

  const numberOfReviews = book.reviews.length;
  const averageRating =
    book.reviews.reduce((acc, review) => acc + review.rating, 0) /
    numberOfReviews;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <PhotoIcon className="my-2 size-32 text-gray-200" />
        <h2
          className="mb-4 text-center text-3xl font-bold"
          data-testid="book-title"
        >
          {book.title}
        </h2>
        <h3 className="mb-4 max-w-sm text-center text-gray-500">
          By <span data-testid="book-author">{book.author}</span>
        </h3>
        <p className="mb-4 max-w-sm text-left  text-sm font-light text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat...
        </p>

        <div className="mb-4 flex items-center">
          <RatingStars rating={averageRating} />
          <span className="ml-2">
            {averageRating.toFixed(1)} ({numberOfReviews} review
            {numberOfReviews === 1 ? "" : "s"})
          </span>
        </div>
      </div>

      <div className="mx-auto my-4 max-w-md rounded p-4 shadow-md">
        <ReviewForm bookId={book.id} />
        {book.reviews.map((review, i) => (
          <div
            key={review.id}
            className={cn(
              `border-b border-gray-200 mb-4 pb-4 font-light`,
              i === book.reviews.length - 1 && "border-none mb-0 pb-2"
            )}
          >
            <div className="mb-2 flex items-center">
              <RatingStars rating={review.rating} />
              <span className="ml-2 font-semibold">Anonymous</span>
              <UserCircleIcon className="ml-2 size-6" />
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
