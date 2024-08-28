import prisma from "@/db/db";
import BookPreview from "@/app/components/book-preview";
import { Button } from "@/app/components/design/button";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: { reviews: true },
    orderBy: { createdAt: "desc" },
    take: 10, // Only get the 10 latest books
  });

  return (
    <>
      <header>
        <div className="mb-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Latest books
            </h1>
            <Button icon={<PlusIcon />}>Add new book</Button>
          </div>

          <h2 className="text-sm text-gray-500">
            Discover the latest books that the community has added and reviewed.
          </h2>
        </div>
      </header>
      <main className="my-4 flex flex-wrap justify-center gap-4 lg:gap-y-8">
        {books.map((book) => (
          <BookPreview key={book.id} book={book} />
        ))}
      </main>
    </>
  );
}
