import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, author } = body;

        if (!title || !author) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // TODO: Replace this with an actual user ID from auth
        const userId = request.headers.get('MockUserId');

        if (!userId) {
            return NextResponse.json({ error: 'MockUserId header is required' }, { status: 400 });
        }

        const createdBook = await prisma.book.create({
            data: {
                title,
                author,
                userId,
            },
        })

        revalidatePath("/");

        return NextResponse.json(createdBook, { status: 201 });
    } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}