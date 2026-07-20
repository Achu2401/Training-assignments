interface ProfileCardProps {
  name?: string
  role?: string
  score?: number
  skills?: string[]
}

// The '?' means the prop is optional.
// If a prop is not passed, the default parameter value is used instead.
// This allows the component to render safely without requiring every prop.

function ProfileCard({
  name = 'Unknown',
  role = 'Intern',
  score = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>

      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}

      {/* Task 2.2
      If 'skills = []' is removed, TypeScript shows:
      'skills' is possibly 'undefined'.

      This happens because the 'skills' prop is optional.
      Providing a default empty array ensures '.length' and '.map()'
      can be used safely without runtime errors.
      */}
    </div>
  )
}

export default ProfileCard