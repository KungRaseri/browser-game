import { expect, test, } from '@playwright/test';

test.describe('Landing Page - suite', () => {
    test.beforeEach(({ page }) => {
        page.goto('/');
        page.waitForLoadState("networkidle");
    });

    test('title -> exists', ({ page }) => {
        expect(page).toHaveTitle('Portal | Uncharted Lands');
    })

    test('main feature content -> exists', ({ page }) => {
        expect(page.textContent('h1')).toContain('Settle in uncharted lands');
    });

    test('main feature actions -> Introduction', ({ page }) => {
        const expectedContent = "Area Under Construction";
        const expectedTitle = "Introduction - Coming Soon™ | Uncharted Lands";

        page.getByTestId('main-feature-introduction').waitFor();
        page.getByTestId('main-feature-introduction').click();
        page.waitForLoadState("networkidle");

        expect(page.textContent('.alert-message')).toContain(expectedContent);
        expect(page).toHaveTitle(expectedTitle);
    });

    test('main feature actions -> Register', ({ page }) => {
        const expected = "Register your account";

        page.getByTestId('main-feature-register').waitFor();
        page.getByTestId('main-feature-register').click();
        page.waitForLoadState('networkidle');

        expect(page.getByText(expected).textContent()).toContain(expected);
    });

    test('main feature actions -> Sign In', ({ page }) => {
        const expected = "Sign into your account";

        page.getByTestId('main-feature-signin').waitFor();
        page.getByTestId('main-feature-signin').click();
        page.waitForLoadState("networkidle");

        expect(page.getByText(expected).textContent()).toContain(expected);
    });
});
