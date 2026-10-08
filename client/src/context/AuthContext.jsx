import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getDemoUser, getDemoUserByEmail, supabase } from '../services/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getDemoUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      localStorage.setItem('teamconnect-demo-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('teamconnect-demo-user')
    }
  }, [user])

  useEffect(() => {
    if (!supabase) {
      setUser(getDemoUser())
      setLoading(false)
      return
    }

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  const signIn = async ({ email, password }) => {
    if (!supabase) {
      const demoUser = getDemoUserByEmail(email)
      setUser(demoUser)
      return { error: null }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async ({ email, password, full_name }) => {
    if (!supabase) {
      const demoUser = {
        ...getDemoUser(),
        email,
        user_metadata: {
          full_name,
          role: 'Member',
        },
      }
      setUser(demoUser)
      return { error: null }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role: 'Member',
        },
      },
    })

    return { error }
  }

  const signOut = async () => {
    if (!supabase) {
      localStorage.removeItem('teamconnect-demo-user')
      setUser(null)
      return { error: null }
    }

    const { error } = await supabase.auth.signOut()
    setUser(null)
    return { error }
  }

  const updateProfile = (newName) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser

      return {
        ...currentUser,
        user_metadata: {
          ...currentUser.user_metadata,
          full_name: newName,
        },
      }
    })
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile,
      isAuthenticated: Boolean(user),
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
