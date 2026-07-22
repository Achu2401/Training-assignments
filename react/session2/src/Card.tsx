import type { ReactNode } from 'react'

interface CardProps {
  title: string
  children?: ReactNode
}

// ReactNode represents anything React can render,
// such as text, elements, fragments, arrays, or components.
// It is the correct type for children because it accepts all valid React content.

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>

      {children && (
        <div className="card-body">
          {children}
        </div>
      )}
    </div>
  )
}

// Required children means content must always be provided.
// Optional children allow the component to render even without any content,
// which is useful for reusable layout components.

export default Card