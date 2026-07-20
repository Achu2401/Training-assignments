import { render, screen } from '../test/test-utils'
import { describe, test, expect } from 'vitest'
import SummaryBar from './SummaryBar'

const interns = [
  {
    id: 1,
    name: 'Rahul',
    score: 92,
    role: 'Frontend',
    isPresent: true,
  },
  {
    id: 2,
    name: 'Priya',
    score: 78,
    role: 'Backend',
    isPresent: true,
  },
  {
    id: 3,
    name: 'Amit',
    score: 45,
    role: 'Fullstack',
    isPresent: false,
  },
]

describe('SummaryBar', () => {
  test('shows total intern count', () => {
    render(<SummaryBar interns={interns} />)

    expect(
      screen.getByText('Total Interns: 3')
    ).toBeInTheDocument()
  })

  test('shows present intern count', () => {
    render(<SummaryBar interns={interns} />)

    expect(
      screen.getByText('Present: 2')
    ).toBeInTheDocument()
  })

  test('shows average score', () => {
    render(<SummaryBar interns={interns} />)

    expect(
      screen.getByText('Average Score: 71.7')
    ).toBeInTheDocument()
  })
})