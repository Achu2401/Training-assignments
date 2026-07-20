import {
  expect,
  test,
  vi,
} from 'vitest'

test('loads interns from mocked API', async () => {
  const interns = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Amit' },
    { id: 4, name: 'Sneha' },
  ]

  globalThis.fetch = vi.fn().mockResolvedValue({
    json: async () => interns,
  } as Response)

  const response = await fetch('/api/interns')

  const data = await response.json()

  expect(data).toHaveLength(4)
})