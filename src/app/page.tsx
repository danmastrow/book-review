import prisma from '@/db/db'
import { ChevronRightIcon, PhotoIcon, StarIcon } from '@heroicons/react/20/solid'

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: { reviews: true },
  })

  return (
    <>
      <header>
        <div className="mb-4 max-w-3xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Latest books</h1>
          <h2 className='text-sm text-gray-500'>Discover the latest books that the community has added and reviewed.</h2>
        </div>
      </header>
      <main className='my-4 flex flex-wrap justify-center gap-4 lg:gap-y-8'>
        {books.map((book) => (
          <li
            key={book.id}
            className="col-span-1 flex w-56 cursor-pointer flex-col divide-y divide-gray-200 rounded border bg-white text-center shadow-sm transition-all duration-200 hover:scale-110 hover:drop-shadow-lg lg:-mx-12 lg:shadow-none"
          >
            <div className="flex flex-1 flex-col gap-y-0 p-8">
              <PhotoIcon className="mx-auto my-2 size-32 text-gray-200" />
              <h3 className="my-1 line-clamp-1 overflow-hidden text-sm font-medium text-gray-900">{book.title}</h3>
              <dl className="flex grow flex-col justify-between gap-y-2">
                <dt className="sr-only">Title</dt>
                <dd className="line-clamp-1 overflow-hidden text-sm text-gray-500">By {book.author}</dd>
                <dt className="sr-only">Author</dt>

                <dd className="">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-black">
                    {book.reviews.length} review{book.reviews.length === 1 ? '' : 's'}
                  </span>
                </dd>

                <dt className="sr-only">Average rating</dt>
                <dd className="flex items-center justify-center gap-x-1">
                  {Array.from({ length: Math.round(book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length) }, (_, i) => (
                    <StarIcon key={i} className="size-5 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - Math.round(book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length) }, (_, i) => (
                    <StarIcon key={i} className="size-5 text-gray-300" />
                  ))}
                </dd>

              </dl>
            </div>
            <div>
              <div
                className="flex items-center justify-center gap-0 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                View details
                <ChevronRightIcon aria-hidden="true" className="size-5 text-black" />

              </div>
            </div>
          </li>
        ))}
      </main >
    </>
  )
}