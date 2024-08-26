import prisma from '../db/db'
import Link from 'next/link'

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: { reviews: true },
  })

  return (
    <>
      <h1 className='text-6xl'>Books</h1>
      <main className='mx-auto max-w-3xl'>
      <div className='grid grid-cols-4 gap-4'>
        {books.map((book) => (
          <div key={book.id} className='border rounded-md'>
            <h2 className='text-xl'>{book.title}</h2>
            <p>By {book.author}</p>
            <p>Reviews: {book.reviews.length}</p>
            <Link href={`/books/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
      </main>
    </>
  )
}