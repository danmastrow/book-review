import { test, expect } from '@playwright/test';


test('Home page loads and displays books correctly', async ({ page }) => {
  const baseUrl = process.env.BASE_URL
  if (!baseUrl) {
    throw new Error('BASE_URL environment variable is not set');
  }

  await page.goto(baseUrl);
  await expect(page).toHaveTitle(/Book Review/);
  await expect(page.locator('h1').filter({ hasText: 'Latest books' })).toBeVisible();
  await expect(page.locator('h2').filter({ hasText: 'Discover the latest books' })).toBeVisible();

  await page.waitForSelector('[data-testid="book-preview"]');

  const bookPreviews = page.locator('[data-testid="book-preview"]');
  const bookCount = await bookPreviews.count();

  console.log(`Found ${bookCount} book previews`);

  expect(bookCount).toBeGreaterThan(0);
  expect(bookCount).toBeLessThanOrEqual(10);

  const firstBook = bookPreviews.first();

  await expect(firstBook.locator('h3')).toBeVisible(); // Book title
  await expect(firstBook.getByText(/By/)).toBeVisible(); // Author

  // Check if each book has a rating
  for (let i = 0; i < await bookPreviews.count(); i++) {
    await expect(bookPreviews.nth(i).getByTestId('rating-stars')).toBeVisible();
  }
});
