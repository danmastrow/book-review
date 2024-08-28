import { test, expect } from '@playwright/test';

test('Clicking on a book preview navigates to the book page', async ({ page }) => {
  const baseUrl = process.env.BASE_URL
  if (!baseUrl) {
    throw new Error('BASE_URL environment variable is not set');
  }
  await page.goto(baseUrl);

  await page.waitForSelector('[data-testid="book-preview"]');

  const firstBook = page.locator('[data-testid="book-preview"]').first();
  expect(firstBook).toBeTruthy();

  const bookTitle = await firstBook.locator('[data-testid="book-title"]').textContent();
  const bookAuthor = await firstBook.locator('[data-testid="book-author"]').textContent();

  expect(bookTitle).toBeTruthy();
  expect(bookAuthor).toBeTruthy();

  await firstBook.locator('a').click();
  await page.waitForURL('/books/**');

  await expect(page).toHaveTitle(`${bookTitle} | Book Review`);

  await expect(page.locator('h2')).toHaveText(bookTitle!);
  await expect(page.locator('h3')).toContainText(bookAuthor!);

  await expect(page.locator('h4:has-text("Reviews")')).toBeVisible();
});

test('Adding a new review to a book', async ({ page }) => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error('BASE_URL environment variable is not set');
  }

  await page.goto(baseUrl);

  await page.waitForSelector('[data-testid="book-preview"]');
  const firstBook = page.locator('[data-testid="book-preview"]').first();
  await firstBook.locator('a').click();

  await page.waitForURL('/books/**');

  const mockUserId = `e2e-${Math.random().toString(36).substring(7)}`;
  await page.goto(`${page.url()}?mockUserId=${mockUserId}`);

  await page.click('button:has-text("Write a review")');

  await page.waitForSelector('form');

  const rating = 4;
  const reviewText = `This is a great book! Highly recommended, created with playwright by ${mockUserId}`;

  await page.click(`[data-testid="empty-star-${rating - 1}"]`);

  await page.fill('textarea[placeholder="Write your review here..."]', reviewText);

  await page.click('button:has-text("Submit")');

  await page.waitForLoadState('networkidle');

  const newReview = page.locator(`text=${reviewText}`);
  await expect(newReview).toBeVisible();

  const ratingStars = page.locator(`[data-testid="rating-stars"]`).last();
  const filledStars = await ratingStars.locator('[data-testid="filled-star"]').count();
  expect(filledStars).toBe(rating);

  const reviewCountText = await page.textContent('body');
  expect(reviewCountText).toMatch(/\d+ review/);
});