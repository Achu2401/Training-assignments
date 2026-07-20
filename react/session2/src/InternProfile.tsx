export interface Intern {
  id: number
  name: string
  score: number
  isPresent: boolean
  skills: string[]
}

interface InternProfileProps {
  intern: Intern
}

// Defining a separate Intern interface makes the data structure reusable.
// Multiple components can use the same interface, reducing duplication
// and making maintenance easier.

function InternProfile({ intern }: InternProfileProps) {
  return (
    <div className="card">
      <h2>{intern.name}</h2>
      <p>Score: {intern.score}</p>
      <p>{intern.isPresent ? 'Present' : 'Absent'}</p>

      <ul>
        {intern.skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default InternProfile