import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

// We cannot update state by writing count = count + 1 because React
// does not detect direct variable changes. We must use setCount()
// so React knows the state changed and re-renders the component.

  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  )
}

export default Counter