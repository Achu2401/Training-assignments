import Card from './Card'
import InternCard from './InternCard'
import ProfileCard from './ProfileCard'
import InternProfile from './InternProfile'
import type { Intern } from './InternProfile'
import Dashboard from './Dashboard'
import SelfLearning from './SelfLearning'

function App() {
  const rahul: Intern = {
    id: 1,
    name: 'Rahul',
    score: 92,
    isPresent: true,
    skills: ['HTML', 'CSS', 'TypeScript', 'React'],
  }

  const priya: Intern = {
    id: 2,
    name: 'Priya',
    score: 78,
    isPresent: true,
    skills: ['Node.js', 'TypeScript'],
  }

  return (
    <div>
      {/* Section 1 - Typed Props */}

      <InternCard
  name="Rahul"
  score={92}
  isPresent={true}
  role="Frontend"
/>

<InternCard
  name="Priya"
  score={78}
  isPresent={true}
  role="Backend"
/>

<InternCard
  name="Amit"
  score={45}
  isPresent={false}
  role="UI/UX"
/>

      {/* Section 2 - Default Props */}

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={['React', 'TypeScript', 'Git']}
      />

      <ProfileCard name="Priya" />

      <ProfileCard />

      {/* Section 3 - Object Props */}

      <InternProfile intern={rahul} />

      <InternProfile intern={priya} />

      <InternProfile intern={{ ...priya }} />

      {/* Section 4 - Children Prop */}

        <Card title="Rahul">
          <p>Score: 92</p>
          <p>Status: Present</p>
          <button>View Profile</button>
        </Card>

        <Card title="Announcements">
          <ul>
            <li>Session 3 tomorrow at 10am</li>
            <li>Submit PRs by EOD</li>
          </ul>
        </Card>

        <Card title="Empty Card" />

      {/* Task 1.2 - Error 1
      <InternCard name="Rahul" score="92" isPresent={true} />
      TypeScript Error:
      Type 'string' is not assignable to type 'number'.

      Why it's helpful:
      TypeScript catches incorrect data types during development,
      preventing runtime bugs.
      */}

      {/* Task 1.2 - Error 2
      <InternCard name="Rahul" score={92} isPresent="true" />
      TypeScript Error:
      Type 'string' is not assignable to type 'boolean'.

      Why it's helpful:
      Ensures boolean props receive only true or false values.
      */}

      {/* Task 1.2 - Error 3
      <InternCard name="Rahul" score={92} />
      TypeScript Error:
      Property 'isPresent' is missing.

      Why it's helpful:
      Prevents rendering components without required props.
      */}

      {/* Task 1.2 - Error 4
      <InternCard
        name="Rahul"
        score={92}
        isPresent={true}
        age={25}
      />
      TypeScript Error:
      Property 'age' does not exist on type 'InternCardProps'.

      Why it's helpful:
      Prevents passing unsupported props to a component.
      */}

      {/* Spread Operator
      The spread operator (...) creates a shallow copy of an object.
      It is useful when creating a new object without modifying the original.
      Using it unnecessarily can make the code less clear.
      */}
      <Dashboard />
      <SelfLearning />
    </div>
  )
}

export default App