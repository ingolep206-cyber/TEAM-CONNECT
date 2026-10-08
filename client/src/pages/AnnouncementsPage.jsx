import { demoAnnouncements } from '../services/supabaseClient'

export default function AnnouncementsPage() {
  return (
    <div className="page-section">
      <div className="section-header">
        <h2>Announcements</h2>
      </div>

      <div className="announcement-list">
        {demoAnnouncements.map((item) => (
          <div key={item.id} className="panel-card announcement-card">
            <span className="eyebrow">Announcement</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>Posted by {item.created_by}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
