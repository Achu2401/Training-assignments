import {screen } from '../test/test-utils'
import { test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'


test('adds an intern', async () => {
  const user = userEvent.setup()

  //

  await user.type(
    screen.getByPlaceholderText('Intern name'),
    'Rahul'
  )

  await user.click(
    screen.getByRole('button', { name: 'Add' })
  )

  expect(screen.getByText('Rahul')).toBeInTheDocument()
})

test('removes an intern', async () => {
  const user = userEvent.setup()

  //render(<InternList />)

  await user.type(
    screen.getByPlaceholderText('Intern name'),
    'Rahul'
  )

  await user.click(
    screen.getByRole('button', { name: 'Add' })
  )

  await user.click(
    screen.getByRole('button', { name: 'Remove' })
  )

  expect(
    screen.queryByText('Rahul')
  ).not.toBeInTheDocument()
})

/*
Mock as little as possible.
Mock external dependencies such as APIs or context,
but allow the component's own logic to run normally so the test
verifies real behaviour.
*/