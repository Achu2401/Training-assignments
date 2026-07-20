import {
  afterEach,
  expect,
  test,
  vi,
} from 'vitest'

afterEach(() => {
  vi.useRealTimers()
})

test('score report has fixed date', () => {
  vi.useFakeTimers()

  vi.setSystemTime(new Date('2024-11-15'))

  const report = {
    date: new Date().toISOString().slice(0, 10),
  }

  expect(report.date).toBe('2024-11-15')
})

/*
If vi.useRealTimers() is not called,
later tests continue using fake timers,
which may cause unexpected failures.
*/