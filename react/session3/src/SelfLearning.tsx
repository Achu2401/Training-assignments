
import { useState, useEffect } from 'react'

function LiveTimer() {
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup is important because it removes the interval
    // when the component unmounts or before the effect runs again.
    // Without cleanup, multiple intervals would keep running,
    // causing memory leaks and the timer to speed up.
    return () => clearInterval(interval)
  }, [])

  return <p>Live Timer: {seconds}s</p>
}

function SelfLearning() {
  /*
   
  1. React.StrictMode
   

  React.StrictMode is a development-only feature that helps detect
  potential problems. In development it intentionally renders the
  component twice and also runs useEffect cleanup before running the
  effect again.

  Observation:
  - Console logs may appear twice.
  - Effects may seem to execute twice.
  - API simulations may run twice in development.
  - This does NOT happen in the production build.
  */

  /*
   
  2. useLayoutEffect vs useEffect
   

  useEffect:
  - Runs after React updates the DOM and the browser paints the screen.
  - Best for fetching data, timers, subscriptions and API calls.

  useLayoutEffect:
  - Runs immediately after React updates the DOM but BEFORE the browser
    paints the screen.
  - Used when you need to measure or modify the DOM before the user
    sees it, such as reading element sizes or preventing layout flicker.
  */

  /*
   
  3. State update inside useEffect without a dependency array
   

  If useEffect has no dependency array, it runs after every render.
  If the effect updates state, React renders again.
  That render causes the effect to run again, which updates state again.
  This cycle repeats indefinitely, creating an infinite render loop.
  */

  /*
   
  4. useReducer vs useState
   

  useState is best for simple state like counters, booleans, text
  inputs and small objects. useReducer is better when state becomes
  complex, contains multiple related values or requires many different
  update actions. A reducer centralizes state update logic into one
  function, making large components easier to understand and maintain.
  */

  /*
   
  5. Cleanup function
   

  Returning a cleanup function from useEffect removes timers,
  event listeners or subscriptions before the effect runs again
  or when the component unmounts. This prevents memory leaks and
  duplicate event listeners or intervals.

  Observation:
  Removing clearInterval() causes multiple timers to continue running,
  making the timer increase faster and wasting memory.
  */

  return (
    <div>
      <h2>Self Learning Tasks</h2>

      <p>
        Open this file and read the comments for the research findings.
      </p>

      <LiveTimer />
    </div>
  )
}

export default SelfLearning