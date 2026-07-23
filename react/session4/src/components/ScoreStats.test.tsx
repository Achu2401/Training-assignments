import { render, screen, waitFor } from '../test/test-utils'
import { test, expect } from 'vitest'
import ScoreStats from './ScoreStats'

test('shows loading state initially', () => {
  render(<ScoreStats />)

  expect(screen.getByText('Loading interns...')).toBeInTheDocument()
})

test('shows intern data after loading completes', async () => {
  render(<ScoreStats />)

  // Waits until Rahul appears
  const rahul = await screen.findByText('Rahul')
  expect(rahul).toBeInTheDocument()

  // Loading indicator should be gone
  expect(
    screen.queryByText('Loading interns...')
  ).not.toBeInTheDocument()
})

test('multiple elements appear after data loads', async () => {
  render(<ScoreStats />)

  await waitFor(() => {
    expect(screen.getByText('Rahul')).toBeInTheDocument()
    expect(screen.getByText('Priya')).toBeInTheDocument()
  })
})

// findBy vs waitFor:
//
// findBy is used when waiting for a single element to appear.
// It automatically retries until the element is found or times out.
//
// waitFor is used when waiting for more complex conditions,
// such as multiple assertions, elements disappearing,
// or state updates that cannot be checked with a single findBy.