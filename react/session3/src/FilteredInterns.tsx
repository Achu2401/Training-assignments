import { useState, useEffect } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
}

const allInterns: Intern[] = [
  { id: 1, name: 'Rahul', score: 92, role: 'Frontend' },
  { id: 2, name: 'Priya', score: 78, role: 'Backend' },
  { id: 3, name: 'Amit', score: 45, role: 'Frontend' },
  { id: 4, name: 'Sneha', score: 95, role: 'Fullstack' },
]

function FilteredInterns() {
  const [role, setRole] = useState<string>('all')
  const [filtered, setFiltered] = useState<Intern[]>(allInterns)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    // Simulate fetching filtered data
    setTimeout(() => {
      const result =
        role === 'all'
          ? allInterns
          : allInterns.filter(i => i.role === role)

      setFiltered(result)
      setIsLoading(false)
    }, 500)

    // Findings:
    // 1. No dependency array:
    //    The effect runs after every render. Since it updates state,
    //    it causes repeated renders and can lead to an infinite loop.
    //
    // 2. Empty dependency array ([]):
    //    The effect runs only once when the component mounts.
    //    Changing the dropdown will not update the filtered list.
    //
    // 3. [role]:
    //    The effect runs on the initial render and whenever
    //    the role value changes. This is the correct behavior.
  }, [role])

  return (
    <div>
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      {isLoading ? (
        <p>Updating...</p>
      ) : (
        <ul>
          {filtered.map(i => (
            <li key={i.id}>
              {i.name} — {i.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FilteredInterns