import { test, expect } from '@playwright/test';

test.describe('SEO & Metadata', () => {
  test('should have correct meta tags and JSON-LD schema', async ({ page }) => {
    await page.goto('/');

    // Check basic metadata
    await expect(page).toHaveTitle('ISAPOV | Cinematic Photography & Videography');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', 'Профессиональное портфолио фотографа и видеографа. Съемка мероприятий, коммерция, создание шоурилов.');

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', 'https://isapov.com/og-image.jpg');

    // Check JSON-LD
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toHaveCount(1);

    const jsonLdContent = await jsonLdScript.textContent();
    expect(jsonLdContent).toBeTruthy();

    if (jsonLdContent) {
      const data = JSON.parse(jsonLdContent);
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('ProfessionalService');
      expect(data['name']).toBe('ISAPOV Photography & Videography');
      expect(data['sameAs'].length).toBeGreaterThan(0);
    }
  });
});
