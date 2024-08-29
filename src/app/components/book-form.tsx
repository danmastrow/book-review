"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/components/design/button";
import { FormEvent, useState } from "react";
import { useRouter as useNavigationRouter } from "next/navigation";
import Modal from "./design/modal";
import { DialogTitle } from "@headlessui/react";
import Input from "./design/input";

const BookForm = () => {
  // TODO: Refactor form state to use a form library for validation + submission
  const [showBookModal, setShowBookModal] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasTitleError = title === "";
  const hasAuthorError = author === "";

  const navigationRouter = useNavigationRouter();

  const resetForm = () => {
    setShowBookModal((x) => !x);
    setTitle("");
    setAuthor("");
    setHasSubmitted(false);
    setApiError("");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const createBook = async (title: string, author: string) => {
    try {
      setIsLoading(true);
      setApiError("");

      const urlParams = new URLSearchParams(window.location.search);
      const mockUserId = urlParams.get("mockUserId") ?? "Demo User";

      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          MockUserId: mockUserId, // TODO: Replace this with actual auth
        },
        body: JSON.stringify({
          title,
          author,
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

    if (hasTitleError || hasAuthorError) {
      return;
    }

    await createBook(title, author);
  };

  return (
    <>
      <div className="mb-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Latest books
          </h1>
          <Button
            className="xs:ml-auto xs:mr-0 xs:my-0 my-2 mx-auto w-full max-w-md xs:w-auto"
            variant="primary"
            icon={<PlusIcon />}
            onClick={resetForm}
            disabled={isLoading}
          >
            Add new book
          </Button>
        </div>
        <h2 className="text-sm text-gray-500 max-w-xs">
          Discover the latest books that the community has added and reviewed.
        </h2>
      </div>

      <Modal open={showBookModal} onClose={resetForm}>
        <form onSubmit={handleSubmit}>
          <div>
            <DialogTitle
              as="h3"
              className="text-center text-lg font-semibold leading-6 text-gray-900"
              data-testid="book-form-title"
            >
              Add a new book
            </DialogTitle>
            <p className="mt-2 px-4 text-sm text-gray-500">
              Contribute one of your favorite books to our community to
              kickstart the discussion!
            </p>
          </div>
          <hr className="my-4" />

          <div className="my-4">
            <Input
              id="title"
              label="Title"
              placeholder="etc. Goodnight Moon"
              errorMessage={
                hasTitleError && hasSubmitted ? "Title is required" : ""
              }
              onChange={handleTitleChange}
              data-testid="book-input-title"
            />
          </div>

          <div className="my-4">
            <Input
              id="author"
              label="Author"
              placeholder="etc. Margaret Wise Brown"
              errorMessage={
                hasAuthorError && hasSubmitted ? "Author is required" : ""
              }
              onChange={handleAuthorChange}
              data-testid="book-input-author"
            />
          </div>

          {apiError && (
            <p className="text-sm font-bold text-red-500">Error: {apiError}</p>
          )}

          <div className="mt-6 flex justify-between">
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BookForm;
