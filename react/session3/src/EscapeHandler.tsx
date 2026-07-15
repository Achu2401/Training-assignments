import { useState, useEffect } from 'react'

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent): void {
      console.log('keydown fired')

      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup removes the event listener when the panel closes
    // or before the effect runs again. Without cleanup, every
    // time the panel is opened a new listener is added. After
    // opening and closing the panel several times, pressing
    // Escape causes the log to appear multiple times because
    // all previous listeners are still active.
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Panel
      </button>

      {isOpen && (
        <div
          style={{
            border: '1px solid #ccc',
            padding: '16px',
            marginTop: '8px',
          }}
        >
          <p>Panel is open. Press Escape to close.</p>

          <button onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default EscapeHandler