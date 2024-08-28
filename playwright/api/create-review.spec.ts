import prisma from '@/db/db';
import { test, expect } from '@playwright/test';

test.describe('POST /api/reviews', () => {
    const apiUrl = '/api/reviews';
    const mockUserId = 'testUser123';

    test('successfully creates a new review', async ({ request }) => {
        const testBook = await prisma.book.create({
            data: {
                title: 'Test Book',
                author: 'Test Author',
            }
        });

        const response = await request.post(apiUrl, {
            data: {
                bookId: testBook.id,
                rating: 4,
                review: 'Great book!'
            },
            headers: {
                'MockUserId': mockUserId
            }
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.bookId).toBe(testBook.id);
        expect(responseBody.rating).toBe(4);
        expect(responseBody.text).toBe('Great book!');
        expect(responseBody.userId).toBe(mockUserId);
    });

    test('returns 400 if required fields are missing', async ({ request }) => {
        const response = await request.post(apiUrl, {
            data: {
                bookId: 1,
                rating: 4
                // Missing 'review' field
            },
            headers: {
                'MockUserId': mockUserId
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Missing required fields');
    });

    test('returns 400 if rating is invalid', async ({ request }) => {
        const response = await request.post(apiUrl, {
            data: {
                bookId: 1,
                rating: 6,  // Invalid rating
                review: 'Great book!'
            },
            headers: {
                'MockUserId': mockUserId
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Rating must be a number between 1 and 5');
    });

    test('returns 400 if MockUserId header is missing', async ({ request }) => {
        const response = await request.post(apiUrl, {
            data: {
                bookId: 1,
                rating: 4,
                review: 'Great book!'
            }
            // Missing MockUserId header
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.error).toBe('MockUserId header is required');
    });

    test('returns 400 if user has already reviewed the book', async ({ request }) => {
        const testBook = await prisma.book.create({
            data: {
                title: 'Test Book',
                author: 'Test Author',
            }
        });

        // First review
        await request.post(apiUrl, {
            data: {
                bookId: testBook.id,
                rating: 4,
                review: 'Great book!'
            },
            headers: {
                'MockUserId': mockUserId
            }
        });

        // Attempt to submit a second review
        const response = await request.post(apiUrl, {
            data: {
                bookId: testBook.id,
                rating: 5,
                review: 'Still a great book!'
            },
            headers: {
                'MockUserId': mockUserId
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.error).toBe('You have already reviewed this book');
    });

    test('returns 404 if book does not exist', async ({ request }) => {
        const nonExistentBookId = 9999999;
        const response = await request.post(apiUrl, {
            data: {
                bookId: nonExistentBookId,
                rating: 4,
                review: 'Great book!'
            },
            headers: {
                'MockUserId': mockUserId
            }
        });

        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Book not found');
    });
});