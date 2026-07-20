import { useState, useRef } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0)
  const refCount = useRef<number>(0)

  function incrementState(): void {
    setStateCount(prev => prev + 1)
  }

  function incrementRef(): void {
    refCount.current += 1
    console.log('Ref value:', refCount.current)
  }

  return (
    <div>
      {/* useState stores values that affect the UI. Updating state
          causes React to re-render the component. useRef stores
          mutable values that persist across renders but updating
          them does not trigger a re-render. Use useState for data
          displayed in the UI and useRef for values like DOM
          references, timers, or counters that don't need to
          update the UI immediately. */}

      <p>State count (shown in UI): {stateCount}</p>
      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>
        Increment State
      </button>

      <button onClick={incrementRef}>
        Increment Ref
      </button>
    </div>
  )
}

export default RefVsState