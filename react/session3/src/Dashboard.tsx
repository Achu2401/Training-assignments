import { useState, useEffect, useRef } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false)

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Load data after the component mounts
  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setInterns([
        {
          id: 1,
          name: 'Rahul',
          score: 92,
          role: 'Frontend',
          isPresent: true,
        },
        {
          id: 2,
          name: 'Priya',
          score: 78,
          role: 'Backend',
          isPresent: true,
        },
        {
          id: 3,
          name: 'Amit',
          score: 45,
          role: 'Frontend',
          isPresent: false,
        },
        {
          id: 4,
          name: 'Sneha',
          score: 95,
          role: 'Fullstack',
          isPresent: true,
        },
      ])

      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Focus the search input whenever the search panel opens
  useEffect(() => {
    if (isPanelOpen) {
      searchInputRef.current?.focus()
    }
  }, [isPanelOpen])

  // Derive the filtered list from state
  const filteredInterns = interns.filter(intern =>
    intern.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <p>Loading interns...</p>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Intern Dashboard</h2>

      <button onClick={() => setIsPanelOpen(prev => !prev)}>
        {isPanelOpen ? 'Hide Search' : 'Show Search'}
      </button>

      {isPanelOpen && (
        <div style={{ marginTop: '12px', marginBottom: '16px' }}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search intern..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      <p>
        Showing <strong>{filteredInterns.length}</strong> of{' '}
        <strong>{interns.length}</strong> interns
      </p>

      {filteredInterns.map(intern => (
        <div
          key={intern.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px',
          }}
        >
          <h3>{intern.name}</h3>

          <p>
            <strong>Role:</strong> {intern.role}
          </p>

          <p>
            <strong>Score:</strong> {intern.score}
          </p>

          <p>
            <strong>Attendance:</strong>{' '}
            {intern.isPresent ? 'Present' : 'Absent'}
          </p>

          <span
            style={{
              padding: '4px 8px',
              borderRadius: '5px',
              color: 'white',
              backgroundColor:
                intern.score >= 50 ? 'green' : 'red',
            }}
          >
            {intern.score >= 50 ? 'Pass' : 'Fail'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Dashboard