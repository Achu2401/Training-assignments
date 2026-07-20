import { useMemo } from 'react'

export interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface SummaryBarProps {
  interns: Intern[]
}

function SummaryBar({ interns }: SummaryBarProps) {
  const totalInterns = interns.length

  const presentInterns = useMemo(
    () => interns.filter(intern => intern.isPresent).length,
    [interns]
  )

  const averageScore = useMemo(() => {
    if (interns.length === 0) return 0

    const total = interns.reduce(
      (sum, intern) => sum + intern.score,
      0
    )

    return Number((total / interns.length).toFixed(1))
  }, [interns])

  return (
    <div>
      <h2>Summary</h2>

      <p>Total Interns: {totalInterns}</p>

      <p>Present: {presentInterns}</p>

      <p>Average Score: {averageScore}</p>
    </div>
  )
}

export default SummaryBar