import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Journeys via Page Object', () => {

  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });



  test('searches and filters the list', async () => {
    await dashboard.search('Rah');

    await expect(dashboard.internCount).toHaveCount(1);
    await expect(dashboard.internCard('Rahul')).toBeVisible();
  });

  test('clears search and restores all interns', async () => {
    await dashboard.search('Rahul');
    await dashboard.clearSearch();

    await expect(dashboard.internCount).toHaveCount(4);
  });

  test('removes an intern by name', async () => {
    await dashboard.removeButtonFor('Rahul').click();

    await expect(dashboard.internCard('Rahul')).not.toBeVisible();
    await expect(dashboard.internCount).toHaveCount(3);
  });

  test('toggles theme and button label updates', async () => {
    await dashboard.toggleTheme();

    await expect(dashboard.themeToggle).toContainText('Light');
  });

  /*
  OBSERVATION (Task 6.2):
  - dashboard.themeToggle is located in the constructor by matching any button with name containing /switch to/i
    (e.g., matching "Switch to Dark Mode" or "Switch to Light Mode" dynamically).
  - toContainText('Light') is sufficient to verify the toggle worked because the button text changes from
    "Switch to Dark Mode" to "Switch to Light Mode" once dark mode is active. This substring check verifies
    the UI successfully updated its wording to indicate the next state (Light) is available.
  */

  test('shows validation error on empty submit', async () => {
    await dashboard.addButton.click();

    await expect(dashboard.validationError()).toBeVisible();
  });

  test('chromium-only feature check', async ({ page, browserName }) => {
    // Skip this test on Firefox and WebKit
    test.skip(browserName !== 'chromium', 'This test targets Chromium-specific behaviour only');

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
  });

  /*
  OBSERVATION (Chromium-only skip):
  You would use test.skip(browserName !== 'chromium', ...) in real projects when testing features that rely
  on proprietary browser APIs or platform-specific CSS engine integrations (such as Chromium-only WebUSB/WebBluetooth
  APIs, Chrome extensions, or Chrome DevTools Protocol integrations) that do not exist or behave differently in
  WebKit or Firefox.
  */

});
