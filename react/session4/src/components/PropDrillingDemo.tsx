interface User {
  name: string
  isAdmin: boolean
}

// Grandchild — actually uses the user
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  )
}

// Middle component — receives user only to pass it down, never uses it
// This component does not use the user object itself.
// It only forwards the prop to UserBadge.
// If the User interface changes, this component must also update
// even though it doesn't directly use the data.
function InternCard({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px' }}>
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  )
}

// Parent — passes user down to InternCard
// This component also does not use the user object.
// It simply passes it to its children.
// This is called prop drilling. If the User interface gains a new field,
// this component must also update even though it never uses that field.
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  )
}

// Top level — owns the user
function PropDrillingDemo() {
  const user: User = { name: 'Rahul', isAdmin: true }

  return <InternList user={user} />
}

export default PropDrillingDemo