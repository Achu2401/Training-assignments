/*
Page Object Model (POM) Benefits:
The main benefit of the Page Object Model is encapsulation and maintainability.
It decouples E2E test scripts from the application's DOM structure.
For example, if the "Name" placeholder is renamed to "Full Name" in the React component,
we only need to update the selector in one place (inside the DashboardPage constructor: `this.nameInput = page.getByPlaceholder('Full Name')`).
None of the spec files utilizing this page object need to be modified.
*/

import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page:        Page;
  readonly nameInput:   Locator;
  readonly scoreInput:  Locator;
  readonly roleSelect:  Locator;
  readonly addButton:   Locator;
  readonly resetButton: Locator;
  readonly searchInput: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page        = page;
    this.nameInput   = page.getByPlaceholder('Name', { exact: true });
    this.scoreInput  = page.getByPlaceholder('Score');
    this.roleSelect  = page.locator('select[name="role"]');
    this.addButton   = page.getByRole('button', { name: 'Add Intern' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.searchInput = page.getByPlaceholder('Search by name or role');
    this.themeToggle = page.getByRole('button', { name: /switch to/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async addIntern(name: string, score: string, role = 'Frontend') {
    await this.nameInput.fill(name);
    await this.scoreInput.clear();
    await this.scoreInput.fill(score);
    await this.roleSelect.selectOption(role);
    await this.addButton.click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  // Navigate from intern name heading up to the parent card div
  internCard(name: string): Locator {
    return this.page.getByRole('heading', { name }).locator('..');
  }

  removeButtonFor(name: string): Locator {
    return this.internCard(name).getByRole('button', { name: 'Remove' });
  }

  get internCount(): Locator {
    return this.page.getByRole('button', { name: 'Remove' });
  }

  /*
  Research - `locatorA.or(locatorB)`:
  It returns a locator that matches elements matching EITHER locatorA OR locatorB.
  This is useful in a real project when:
  1. An element's class name, structure, or role changes depending on dynamic page states (e.g. mobile vs desktop layout).
  2. Handling testing scenarios where an alert can be rendered in two different ways (e.g., standard popup or inline validation tag).
  3. Supporting progressive migrations or A/B testing variations where both variations could be visible on page.
  */
  validationError(): Locator {
    return this.page.getByRole('alert').or(this.page.locator('[class*="error"]'));
  }
}
