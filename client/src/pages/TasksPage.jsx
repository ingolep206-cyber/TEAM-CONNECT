import { useMemo, useState } from 'react'
import { demoTasks } from '../services/supabaseClient'

const statusFilterOptions = ['All', 'To Do', 'In Progress', 'Completed']

export default function TasksPage() {
  const [tasks, setTasks] = useState(demoTasks)
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    assigned_to: '',
    priority: 'Medium',
    status: 'To Do',
    due_date: '',
  })

  const filteredTasks = useMemo(() => {
    if (filter === 'All') return tasks
    return tasks.filter((task) => task.status === filter)
  }, [tasks, filter])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim()) {
      alert('Task title cannot be empty.')
      return
    }

    if (form.id) {
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === form.id ? { ...task, ...form } : task)),
      )
    } else {
      setTasks((currentTasks) => [
        {
          ...form,
          id: Date.now(),
        },
        ...currentTasks,
      ])
    }

    setForm({
      id: null,
      title: '',
      description: '',
      assigned_to: '',
      priority: 'Medium',
      status: 'To Do',
      due_date: '',
    })
  }

  const handleEdit = (task) => {
    setForm(task)
  }

  const handleDelete = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>Task Management</h2>
      </div>

      <div className="filter-row">
        {statusFilterOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`filter-chip ${filter === option ? 'active' : ''}`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="task-layout">
        <form onSubmit={handleSubmit} className="panel-card task-form">
          <h3>{form.id ? 'Edit task' : 'Create task'}</h3>

          <label>
            Title
            <input type="text" name="title" value={form.title} onChange={handleChange} />
          </label>

          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" />
          </label>

          <label>
            Assigned to
            <input type="text" name="assigned_to" value={form.assigned_to} onChange={handleChange} />
          </label>

          <div className="double-field">
            <label>
              Priority
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>

            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>

          <label>
            Due date
            <input type="date" name="due_date" value={form.due_date} onChange={handleChange} />
          </label>

          <button type="submit" className="primary-btn full-width-btn">
            {form.id ? 'Update task' : 'Create task'}
          </button>
        </form>

        <div className="panel-card tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-card-head">
                <h4>{task.title}</h4>
                <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>

              <p>{task.description}</p>

              <div className="task-meta">
                <span>Assigned: {task.assigned_to || 'Unassigned'}</span>
                <span>Status: {task.status}</span>
                <span>Due: {task.due_date || 'No date'}</span>
              </div>

              <div className="task-actions">
                <button type="button" className="secondary-btn small-btn" onClick={() => handleEdit(task)}>
                  Edit
                </button>
                <button type="button" className="danger-btn small-btn" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
