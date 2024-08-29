import prisma from "@/db/db";
import BookPreview from "@/app/components/book-preview";
import BookForm from "@/app/components/book-form";

export const dynamic = "force-dynamic";
export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: { reviews: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <>
      <header>
        <BookForm />
      </header>
      <main className="my-4 flex flex-wrap justify-center gap-4 lg:gap-y-8">
        {books.map((book) => (
          <BookPreview key={book.id} book={book} />
        ))}
      </main>
    </>
  );
}
