import { test, expect } from '@playwright/test';

test.describe('Assertions — State', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Add Intern button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add Intern' })).toBeEnabled();
  });

  test('name input is editable', async ({ page }) => {
    await expect(page.getByPlaceholder('Name', { exact: true })).toBeEditable();
  });

  test('Present checkbox is checked by default', async ({ page }) => {
    await expect(page.getByRole('checkbox', { name: 'Present' })).toBeChecked();
  });



  /*
  OBSERVATION (Task 4.1):
  toBeEnabled() is more useful than toBeVisible() because a button can be fully visible on the screen but
  disabled (e.g. grayed out because form validation failed). If we only check toBeVisible(), the test would
  pass even if a user is unable to click the button. toBeEnabled() validates both visibility and interactive readiness.
  */

});

test.describe('Assertions — Attributes and Classes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Present checkbox has type attribute of checkbox', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Present' })
    ).toHaveAttribute('type', 'checkbox');
  });

  test('dark class is applied to body after theme toggle', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // Assert a CSS class was added to the root element
    await expect(page.locator('body')).toHaveClass(/dark/);
  });

  test('dark class is removed after toggling back to light', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(page.locator('body')).not.toHaveClass(/dark/);
  });

  /*
  OBSERVATION (Task 4.2):
  toHaveClass(/dark/) uses a regular expression rather than an exact string match because the body element
  might contain other classes (such as layout, page classes, or third-party styles) that could change. Using a
  regular expression checks if the class list contains 'dark' without failing if there are other classes present.
  */

});

test.describe('Assertions — Page Level', () => {

  test('page has the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Intern Dashboard/);
  });

  test('page URL is the root path', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('http://127.0.0.1:5173/');
  });



  /*
  OBSERVATION (Task 4.3):
  When running toHaveScreenshot() for the first time, Playwright throws an error because there is no baseline
  image to compare against, and saves the captured screenshot as the new baseline.
  On the second run, the test passes because the new screenshot matches the baseline perfectly.
  If we change any visible text on the page and run it again, the test fails with a pixel difference error,
  providing a visual diff showing the changed areas highlighted in red.
  */

});
