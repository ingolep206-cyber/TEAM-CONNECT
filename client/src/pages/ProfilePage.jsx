import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.user_metadata?.full_name || '')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim()) {
      alert('Name cannot be empty.')
      return
    }

    updateProfile(name.trim())
    alert('Profile updated successfully.')
  }

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>User Profile</h2>
      </div>

      <div className="panel-card profile-card">
        <div className="profile-info">
          <div className="avatar-circle large-avatar">{(user?.user_metadata?.full_name || 'T').charAt(0)}</div>
          <div>
            <h3>{user?.user_metadata?.full_name || 'Team Member'}</h3>
            <p>{user?.email}</p>
            <span className="role-badge">{user?.user_metadata?.role || 'Member'}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Full name
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>

          <label>
            Email
            <input type="email" value={user?.email || ''} disabled />
          </label>

          <button type="submit" className="primary-btn">
            Update profile
          </button>
        </form>
      </div>
    </div>
  )
}
