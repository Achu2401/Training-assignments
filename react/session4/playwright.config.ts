import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests in parallel for faster execution.
  fullyParallel: true,

  // Retry failed tests twice only in CI.
  retries: process.env.CI ? 2 : 0,

  // Use only one worker in CI.
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  timeout: 30000,

  /*
  Difference between timeout and expect.timeout:
  - timeout (test-level timeout, e.g., 30,000ms): The maximum time allowed for the entire test to run, 
    including beforeEach/afterEach hooks, navigation, page actions, and all assertions combined.
  - expect.timeout (assertion-level timeout, e.g., 5,000ms): The maximum time a single auto-retrying 
    assertion (like expect(locator).toBeVisible()) will wait for the expected condition to be met. 
    If a page load takes 10s, the overall test has time (30s) but a single assertion might time out if set too low.
  */
  expect: { timeout: 5000 },

  use: {
    // Base URL used by page.goto('/')
    baseURL: 'http://127.0.0.1:5173',

    // Capture a trace only when a test fails and retries.
    trace: 'on-first-retry',

    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      /*
      What ...devices['Pixel 5'] provides:
      It sets device emulation properties including:
      1. viewport (e.g., width: 393, height: 851)
      2. userAgent (identifies the browser/device to the server)
      3. deviceScaleFactor (e.g., 2.75, which affects pixel density)
      4. isMobile (emulates mobile interactions, layout, and touch events)
      5. hasTouch (enables touch event support)
      */
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Starts the Vite dev server automatically before tests run.
  webServer: {
    command: 'npx vite --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
});