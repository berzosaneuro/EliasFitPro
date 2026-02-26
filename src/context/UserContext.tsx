'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type UserProfile = {
  email: string
  nombre: string
}

type UserContextType = {
  user: UserProfile | null
  setUser: (profile: UserProfile) => void
  logout: () => void
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: true,
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('neuropresencia_user')
      if (stored) {
        setUserState(JSON.parse(stored))
      }
    } catch {}
    setLoading(false)
  }, [])

  const setUser = (profile: UserProfile) => {
    setUserState(profile)
    localStorage.setItem('neuropresencia_user', JSON.stringify(profile))
  }

  const logout = () => {
    setUserState(null)
    localStorage.removeItem('neuropresencia_user')
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
