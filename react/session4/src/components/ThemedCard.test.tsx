import { describe, test, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../test/test-utils'
import ThemedCard from './ThemedCard'

describe('ThemedCard', () => {
  it('renders the name', () => {
    render(<ThemedCard name="Akshaya" score={75} />)

    expect(screen.getByText('Akshaya')).toBeInTheDocument()
  })

  it('renders the score', () => {
    render(<ThemedCard name="Akshaya" score={75} />)

    expect(screen.getByText('Score: 75')).toBeInTheDocument()
  })

  it('shows Pass for score 50 or above', () => {
    render(<ThemedCard name="Akshaya" score={75} />)

    expect(screen.getByText('Pass')).toBeInTheDocument()
  })

  it('shows Fail for score below 50', () => {
    render(<ThemedCard name="Akshaya" score={40} />)

    expect(screen.getByText('Fail')).toBeInTheDocument()
  })

  it('renders the component without crashing', () => {
    const { container } = render(
      <ThemedCard name="Akshaya" score={60} />
    )

    expect(container).toBeTruthy()
  })
})

test('does not show Fail when score is passing', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.queryByText('Fail')).not.toBeInTheDocument()
})

test('does not show Pass when score is failing', () => {
  render(<ThemedCard name="Amit" score={45} />)

  expect(screen.queryByText('Pass')).not.toBeInTheDocument()
})

test('renders score of 0 correctly', () => {
  render(<ThemedCard name="Neha" score={0} />)

  expect(screen.getByText('Score: 0')).toBeInTheDocument()
  expect(screen.getByText('Fail')).toBeInTheDocument()
})

test('renders score of 100 correctly', () => {
  render(<ThemedCard name="Neha" score={100} />)

  expect(screen.getByText('Score: 100')).toBeInTheDocument()
  expect(screen.getByText('Pass')).toBeInTheDocument()
})

test('renders a different name and score without mixing up values', () => {
  render(<ThemedCard name="Priya" score={75} />)

  expect(screen.getByText('Priya')).toBeInTheDocument()
  expect(screen.getByText('Score: 75')).toBeInTheDocument()
})

// Testing boundary values like 0 and 100 helps catch edge-case bugs.
// A score of 0 verifies that the component correctly handles the lowest possible value,
// while a score of 100 verifies that it correctly handles the highest possible value.
// Testing only a typical value (such as 75 or 92) may miss bugs in conditional logic
// or boundary handling.