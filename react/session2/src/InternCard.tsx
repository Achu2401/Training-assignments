import Avatar from './Avatar'
import Badge from './Badge'
import ScoreBar from './ScoreBar'

interface InternCardProps {
  name: string
  score: number
  isPresent: boolean
  role: string
}

// Badge is reusable because the same component can display different labels
// and colors without duplicating code. TypeScript checks every usage using
// BadgeProps, making the component safer and easier to maintain.

function InternCard({
  name,
  score,
  isPresent,
  role,
}: InternCardProps) {
  return (
    <div className="card">
      <Avatar name={name} />

      <h2>{name}</h2>

      <ScoreBar score={score} />

      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginTop: '8px',
        }}
      >
        <Badge label={role} color="#4f46e5" />

        <Badge
          label={isPresent ? 'Present' : 'Absent'}
          color={isPresent ? 'green' : '#e53e3e'}
        />

        {score >= 90 && (
          <Badge
            label="Top Performer"
            color="#d97706"
          />
        )}
      </div>
    </div>
  )
}

export default InternCard