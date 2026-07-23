import { test, expect } from '@playwright/test';

//
// Intern Dashboard
//
test.describe('Intern Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading interns...')).toBeHidden();
  });

  test('shows the dashboard title', async ({ page }) => {
    await expect(
      page.getByText('Intern Dashboard').first()
    ).toBeVisible();
  });

  test('shows the initial intern names', async ({ page }) => {
    await expect(
      page.getByText('Rahul', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByText('Priya', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByText('Amit', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByText('Sneha', { exact: true }).first()
    ).toBeVisible();
  });

  test('shows the correct number of intern cards', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
  });


});

//
// Locator Practice
//
test.describe('Locator Practice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading interns...')).toBeHidden();
  });

  // getByRole is preferred because it uses semantic HTML and accessibility roles,
  // making tests more reliable and closer to how users interact with the application.



  test('finds the dashboard title', async ({ page }) => {
    await expect(
      page.getByText('Intern Dashboard').first()
    ).toBeVisible();
  });

  test('finds the search section', async ({ page }) => {
  await expect(
    page.getByText('Search Interns')
  ).toBeVisible();
});


  test('finds the score input by placeholder', async ({ page }) => {
    const scoreInput = page.getByPlaceholder('Score');

    await expect(scoreInput).toBeVisible();
    await expect(scoreInput).toHaveValue('0');
  });

  // .first() is used because "Rahul" appears in multiple places on the page.

  test('finds text with exact matching', async ({ page }) => {
    await expect(
      page.getByText('Rahul', { exact: true }).first()
    ).toBeVisible();
  });

  test('finds Rahul score', async ({ page }) => {
    await expect(
      page.getByText('Rahul — 92')
    ).toBeVisible();
  });


});

//
// Assertions
//
test.describe('Assertions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading interns...')).toBeHidden();
  });

  // toHaveText() checks for an exact text match.
  // toContainText() checks whether the expected text is contained within the element.


  test('score input starts with 0', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Score')
    ).toHaveValue('0');
  });

  test('Add Intern button is visible', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Add Intern' })
    ).toBeVisible();
  });

  test('Remove buttons match intern count', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);
  });
});
test.describe('Add Intern Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading interns...')).toBeHidden();
  });

  test('adds a new intern successfully', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Akshaya');

    await page.getByPlaceholder('Score').fill('95');

    await page.selectOption('select', 'Backend');

    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(
      page.getByText('Akshaya', { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(5);
  });
});
test.describe('Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading interns...')).toBeHidden();
  });



  test('shows error for invalid score', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Name', exact: true }).fill('John');

    await page.getByPlaceholder('Score').fill('120');

    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(
      page.getByText('Score must be between 0 and 100')
    ).toBeVisible();
  });
});
test.describe('Remove Intern', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading interns...')).toBeHidden();
  });

  test('removes Rahul from the list', async ({ page }) => {
    await page
      .getByText('Rahul — 92')
      .locator('..')
      .getByRole('button', { name: 'Remove' })
      .click();

    await expect(
      page.getByText('Rahul — 92')
    ).not.toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(3);
  });
});
test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Loading interns...')).toBeHidden();
  });

  test('toggles the theme button text', async ({ page }) => {
    const button = page.getByRole('button', {
      name: /switch to dark mode/i,
    });

    await button.click();

    await expect(
      page.getByRole('button', {
        name: /switch to light mode/i,
      })
    ).toBeVisible();
  });
});

// Observation:
// Playwright UI mode shows every test step, the matched locators, and the page
// state at each action. This makes it much easier to understand where a test
// fails compared to reading terminal output alone.

// Headless mode runs tests without opening a browser window, making it faster
// and ideal for CI pipelines. Headed mode opens a real browser window, making
// it useful for debugging and visually observing interactions.

// The HTML report provides screenshots, error messages, execution timeline,
// and detailed information about failed assertions. This makes debugging much
// easier than relying only on terminal output.

// Trace Viewer panes:
//
// Timeline - Shows every step of the test execution.
//
// Screenshots - Displays the page appearance at each action.
//
// Network - Displays HTTP requests and responses.
//
// DOM Snapshot - Shows the DOM structure at any step for locator debugging.