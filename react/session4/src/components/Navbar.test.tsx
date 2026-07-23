import { render, screen } from '../test/test-utils'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import Navbar from './Navbar'
import { ThemeProvider } from '../contexts/theme-context'

test('renders the dashboard title', () => {
  render(<Navbar />)

  expect(
    screen.getByText('Intern Dashboard')
  ).toBeInTheDocument()
})

test('theme toggle button is visible', () => {
  render(<Navbar />)

  expect(
    screen.getByRole('button', {
      name: /switch to dark mode/i,
    })
  ).toBeInTheDocument()
})

test('theme toggle button label changes after click', async () => {
  const user = userEvent.setup()

  render(<Navbar />)

  await user.click(
    screen.getByRole('button', {
      name: /switch to dark mode/i,
    })
  )

  expect(
    screen.getByRole('button', {
      name: /switch to light mode/i,
    })
  ).toBeInTheDocument()
})

test('renders correctly when wrapped manually in ThemeProvider', () => {
  rtlRender(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )

  expect(
    screen.getByText('Intern Dashboard')
  ).toBeInTheDocument()
})

/*
If render is imported directly from @testing-library/react,
components that depend on ThemeContext will throw an error
because no ThemeProvider is wrapping them.

customRender automatically wraps components with providers,
reducing duplication and making tests easier to maintain.
*/