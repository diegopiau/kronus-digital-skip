import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06060B] flex items-center justify-center text-[#9CA3B4]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#8767FF] border-t-transparent rounded-full animate-spin" />
          <span>A carregar painel...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
