import { renderHook, act } from '@testing-library/react'
import { test, expect } from 'vitest'
import type React from 'react'
import useInternForm from './useInternForm'

test('initialises with empty form state', () => {
  const { result } = renderHook(() => useInternForm())

  expect(result.current.form.name).toBe('')
  expect(result.current.form.score).toBe(0)
  expect(result.current.form.role).toBe('Frontend')
  expect(result.current.error).toBe('')
})

test('isValid returns false and sets error when name is empty', () => {

  // Arrange
  const { result } = renderHook(() => useInternForm())

  let valid: boolean

  // Act
  act(() => {
    valid = result.current.isValid()
  })

  // Assert
  expect(valid!).toBe(false)
  expect(result.current.error).toBe('Name is required')
})

/*
Arrange:
Prepare everything needed for the test.

Act:
Perform exactly one action.

Assert:
Verify the result of that action.

Keeping these phases separate makes tests easier to read and maintain.
*/

test('isValid returns true when name and score are valid', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Rahul',
        type: 'text',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: 'score',
        value: '92',
        type: 'number',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  let valid: boolean

  act(() => {
    valid = result.current.isValid()
  })

  expect(valid!).toBe(true)
  expect(result.current.error).toBe('')
})

test('handleReset clears form values and error', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Rahul',
        type: 'text',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.isValid()
  })

  act(() => {
    result.current.handleReset()
  })

  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')
})

/*
Hook tests focus on the hook's logic in isolation without rendering
the UI. They verify state updates, validation, and behaviour directly,
making it easier to identify logic bugs. Component tests verify that
the UI interacts correctly with the hook, but they do not isolate the
hook's internal behaviour.
*/
test('isValid returns true when name is Sneha and score is 88', () => {

  // Arrange
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Sneha',
        type: 'text',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: 'score',
        value: '88',
        type: 'number',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  let valid: boolean

  // Act
  act(() => {
    valid = result.current.isValid()
  })

  // Assert
  expect(valid!).toBe(true)
})
test('handleChange updates the name field', () => {

  // Arrange
  const { result } = renderHook(() => useInternForm())

  // Act
  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Sneha',
        type: 'text',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  // Assert
  expect(result.current.form.name).toBe('Sneha')
})
/*
AAA Pattern

Arrange:
Prepare the hook, data and state.

Act:
Call exactly one function that changes behaviour.

Assert:
Check that the hook produced the expected result.

Using AAA makes tests easier to understand,
debug and maintain.
*/