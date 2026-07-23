import { test, expect } from 'vitest'

test("score report has today's date", () => {
  const report = {
    date: new Date().toISOString().slice(0, 10),
  }

  expect(report.date).toBe('2024-11-15')
})

/*
FIRST Principle Violated: Repeatable

The test depends on today's date.

It passes only on the hardcoded date and
fails on every other day.

A repeatable test should always produce
the same result regardless of when it is run.
*/