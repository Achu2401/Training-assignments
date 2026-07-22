import { test, expect } from 'vitest'

const interns: { id: number; name: string }[] = []

test('can add first intern', () => {
  interns.push({ id: 1, name: 'Rahul' })

  expect(interns).toHaveLength(1)
})

test('can add second intern', () => {
  interns.push({ id: 2, name: 'Priya' })

  expect(interns).toHaveLength(2)
})

/*
FIRST Principle Violated: Independent

The second test depends on the first test having already
added an intern to the array.

If this test is run alone, the array starts empty,
so its length becomes 1 instead of 2 and the test fails.

Each test should be independent and able to run
successfully in any order.
*/