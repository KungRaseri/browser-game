import { expect, test } from '@playwright/test';

test.describe('Introduction - suite', () => {
	test.beforeEach(({ page }) => {
		page.goto('/introduction');
		page.waitForLoadState("networkidle");
	});

	test('title -> exists', ({ page }) => {
		const expectedTitle = "Introduction - Coming Soon™ | Uncharted Lands";

		expect(page).toHaveTitle(expectedTitle);
	})
});
