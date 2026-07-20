interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternListProps {
  interns: Intern[]
  onRemove: (id: number) => void
}

function InternList({
  interns,
  onRemove,
}: InternListProps) {
  if (interns.length === 0) {
    return <p>No interns available.</p>
  }

  return (
    <div>
      {interns.map(intern => (
        <div
          key={intern.id}
          style={{
            border: '1px solid #ccc',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '6px',
          }}
        >
          <h3>{intern.name}</h3>

          <p>Score: {intern.score}</p>

          <p>Role: {intern.role}</p>

          <p>
            {intern.isPresent
              ? 'Present today'
              : 'Absent today'}
          </p>

          <button
            onClick={() => onRemove(intern.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default InternList