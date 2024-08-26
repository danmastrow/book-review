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
    console.log('Press enter to continue or cmd-c to cancel.')
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', async function () {
        process.stdin.pause()
    })
    console.log('Cleaning up existing data...')

    await new Promise((resolve) => process.stdin.on('pause', resolve
    ))
    await cleanup()

    console.log('Starting to seed data...')
    const booksData = [
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
            title: '1984',
            author: 'George Orwell',
            reviews: [
                { text: 'Chillingly relevant even today.', rating: 4, userId: 'user1' },
                { text: 'A stark warning about totalitarianism.', rating: 5, userId: 'user5' }
            ]
        },
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            reviews: [
                { text: 'A delightful romance with witty dialogue.', rating: 4, userId: 'user2' },
                { text: 'Austens best work, in my opinion.', rating: 5, userId: 'user3' }
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
        console.log(`Created book with id: ${createdBook.id}`)
        console.log(`Added ${createdBook.reviews.length} reviews for this book`)
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