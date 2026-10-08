import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import AnnouncementsPage from './pages/AnnouncementsPage'
import ChatPage from './pages/ChatPage'
import DashboardPage from './pages/DashboardPage'
import FilesPage from './pages/FilesPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import TeamPage from './pages/TeamPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
