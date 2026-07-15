import { useState } from 'react'

interface Intern {
  id: number
  name: string
  isPresent: boolean
}

function StateTypes() {
  // TypeScript infers the type from the initial value.
  const [name, setName] = useState('')
  const [score, setScore] = useState(0)
  const [isActive, setIsActive] = useState(false)

  // Explicit type annotation is needed because the initial value is ambiguous.
  const [selected, setSelected] = useState<Intern | null>(null)
  const [interns, setInterns] = useState<Intern[]>([])

  // Findings:
  // 1. setScore('92') gives an error because a string is not assignable to a number.
  // 2. setSelected({ id: 1, name: 'Rahul' }) gives an error because the required
  //    'isPresent' property is missing from the object.

  return (
    <div>
      <p>Name: {name || '(none)'}</p>
      <p>Score: {score}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <p>Selected: {selected ? selected.name : '(none)'}</p>
      <p>Intern count: {interns.length}</p>

      <button onClick={() => setName('Rahul')}>
        Set Name
      </button>

      <button onClick={() => setScore(92)}>
        Set Score
      </button>

      <button onClick={() => setIsActive(true)}>
        Activate
      </button>
      <button
  onClick={() =>
    setSelected({
      id: 1,
      name: 'Rahul',
      isPresent: true,
    })
  }
>
  Select Intern
</button>

<button
  onClick={() =>
    setInterns([
      { id: 1, name: 'Rahul', isPresent: true },
      { id: 2, name: 'Priya', isPresent: false },
    ])
  }
>
  Load Interns
</button>
    </div>
  )
}

export default StateTypes