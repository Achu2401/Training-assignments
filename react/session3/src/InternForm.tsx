import { useState } from 'react'

function InternForm() {
  const [name, setName] = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value)
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // e.target.value is always a string, even for type="number",
    // so Number() converts it into a number before storing it in state.
    setScore(Number(e.target.value))
  }

  function handleReset(): void {
    setName('')
    setScore(0)
  }

  return (
    <div>
      {/* A controlled input gets its value from React state.
          The displayed value always matches the state, and every
          change updates the state through the onChange handler. */}
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />

      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />

      <p>
        Name: {name} | Score: {score}
      </p>

      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default InternForm