/*
1. React.memo

React.memo is a higher-order component that memoizes a component.
It prevents unnecessary re-renders by comparing the current props
with the previous props. If the props have not changed, React
reuses the previous rendered output.

React.memo works well with useCallback because useCallback keeps
function props stable. Without useCallback, a new function is
created on every render, causing React.memo to re-render the child.
*/

/*
Example:

const InternRow = React.memo(function InternRow(props) {
   ...
})

*/

/*
2. When NOT to use useMemo and useCallback

Example 1:
If a calculation is very small, like adding two numbers or checking
a simple condition, using useMemo adds unnecessary complexity and
can actually be slower than recalculating.

Example 2:
If a callback is not passed to memoized child components, wrapping
it with useCallback provides no benefit and only makes the code
harder to read.
*/

/*
3. useReducer

useReducer is useful when state updates are complex or when multiple
pieces of state depend on each other.

It is preferable over multiple useState calls when:
- there are many related state values
- state transitions are complex
- update logic should be centralized
*/

import { useReducer } from 'react'

interface CounterState {
  count: number
}

type Action =
  | { type: 'increment'; step: number; max: number }
  | { type: 'decrement'; step: number; min: number }
  | { type: 'reset'; initial: number }

function reducer(state: CounterState, action: Action): CounterState {
  switch (action.type) {
    case 'increment':
      return {
        count: Math.min(state.count + action.step, action.max),
      }

    case 'decrement':
      return {
        count: Math.max(state.count - action.step, action.min),
      }

    case 'reset':
      return {
        count: action.initial,
      }

    default:
      return state
  }
}

function CounterExample() {
  const initial = 0
  const min = -Infinity
  const max = Infinity
  const step = 1

  const [state, dispatch] = useReducer(reducer, {
    count: initial,
  })

  return (
    <div>
      <p>{state.count}</p>

      <button
        onClick={() =>
          dispatch({
            type: 'increment',
            step,
            max,
          })
        }
      >
        +
      </button>

      <button
        onClick={() =>
          dispatch({
            type: 'decrement',
            step,
            min,
          })
        }
      >
        -
      </button>

      <button
        onClick={() =>
          dispatch({
            type: 'reset',
            initial,
          })
        }
      >
        Reset
      </button>
    </div>
  )
}

/*
4. Zustand vs Redux Toolkit vs Context API

Context with useState is suitable for small to medium applications
where only a few pieces of global state need to be shared.

Zustand is lightweight and easy to use for medium to large
applications with more complex shared state.

Redux Toolkit is best for very large applications where predictable
state management, middleware, debugging tools, and scalable
architecture are important.
*/

export default CounterExample