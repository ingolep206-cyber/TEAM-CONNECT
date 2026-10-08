import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Megaphone,
  UserCircle,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Team', to: '/team', icon: Users },
  { label: 'Chat', to: '/chat', icon: MessageSquareText },
  { label: 'Files', to: '/files', icon: FolderOpen },
  { label: 'Tasks', to: '/tasks', icon: BarChart3 },
  { label: 'Announcements', to: '/announcements', icon: Megaphone },
  { label: 'Profile', to: '/profile', icon: UserCircle },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="app-layout">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="app-badge">TC</div>
          <div>
            <h2>TeamConnect</h2>
          </div>
          <button type="button" className="close-mobile" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="nav-menu">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="main-panel">
        <header className="main-header">
          <button type="button" className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>

          <div>
            <p className="header-label">Welcome back</p>
            <h1>{user?.user_metadata?.full_name || 'Team Member'}</h1>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
