import { useRef } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus(): void {
    // Optional chaining (?.) is used because inputRef.current
    // is null before the input element is mounted. It safely
    // calls focus() only if current is not null.
    inputRef.current?.focus()
  }

  function handleClear(): void {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
      />

      <button onClick={handleFocus}>
        Focus Input
      </button>

      <button onClick={handleClear}>
        Clear and Focus
      </button>
    </div>
  )
}

export default FocusInput