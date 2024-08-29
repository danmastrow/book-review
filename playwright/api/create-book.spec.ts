import { test, expect } from '@playwright/test';
import prisma from '@/db/db';  // Adjust this import path as needed

test.describe('POST /api/books', () => {
    const apiUrl = '/api/books';
    const mockUserId = 'e2e-api-test-create-book';

    test.afterEach(async () => {
        await prisma.book.deleteMany({
            where: {
                userId: mockUserId
            }
        });
    });

    test('successfully creates a new book', async ({ request }) => {
        const mockUserId = 'testUser123';
        const response = await request.post(apiUrl, {
            data: {
                title: 'Test Book',
                author: 'Test Author'
            },
            headers: {
                'MockUserId': mockUserId
            }
        });

        expect(response.status()).toBe(201);
        const book = await response.json();
        expect(book).toHaveProperty('id');
        expect(book.title).toBe('Test Book');
        expect(book.author).toBe('Test Author');
        expect(book.userId).toBe(mockUserId);
    });

    test('returns 400 if title is missing', async ({ request }) => {
        const response = await request.post(apiUrl, {
            data: {
                author: 'Test Author'
            },
            headers: {
                'MockUserId': 'testUser123'
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('Missing required fields');
    });

    test('returns 400 if author is missing', async ({ request }) => {
        const response = await request.post(apiUrl, {
            data: {
                title: 'Test Book'
            },
            headers: {
                'MockUserId': 'testUser123'
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('Missing required fields');
    });

    test('returns 400 if MockUserId header is missing', async ({ request }) => {
        const response = await request.post(apiUrl, {
            data: {
                title: 'Test Book',
                author: 'Test Author'
            }
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('MockUserId header is required');
    });

    test('returns 500 for database errors', async ({ request }) => {
        const response = await request.post(apiUrl, {
            data: {
                title: 123,  // Invalid type: should be a string
                author: 'Test Author'
            },
            headers: {
                'MockUserId': 'testUser123'
            }
        });

        expect(response.status()).toBe(500);
        const body = await response.json();
        expect(body.error).toBe('Internal Server Error');
    });
});