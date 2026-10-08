import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const hasRealSupabaseConfig = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon-key'),
)

export const supabase = hasRealSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null

export const demoMembers = [
  { id: 1, full_name: 'Prathamesh', email: 'prathamesh@teamconnect.com', role: 'Developer', join_date: '2024-06-12' },
  { id: 2, full_name: 'Rahul', email: 'rahul@teamconnect.com', role: 'Designer', join_date: '2024-07-08' },
  { id: 3, full_name: 'Sneha', email: 'sneha@teamconnect.com', role: 'Project Manager', join_date: '2024-05-20' },
  { id: 4, full_name: 'Aniket', email: 'aniket@teamconnect.com', role: 'QA Engineer', join_date: '2024-08-01' },
]

export const demoTasks = [
  { id: 1, title: 'Landing page redesign', description: 'Improve the homepage flow', assigned_to: 'Rahul', priority: 'High', status: 'In Progress', due_date: '2026-10-12' },
  { id: 2, title: 'Create onboarding flow', description: 'Build a simple first-use experience', assigned_to: 'Prathamesh', priority: 'Medium', status: 'To Do', due_date: '2026-10-15' },
  { id: 3, title: 'Prepare sprint summary', description: 'Collect team updates for the review', assigned_to: 'Sneha', priority: 'Low', status: 'Completed', due_date: '2026-10-06' },
]

export const demoMessages = [
  { id: 1, user_name: 'Prathamesh', message: 'Morning team! Please share your daily update.', created_at: '2026-10-08T09:00:00.000Z' },
  { id: 2, user_name: 'Rahul', message: 'The UI mockups are ready for review.', created_at: '2026-10-08T09:05:00.000Z' },
  { id: 3, user_name: 'Sneha', message: 'Great, we can finalize the design after lunch.', created_at: '2026-10-08T09:07:00.000Z' },
]

export const demoAnnouncements = [
  { id: 1, title: 'Project meeting', description: 'Project meeting tomorrow at 10 AM.', created_by: 'Sneha', created_at: '2026-10-07T12:00:00.000Z' },
  { id: 2, title: 'Final report submission', description: 'Final report submission is Friday.', created_by: 'Prathamesh', created_at: '2026-10-06T14:00:00.000Z' },
]

export const demoFiles = [
  { id: 1, file_name: 'Project-Plan.pdf', uploader: 'Prathamesh', created_at: '2026-10-05' },
  { id: 2, file_name: 'Sprint-Board.xlsx', uploader: 'Sneha', created_at: '2026-10-07' },
]

export function formatDisplayName(value) {
  if (!value) return 'Team Member'

  return value
    .split(/[._\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

export function getDemoUserByEmail(email = '') {
  const normalizedEmail = (email || '').trim().toLowerCase()
  const knownMember = demoMembers.find((member) => member.email.toLowerCase() === normalizedEmail)

  if (knownMember) {
    return {
      id: knownMember.id,
      email: knownMember.email,
      user_metadata: {
        full_name: knownMember.full_name,
        role: knownMember.role,
      },
    }
  }

  const fallbackName = formatDisplayName(normalizedEmail.split('@')[0] || 'Team Member')

  return {
    id: normalizedEmail ? `demo-user-${normalizedEmail}` : 'demo-user',
    email: normalizedEmail || 'guest@teamconnect.com',
    user_metadata: {
      full_name: fallbackName,
      role: 'Member',
    },
  }
}

export const dashboardStats = {
  members: 8,
  activeTasks: 5,
  completedTasks: 12,
  sharedFiles: 7,
  recentActivity: [
    'Prathamesh uploaded the project plan',
    'Rahul completed the landing page mockup',
    'Sneha updated the sprint checklist',
  ],
}

export function getDemoUser() {
  if (typeof localStorage !== 'undefined') {
    const savedUser = localStorage.getItem('teamconnect-demo-user')

    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch {
        localStorage.removeItem('teamconnect-demo-user')
      }
    }
  }

  return getDemoUserByEmail('prathamesh@teamconnect.com')
}

export function isSupabaseConfigured() {
  return Boolean(supabase)
}
