"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/util/cn";
import { Button } from "@/app/components/design/button";
import { FormEvent, useState } from "react";
import EditableRatingStars from "./editable-rating-stars";
import { useRouter as useNavigationRouter } from "next/navigation";

type ReviewFormProps = {
  bookId: number;
};
const ReviewForm = ({ bookId }: ReviewFormProps) => {
  // TODO: Refactor form state to use a form library for validation + submission
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasRatingError = selectedRating === 0;
  const hasReviewError = review === "";

  const navigationRouter = useNavigationRouter();

  const resetForm = () => {
    setShowReviewForm((x) => !x);
    setSelectedRating(0);
    setReview("");
    setHasSubmitted(false);
    setApiError("");
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const createReview = async (
    bookId: number,
    rating: number,
    review: string
  ) => {
    try {
      setIsLoading(true);
      setApiError("");

      const urlParams = new URLSearchParams(window.location.search);
      const mockUserId = urlParams.get("mockUserId") ?? "Demo User";

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          MockUserId: mockUserId, // TODO: Replace this with actual auth
        },
        body: JSON.stringify({
          bookId,
          rating,
          review,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred");
      }

      resetForm();
      navigationRouter.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (hasRatingError || hasReviewError) {
      return;
    }

    await createReview(bookId, selectedRating, review);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 align-middle">
        <h4 className="text-2xl font-semibold">Reviews</h4>
        <Button
          className="ml-auto xs:w-auto w-full max-w-md"
          variant={showReviewForm ? "danger" : "primary"}
          icon={showReviewForm ? undefined : <PlusIcon />}
          onClick={resetForm}
          disabled={isLoading}
        >
          {showReviewForm ? "Cancel" : "Write a review"}
        </Button>
      </div>
      {showReviewForm && (
        <div className={cn(`border-b border-gray-200 mb-4 pb-4 font-light`)}>
          <form
            className="mb-2 flex flex-col items-start gap-2"
            onSubmit={handleSubmit}
          >
            <EditableRatingStars
              initialRating={selectedRating}
              onRatingChange={handleRatingChange}
            />
            {hasRatingError && hasSubmitted && (
              <p className="text-sm font-bold text-red-500">
                Please select a rating
              </p>
            )}
            <textarea
              id="review"
              name="review"
              rows={4}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
              placeholder="Write your review here..."
              onChange={handleReviewChange}
            />
            {hasReviewError && hasSubmitted && (
              <p className="text-sm font-bold text-red-500">
                Please enter a review.
              </p>
            )}
            {apiError && (
              <p className="text-sm font-bold text-red-500">
                Error: {apiError}
              </p>
            )}

            <Button className="ml-auto" type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ReviewForm;
