import {
  render,
  screen,
  waitFor,
} from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import AddInternForm from './AddInternForm'

describe('AddInternForm', () => {
  describe('initial state', () => {
    test('name input is empty', () => {
      render(<AddInternForm />)

      expect(
        screen.getByPlaceholderText('Name')
      ).toHaveValue('')
    })

    test('score input starts at 0', () => {
      render(<AddInternForm />)

      expect(
        screen.getByPlaceholderText('Score')
      ).toHaveValue(0)
    })

    test('role defaults to Frontend', () => {
      render(<AddInternForm />)

      expect(
        screen.getByRole('combobox', {
          name: 'Role',
        })
      ).toHaveValue('Frontend')
    })
  })

  describe('validation', () => {
    test('shows error when name is empty on submit', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      expect(
        screen.getByText('Name is required')
      ).toBeInTheDocument()
    })

    test('shows error when score is above 100', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.type(
        screen.getByPlaceholderText('Name'),
        'Rahul'
      )

      await user.clear(
        screen.getByPlaceholderText('Score')
      )

      await user.type(
        screen.getByPlaceholderText('Score'),
        '150'
      )

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      expect(
        screen.getByText(
          'Score must be between 0 and 100'
        )
      ).toBeInTheDocument()
    })

    test('clears error when valid name is entered', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      expect(
        screen.getByText('Name is required')
      ).toBeInTheDocument()

      await user.type(
        screen.getByPlaceholderText('Name'),
        'Rahul'
      )

      await waitFor(() => {
        expect(
          screen.queryByText('Name is required')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('successful submission', () => {
    test('form inputs clear after submission', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.type(
        screen.getByPlaceholderText('Name'),
        'Rahul'
      )

      await user.clear(
        screen.getByPlaceholderText('Score')
      )

      await user.type(
        screen.getByPlaceholderText('Score'),
        '92'
      )

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Name')
        ).toHaveValue('')
      })
    })
  })
})

/*
Use describe blocks to group related tests.
Keep nesting to two levels (Component -> Feature).
Deeper nesting makes test output harder to read and
makes it more difficult to locate and maintain tests.
*/