import { describe, test, expect, vi } from 'vitest'

describe('Self Learning Tasks', () => {
  test('vi.useFakeTimers example', () => {
    vi.useFakeTimers()

    const callback = vi.fn()

    setTimeout(callback, 1000)

    expect(callback).not.toHaveBeenCalled()

    vi.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  /*
  vi.useFakeTimers() replaces the real timer system with a fake one.
  Instead of waiting for actual time to pass, tests can instantly
  execute pending timers using vi.runAllTimers() or
  vi.advanceTimersByTime().
  */

  test('tab navigation research', () => {
    expect(true).toBe(true)
  })

  /*
  user.tab() simulates pressing the Tab key.
  It allows tests to verify keyboard navigation and focus order.
  Use expect(element).toHaveFocus() to assert which element
  currently has keyboard focus.
  */

  test('within helper research', () => {
    expect(true).toBe(true)
  })

  /*
  within() scopes queries to a specific element.
  It is useful when the same text appears multiple times,
  allowing the test to search only inside one container.
  */

  test('coverage research', () => {
    expect(true).toBe(true)
  })

  /*
  Run npm run test:coverage to generate a coverage report.

  Line Coverage:
  Measures how many executable lines were run by the tests.

  Branch Coverage:
  Measures whether every decision path
  (if/else, switch, ternary, etc.) was executed.

  Branch coverage is stricter because it verifies every possible path,
  not just every line.
  */
})