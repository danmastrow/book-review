import prisma from "@/db/db";
import { BookPreview } from "./components/book-preview";

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: { reviews: true },
  });

  return (
    <>
      <header>
        <div className="mb-4 max-w-3xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Latest books
          </h1>
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
