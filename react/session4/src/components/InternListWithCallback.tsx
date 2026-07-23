import { useCallback } from 'react'
import { useInterns } from '../contexts/intern-context'
import { useTheme } from '../contexts/theme-context'

interface InternRowProps {
  id: number
  name: string
  score: number
  role?: string
  isPresent?: boolean
  onRemove: (id: number) => void
}

export function InternRow({
  id,
  name,
  score,
  role = 'Frontend',
  isPresent = true,
  onRemove,
}: InternRowProps) {
  const { theme } = useTheme()

  console.log(`InternRow rendered: ${name}`)
  const badgeText = score >= 50 ? 'Pass' : 'Fail'

  return (
    <div
      role="row"
      style={{
        background: theme === 'light' ? '#fff' : '#2a2a2a',
        color: theme === 'light' ? '#000' : '#eee',
        padding: '12px',
        margin: '8px 0',
        border: '1px solid #ccc',
        borderRadius: '6px',
        textAlign: 'left',
      }}
    >
      <h3>{name}</h3>
      <span>{name} — {score}</span>
      <p>Role: {role}</p>
      <p>Status: {isPresent ? 'Present' : 'Absent'}</p>
      <p>Badge: <span style={{ fontWeight: 'bold' }}>{badgeText}</span></p>

      <button
        style={{ marginTop: '10px' }}
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  )
}

function InternListWithCallback() {
  const { interns, removeIntern, search } = useInterns()

  // useCallback keeps the same function reference between renders.
  // This helps prevent unnecessary re-renders of child components
  // that receive the function as a prop.
  const handleRemove = useCallback(
    (id: number): void => {
      removeIntern(id)
    },
    [removeIntern]
  )

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(search.toLowerCase()) ||
    intern.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Intern List</h2>

      {filteredInterns.length === 0 ? (
        <p>No interns found</p>
      ) : (
        filteredInterns.map((intern) => (
          <InternRow
            key={intern.id}
            id={intern.id}
            name={intern.name}
            score={intern.score}
            role={intern.role}
            isPresent={intern.isPresent}
            onRemove={handleRemove}
          />
        ))
      )}
    </div>
  )
}

export default InternListWithCallback

// useCallback memoizes a function so React can reuse the same function
// reference between renders until its dependencies change. This helps
// prevent unnecessary re-renders of child components that receive the
// function as a prop, improving performance in larger applications.