import { ArrowUpRight, CheckCheck, FolderOpen, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { dashboardStats } from '../services/supabaseClient'

const statCards = [
  { label: 'Team Members', value: dashboardStats.members, icon: Users, tone: 'blue' },
  { label: 'Active Tasks', value: dashboardStats.activeTasks, icon: ArrowUpRight, tone: 'amber' },
  { label: 'Completed Tasks', value: dashboardStats.completedTasks, icon: CheckCheck, tone: 'green' },
  { label: 'Shared Files', value: dashboardStats.sharedFiles, icon: FolderOpen, tone: 'violet' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const displayName = user?.user_metadata?.full_name || 'Team Member'

  return (
    <div className="page-section">
      <section className="welcome-panel">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Welcome, {displayName} 👋</h2>
        </div>
      </section>

      <div className="stats-grid dashboard-stats">
        {statCards.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className={`stat-card ${tone}`}>
            <div className="stat-icon">
              <Icon size={20} />
            </div>
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="panel-card activity-panel">
        <div className="panel-header-row">
          <h3>Recent Activity</h3>
        </div>

        <ul className="activity-list">
          {dashboardStats.recentActivity.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
