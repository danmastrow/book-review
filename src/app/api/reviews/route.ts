import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { bookId, rating, review } = body;

        if (!bookId || !rating || !review) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return NextResponse.json({ error: 'Rating must be a number between 1 and 5' }, { status: 400 });
        }

        // TODO: Replace this with an actual user ID from auth
        const userId = request.headers.get('MockUserId');

        if (!userId) {
            return NextResponse.json({ error: 'MockUserId header is required' }, { status: 400 });
        }

        const book = await prisma.book.findUnique({
            where: { id: parseInt(bookId) },
        });

        if (!book) {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }

        const existingReview = await prisma.review.findUnique({
            where: {
                bookId_userId: {
                    bookId: parseInt(bookId),
                    userId: userId,
                },
            },
        });

        if (existingReview) {
            return NextResponse.json(
                { error: 'You have already reviewed this book' },
                { status: 400 }
            );
        }

        const newReview = await prisma.review.create({
            data: {
                bookId: parseInt(bookId),
                rating,
                text: review,
                userId,
            },
        });
        revalidatePath(`/books/${bookId}`);

        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}