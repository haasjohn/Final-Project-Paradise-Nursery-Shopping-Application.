import { test, expect } from '@playwright/test';
test('complete shopping journey with cart totals and re-adding a deleted item', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Paradise Nursery', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Get Started' }).click();
  await expect(page.locator('.plant-card')).toHaveCount(18);
  await expect(page.locator('.category')).toHaveCount(3);
  await page.getByRole('button', { name: 'Add to Cart: Snake Plant', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Added Snake Plant', exact: true })).toBeDisabled();
  await expect(page.getByRole('link', { name: 'Cart, 1 items', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Add to Cart: ZZ Plant', exact: true }).click();
  await page.getByRole('link', { name: 'Cart, 2 items', exact: true }).click();
  await expect(page.locator('.order-total')).toContainText('$52.00');
  await page.getByRole('button', { name: 'Increase quantity of Snake Plant' }).click();
  await expect(page.locator('.order-total')).toContainText('$76.00');
  await expect(page.getByRole('link', { name: 'Cart, 3 items', exact: true })).toBeVisible();
  await expect(page.locator('.cart-item').filter({ hasText: 'Snake Plant' }).locator('.line-total')).toContainText('$48.00');
  await page.getByRole('button', { name: 'Decrease quantity of Snake Plant' }).click();
  await expect(page.locator('.order-total')).toContainText('$52.00');
  await expect(page.getByRole('button', { name: 'Decrease quantity of Snake Plant' })).toBeDisabled();
  await page.getByRole('button', { name: 'Delete ZZ Plant' }).click();
  await expect(page.locator('.order-total')).toContainText('$24.00');
  await page.getByRole('button', { name: 'Checkout', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Coming Soon');
  await page.getByRole('link', { name: 'Continue Shopping' }).click();
  await expect(page.getByRole('button', { name: 'Add to Cart: ZZ Plant', exact: true })).toBeEnabled();
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Get Started' })).toBeVisible();
});
test('empty cart, mobile layout, and local images', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#cart');
  await expect(page.getByText('Your cart is empty.', { exact: false })).toBeVisible();
  await page.getByRole('link', { name: 'Continue Shopping' }).click();
  await expect(page.locator('.plant-card')).toHaveCount(18);
  const images = page.locator('.plant-card img');
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
