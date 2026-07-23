import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import type { ReactNode } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternContextType {
  interns: Intern[]
  isLoading: boolean
  addIntern: (intern: Intern) => void
  removeIntern: (id: number) => void
  search: string
  setSearch: (value: string) => void
}

// Theme and intern data are kept in separate contexts because they
// represent different types of application state.
// This keeps the code organized and avoids unnecessary re-renders
// for components that only need one type of data.
const InternContext = createContext<InternContextType | null>(null)

export function InternProvider({ children }: { children: ReactNode }) {
  const [interns, setInterns] = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/interns')
      .then((res) => res.json())
      .then((data) => {
        setInterns(data)
        setIsLoading(false)
      })
      .catch(() => {
        // Fallback to static data if API is unavailable or returns non-JSON (like Vite HTML fallback)
        setTimeout(() => {
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
        }, 800)
      })
  }, [])

  function addIntern(intern: Intern) {
    setInterns((prev) => [...prev, intern])
  }

  function removeIntern(id: number) {
    setInterns((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <InternContext.Provider
      value={{
        interns,
        isLoading,
        addIntern,
        removeIntern,
        search,
        setSearch,
      }}
    >
      {children}
    </InternContext.Provider>
  )
}

export function useInterns() {
  const context = useContext(InternContext)

  if (!context) {
    throw new Error('useInterns must be used inside InternProvider')
  }

  return context
}