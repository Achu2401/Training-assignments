import { test, expect } from '@playwright/test';

test.describe('Locator Chaining and Filtering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('finds Rahul\'s Remove button using filter', async ({ page }) => {
    // Without filtering, getByRole('button', { name: 'Remove' }) matches ALL Remove buttons
    // Filter narrows it to the row that contains 'Rahul'
    const rahulRow = page.getByRole('row').filter({ hasText: 'Rahul' });
    const removeButton = rahulRow.getByRole('button', { name: 'Remove' });

    await expect(removeButton).toBeVisible();
  });

  test('finds Priya\'s score using filter and chaining', async ({ page }) => {
    const priyaRow = page.getByRole('row').filter({ hasText: 'Priya' });

    await expect(priyaRow).toBeVisible();
    // Now assert something inside Priya's row specifically
    await expect(priyaRow.getByText('78')).toBeVisible();
  });

  /*
  OBSERVATION (Task 1.1):
  Using .filter({ hasText: 'Priya' }) is much safer than .nth(1) because lists in dynamic web applications
  can re-order, sort, filter, or grow/shrink dynamically. If Priya moves from the second row to another position
  due to a score change, search filter, or database update, .nth(1) would target a completely different intern's
  row, causing test failures or false positives. Filter targeting ensures we locate the correct container by its
  content regardless of its list index.
  */

  test('counts only the rows that show Pass badge', async ({ page }) => {
    // Filter rows to only those that contain a Pass badge
    const passingRows = page.getByRole('row').filter({
      has: page.getByText('Pass'),
    });

    // Adjust the expected count to match your actual initial data
    await expect(passingRows).toHaveCount(3);
  });

  test('counts only the rows that show Fail badge', async ({ page }) => {
    const failingRows = page.getByRole('row').filter({
      has: page.getByText('Fail'),
    });

    await expect(failingRows).toHaveCount(1);
  });

  /*
  OBSERVATION (Task 1.2):
  - filter({ hasText: 'Pass' }) matches elements that contain the text 'Pass' anywhere in their subtree
    (e.g., matching a row where the name has 'Pass' or any text value contains it).
  - filter({ has: page.getByText('Pass') }) matches only elements that contain a distinct descendant
    node matching the locator page.getByText('Pass'). This is more precise, allowing us to query by exact node
    or structure matching.
  */

  test('first Remove button belongs to the first intern', async ({ page }) => {
    // .first() is zero-index shorthand for .nth(0)
    const firstRemove = page.getByRole('button', { name: 'Remove' }).first();
    await expect(firstRemove).toBeVisible();
  });

  test('last Remove button belongs to the last intern', async ({ page }) => {
    const lastRemove = page.getByRole('button', { name: 'Remove' }).last();
    await expect(lastRemove).toBeVisible();
  });

  test('second row is accessible by index', async ({ page }) => {
    const secondRow = page.getByRole('row').nth(1);
    await expect(secondRow).toBeVisible();
  });

  /*
  OBSERVATION (Task 1.3 - nth() / first() danger):
  If we click the first Remove button, it removes the first intern in the list. On the second run of the test,
  or if the list state is persistent or sorting is changed, the first intern would be different.
  Using .nth() is dangerous because index-based queries assume a static, deterministic DOM order. Any sorting,
  asynchronous loading, or dynamic additions will break these assumptions, leading to flaky tests.
  */

});

test.describe('Scoped Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('asserts score and badge inside Rahul\'s card only', async ({ page }) => {
    // Find Rahul's card by filtering on the container
    const rahulCard = page.getByRole('row').filter({ hasText: 'Rahul' });

    // All assertions are scoped to Rahul's card — not the whole page
    await expect(rahulCard.getByText('92')).toBeVisible();
    await expect(rahulCard.getByText('Pass')).toBeVisible();
    await expect(rahulCard.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('asserts different data in two different cards', async ({ page }) => {
    const rahulCard = page.getByRole('row').filter({ hasText: 'Rahul' });
    const amitCard  = page.getByRole('row').filter({ hasText: 'Amit' });

    await expect(rahulCard.getByText('Pass')).toBeVisible();
    await expect(amitCard.getByText('Fail')).toBeVisible();
  });

  /*
  OBSERVATION (Task 2.1):
  Scoped locators solve the problem of query collisions. In layouts with repeating structures (like lists, tables,
  or cards), simple locators like getByText('Pass') or getByRole('button', { name: 'Remove' }) match multiple
  elements. Scoping isolates the queries to a specific parent element, preventing the test from matching
  buttons or text in other cards and ensuring assertions target only the relevant entity's values.
  */



  /*
  OBSERVATION (Task 2.2):
  Scoping locators to a form container prevents false-positive test passes in scenarios like:
  1. A "Search" input and an "Add Intern Name" input both exist on the same page. If the test doesn't scope
     the label selection, typing into "Name" might accidentally target the search input, causing the test to pass
     while filling the wrong field.
  2. A "Submit" or "Reset" button exists in both a main navigation bar and inside the form itself. Scoping
     ensures we click the form's submit button, rather than the header's navigation action.
  */

});

test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('fill sets the input value directly', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');

    await expect(page.getByPlaceholder('Name', { exact: true })).toHaveValue('Vikram');
  });

  test('selectOption selects by visible label text', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Role' }).selectOption({ label: 'Backend' });

    await expect(page.getByRole('combobox', { name: 'Role' })).toHaveValue('Backend');
  });

  test('selectOption selects by value attribute', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Role' }).selectOption('Frontend');

    await expect(page.getByRole('combobox', { name: 'Role' })).toHaveValue('Frontend');
  });

  /*
  OBSERVATION (Task 3.1):
  - selectOption({ label: 'Backend' }) selects by the visible text shown in the dropdown option.
  - selectOption('Backend') selects by the value attribute of the option element.
  Selecting by label is generally more resilient to code changes because the UI labels are less likely to change
  arbitrarily compared to internal backend database value names, and it reflects exactly what the user sees.
  */

  test('checkbox is checked by default', async ({ page }) => {
    const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });
    await expect(presentCheckbox).toBeChecked();
  });

  test('uncheck removes the checked state', async ({ page }) => {
    const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });

    await presentCheckbox.uncheck();

    await expect(presentCheckbox).not.toBeChecked();
  });

  test('check re-applies the checked state', async ({ page }) => {
    const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });

    await presentCheckbox.uncheck();
    await presentCheckbox.check();

    await expect(presentCheckbox).toBeChecked();
  });

  /*
  OBSERVATION (Task 3.2):
  We use check()/uncheck() rather than click() for checkboxes because click() toggles the state unconditionally.
  If a checkbox is already checked, calling click() on it will uncheck it. Conversely, calling check() on an
  already checked checkbox does nothing, ensuring the element ends up in the expected target state regardless
  of its initial state.
  */

  test('Tab moves focus from name input to score input', async ({ page }) => {
    const nameInput  = page.getByPlaceholder('Name', { exact: true });
    const scoreInput = page.getByPlaceholder('Score');

    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(scoreInput).toBeFocused();
  });



  /*
  OBSERVATION (Task 3.3):
  - locator.press('Tab') focuses the targeted locator and then fires a Tab key event on that specific element.
  - page.keyboard.press('Tab') fires a global keyboard Tab press event on the currently focused element.
  page.keyboard is used for testing tab-ordering flow sequentially, while locator.press is useful for pressing keys
  inside a specific field directly.
  */

  test('clear() empties the input', async ({ page }) => {
    const scoreInput = page.getByPlaceholder('Score');

    await scoreInput.fill('92');
    await scoreInput.clear();

    await expect(scoreInput).toHaveValue('');
  });

  test('type() fires individual key events', async ({ page }) => {
    // type() is for inputs that react to each keystroke — e.g. search with live filtering
    await page.getByLabel('Search').type('Rah');

    // Filtered results should appear immediately as characters are typed
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
  });

  /*
  OBSERVATION (Task 3.4):
  You would choose type() over fill() when simulating realistic user keystrokes for features that trigger
  on every key press (such as auto-suggest, autocomplete search inputs, or live input masks). fill() sets the
  input value directly in a single event, which might bypass intermediate keydown/keyup events and fail to
  trigger reactive search handlers.
  */

});
