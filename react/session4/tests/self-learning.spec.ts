import { test as base, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

/*
Research 1: fill vs type
page.fill()
- Clears the existing value before entering new text.
- Faster for filling forms.

page.type()
- Types character by character.
- Triggers keyboard events naturally.
- Useful when testing autocomplete or live validation.
*/

base('fill vs type', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Loading interns...').waitFor({ state: 'hidden' });

  await page.getByPlaceholder('Name', { exact: true }).fill('Rahul');

  await page.getByPlaceholder('Name', { exact: true }).clear();

  await page.getByPlaceholder('Name', { exact: true }).type('Rahul');
});

/*
Research 2: keyboard.press()
Tab moves keyboard focus to the next focusable element.
*/



/*
Research 3: page.screenshot()
Creates a screenshot of the page.
*/

base('take screenshot', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Loading interns...').waitFor({ state: 'hidden' });

  await page.screenshot({
    path: 'tests/screenshots/dashboard.png',
    fullPage: true,
  });
});

base('dummy test', async () => {
  expect(true).toBe(true);
});

//
// ==================== NEW SELF-LEARNING TASKS ====================
//

/*
Self-Learning Task 1: Soft Assertions
Research: Soft assertions (expect.soft) record a failure but allow the test to keep running.
This is highly useful for smoke testing multiple independent elements on a dashboard in a single run
so we can see all UI issues at once rather than having the test stop on the first failure.
*/
base('smoke test using soft assertions', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Loading interns...').waitFor({ state: 'hidden' });

  await expect.soft(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Add Intern' })).toBeEnabled();
  await expect.soft(page.getByPlaceholder('Search by name or role')).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});

/*
Self-Learning Task 2: Network Mocking with page.route()
Research: page.route() intercepts network requests (e.g. REST API fetches) and returns mocked payloads.
This isolates E2E tests from backend dependency, allowing us to mock specific database responses
and test error states or loading screens reliably.
*/
base('intercept API and return mocked intern data', async ({ page }) => {
  // Setup API route interception
  await page.route('**/api/interns', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 101,
          name: 'Mocked John',
          score: 85,
          role: 'Fullstack',
          isPresent: true,
        },
      ]),
    });
  });

  await page.goto('/');
  await page.getByText('Loading interns...').waitFor({ state: 'hidden' });

  // Verify the page renders only the mocked intern data
  await expect(page.getByRole('heading', { name: 'Mocked John' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1);
});

/*
Self-Learning Task 3: Custom Fixtures (test.extend)
Research: Fixtures differ from beforeEach because they are modular, reusable, lazy-loaded (run only if requested),
and encapsulate setup and teardown within the same block. beforeEach runs globally for every test,
regardless of whether the test needs that specific setup.
*/
type MyFixtures = {
  dashboard: DashboardPage;
};

const test = base.extend<MyFixtures>({
  dashboard: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await page.getByText('Loading interns...').waitFor({ state: 'hidden' });
    await use(dashboardPage);
  },
});

test('uses custom dashboard fixture', async ({ dashboard }) => {
  await expect(dashboard.nameInput).toBeVisible();
  await expect(dashboard.internCount).toHaveCount(4);
});

/*
Self-Learning Task 4: Visual Regression with toHaveScreenshot()
Research: toHaveScreenshot() checks for visual pixel deviation from baseline images.
Playwright names these baseline images using the browser engine and OS prefix and stores them in
a spec-specific subfolder (e.g. `self-learning.spec.ts-snapshots/`).
*/
test('visual regression testing with toHaveScreenshot', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await page.getByText('Loading interns...').waitFor({ state: 'hidden' });

  const listContainer = page.getByRole('heading', { name: 'Intern List' }).locator('..');

  // Take screenshot of the intern list and save/assert against baseline
  await expect(listContainer).toHaveScreenshot('intern-list-baseline.png');

  // Add a new intern to modify the list
  await dashboard.addIntern('New Intern', '75', 'Backend');

  // Assert the screenshot has changed from the baseline
  await expect(listContainer).not.toHaveScreenshot('intern-list-baseline.png');
});


/*
Self-Learning Task 5: CSS Variables with page.evaluate()
Research: page.evaluate() runs JavaScript in the browser context. We can use it to fetch computed CSS variables
from document.documentElement, confirming style changes (such as theme color overrides) occur correctly.
*/
test('uses page.evaluate to read css root variable', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await page.getByText('Loading interns...').waitFor({ state: 'hidden' });

  // Get light mode background color CSS variable
  const lightBgColor = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
  });
  expect(lightBgColor).toBe('#ffffff');

  // Toggle theme
  await dashboard.toggleTheme();

  // Get dark mode background color CSS variable
  const darkBgColor = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
  });
  expect(darkBgColor).toBe('#16171d');
});