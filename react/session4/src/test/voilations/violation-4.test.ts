import { test, expect } from 'vitest'

test('loads interns from API', async () => {
  const response = await fetch(
    'http://localhost:5173/api/interns'
  )

  const data = await response.json()

  expect(data).toHaveLength(4)
})

/*
FIRST Principles Violated:

1. Fast
The test depends on a real network request,
making it slower than unit tests.

2. Repeatable
It requires a running server.
If the server is unavailable or the API data changes,
the test fails even though the code may be correct.

In CI, this test usually fails because no local server
is running.
*/