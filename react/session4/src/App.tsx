import Navbar from './components/Navbar'
import ScoreStats from './components/ScoreStats'
import AddInternForm from './components/AddInternForm'
import InternSearch from './components/InternSearch'
import InternListWithCallback from './components/InternListWithCallback'
import { useInterns } from './contexts/intern-context'

// App Layer:
// - Contexts store and share global state like theme and intern data.
// - Custom hooks contain reusable stateful logic such as forms, search,
//   and counters.
// - Components are responsible for rendering the UI and interacting with
//   contexts and custom hooks.
function App() {
  const { isLoading } = useInterns()

  if (isLoading) {
    return <h2>Loading interns...</h2>
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: '16px' }}>
        <ScoreStats />
        <AddInternForm />
        <InternSearch />
        <InternListWithCallback />
      </div>
    </div>
  )
}

export default App