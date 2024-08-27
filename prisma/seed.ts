import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanup() {
    const tablenames = await prisma.$queryRaw<
        Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ')

    try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
        console.log('All tables have been truncated.')
    } catch (error) {
        console.log('Error truncating tables', error)
    } finally {
        await prisma.$disconnect()
    }
}

async function main() {
    console.log('WARNING: This will delete all data in your database, this should only be used for development purposes.')
    console.log('Press enter to continue or ctrl-c to cancel.')
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', async function () {
        process.stdin.pause()
    })

    await new Promise((resolve) => process.stdin.on('pause', resolve))
    console.log('Cleaning up existing data...')
    await cleanup()

    console.log('Starting to seed data...')
    const booksData = [
        {
            title: 'Long titled book with a really really really really long title, it can often happen with some books!',
            author: 'Dan Mastrow',
            reviews: [
                { text: 'Great book, just needs a longer title to be 5 stars.', rating: 4, userId: 'user2' },
            ]
        },
        {
            title: 'A long authors name',
            author: 'Daniel the 3rd, first to write a biography in his family and etc.',
            reviews: [
                { text: 'I didnt read it.', rating: 2, userId: 'user2' },
            ]
        },
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            reviews: [
                { text: 'A classic that never gets old.', rating: 5, userId: 'user1' },
                { text: 'Beautifully written, captivating story.', rating: 4, userId: 'user2' }
            ]
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            reviews: [
                { text: 'Powerful and thought-provoking.', rating: 5, userId: 'user3' },
                { text: 'A must-read for everyone.', rating: 5, userId: 'user4' }
            ]
        },

        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            reviews: [
                { text: 'A delightful romance with witty dialogue.', rating: 4, userId: 'user2' },
                { text: 'Austens best work, in my opinion.', rating: 5, userId: 'user3' },
                { text: 'I just couldnt get into it.', rating: 2, userId: 'user4' },
                { text: 'A classic that never gets old.', rating: 5, userId: 'user5' }
            ]
        },
        {
            title: '1984',
            author: 'George Orwell',
            reviews: [
                { text: 'Chillingly relevant even today.', rating: 3, userId: 'user1' },
                { text: 'Theres nothing to worry about here...', rating: 1, userId: 'user2' },
                { text: 'Not realistic, this would never happen!', rating: 1, userId: 'user5' }
            ]
        },
    ]
    for (const bookData of booksData) {
        const { reviews, ...bookInfo } = bookData
        const createdBook = await prisma.book.create({
            data: {
                ...bookInfo,
                reviews: {
                    create: reviews
                }
            },
            include: {
                reviews: true
            }
        })
        const reviewCount = createdBook.reviews.length
        console.log(`Created '${createdBook.title}' with id: ${createdBook.id}`)
        console.log(`Added '${reviewCount}' review${reviewCount === 1 ? "" : "s"} for this book`)
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })