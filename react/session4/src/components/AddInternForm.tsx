import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

function AddInternForm() {
  const { form, error, handleChange, handleReset, isValid } =
    useInternForm()

  const { addIntern, interns } = useInterns()

  function handleSubmit(): void {
    if (!isValid()) return

    addIntern({
      id: interns.length + 1,
      ...form,
    })

    handleReset()
  }

  return (
    <form
      style={{ marginBottom: '20px' }}
      role="form"
      aria-label="Add Intern"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <h2>Add Intern</h2>

      {error && (
        <p role="alert" className="error-message" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <label>
        Intern Name
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          aria-label="Name"
        />
      </label>

      <br /><br />

      <label>
        Score
        <input
          name="score"
          type="number"
          value={form.score}
          onChange={handleChange}
          placeholder="Score"
        />
      </label>

      <br /><br />

      <label>
        <input
          type="checkbox"
          name="isPresent"
          checked={form.isPresent}
          onChange={handleChange}
        />
        Present
      </label>

      <br /><br />

      <label>
        Role
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </label>

      <br /><br />

      <button type="submit">Add Intern</button>

      <button
        type="button"
        onClick={handleReset}
        style={{ marginLeft: '10px' }}
      >
        Reset
      </button>
    </form>
  )
}

export default AddInternForm