import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { InternRow } from './InternListWithCallback'

describe('InternRow', () => {
  test('finds the Remove button by role', () => {
    render(
      <InternRow
        id={1}
        name="Rahul"
        score={92}
        onRemove={() => {}}
      />
    )

    const removeButton = screen.getByRole('button', {
      name: 'Remove',
    })

    expect(removeButton).toBeInTheDocument()
  })

  test('calls onRemove when Remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()

    render(
      <InternRow
        id={1}
        name="Rahul"
        score={92}
        onRemove={onRemove}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Remove' }))

    expect(onRemove).toHaveBeenCalledWith(1)
  })

  // screen.debug() prints the current rendered HTML of the component.
  // It helps inspect the DOM and identify the best query to use,
  // such as getByRole(), getByText(), or getByLabelText().
})


test('calls onRemove with the correct id when Remove is clicked', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()

  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={onRemove}
    />
  )

  await user.click(
    screen.getByRole('button', { name: 'Remove' })
  )

  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(onRemove).toHaveBeenCalledWith(1)
})

test('does not call onRemove when row is only rendered', () => {
  const onRemove = vi.fn()

  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={onRemove}
    />
  )

  expect(onRemove).not.toHaveBeenCalled()
})

/*
vi.fn() creates a mock function that records how it is called.
Unlike a real function, it doesn't perform actual logic unless you define one.
*/