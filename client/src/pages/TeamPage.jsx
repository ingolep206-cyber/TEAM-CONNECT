import { useMemo, useState } from 'react'
import { demoMembers } from '../services/supabaseClient'

export default function TeamPage() {
  const [search, setSearch] = useState('')

  const filteredMembers = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) return demoMembers

    return demoMembers.filter((member) => member.full_name.toLowerCase().includes(keyword))
  }, [search])

  return (
    <div className="page-section">
      <div className="section-header">
        <h2>Team Members</h2>
        <input
          type="text"
          className="search-box"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name"
        />
      </div>

      <div className="member-grid">
        {filteredMembers.map((member) => (
          <div key={member.id} className="panel-card member-card">
            <div className="avatar-circle">{member.full_name.charAt(0)}</div>
            <div className="member-details">
              <h3>{member.full_name}</h3>
              <p>{member.role}</p>
              <small>{member.email}</small>
              <span>Joined: {member.join_date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
