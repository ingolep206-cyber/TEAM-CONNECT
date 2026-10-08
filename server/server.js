import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const hasRealSupabaseConfig = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('your-anon-key'),
)
const supabase = hasRealSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null

const demoDashboard = {
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

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TeamConnect backend is running',
    supabaseConfigured: Boolean(supabase),
  })
})

app.get('/api/dashboard', (req, res) => {
  res.json(demoDashboard)
})

app.get('/api/tasks', async (req, res) => {
  if (!supabase) {
    return res.json([
      {
        id: 1,
        title: 'Landing page redesign',
        description: 'Improve the homepage layout',
        assigned_to: 'Rahul',
        priority: 'High',
        status: 'In Progress',
        due_date: '2026-10-12',
      },
    ])
  }

  const { data, error } = await supabase.from('tasks').select('*')

  if (error) return res.status(500).json({ message: 'Unable to fetch tasks' })
  res.json(data)
})

app.get('/api/messages', async (req, res) => {
  if (!supabase) {
    return res.json([
      { id: 1, user_name: 'Prathamesh', message: 'Welcome to the team chat.', created_at: new Date().toISOString() },
    ])
  }

  const { data, error } = await supabase.from('messages').select('*')

  if (error) return res.status(500).json({ message: 'Unable to fetch messages' })
  res.json(data)
})

app.listen(port, () => {
  console.log(`TeamConnect server is running on http://localhost:${port}`)
})
