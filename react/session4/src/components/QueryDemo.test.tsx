import { describe, test, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import ThemedCard from './ThemedCard'

describe('QueryDemo', () => {
  // getBy — throws if element is not found
  test('getByText throws when element is missing', () => {
    render(<ThemedCard name="Rahul" score={92} />)

    // This passes — element exists
    expect(screen.getByText('Rahul')).toBeInTheDocument()

    // Uncommenting the line below would throw an error
    // screen.getByText('Priya')
  })

  // queryBy — returns null if element is not found
  test('queryBy returns null when element is missing', () => {
    render(<ThemedCard name="Rahul" score={92} />)

    // Use queryBy when asserting something is NOT present
    expect(screen.queryByText('Fail')).not.toBeInTheDocument()
  })

  // getAllBy — finds multiple elements
  test('getAllBy finds multiple elements', () => {
    render(
      <div>
        <ThemedCard name="Rahul" score={92} />
        <ThemedCard name="Priya" score={78} />
      </div>
    )

    const passBadges = screen.getAllByText('Pass')
    expect(passBadges).toHaveLength(2)
  })
})

/*
getByRole() is used when you expect exactly one element with a given role,
such as a single "Submit" button.

getAllByRole() is used when multiple elements share the same role,
such as several buttons, links, or list items, and returns an array.
*/