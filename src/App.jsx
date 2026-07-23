import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FlowProvider } from './context/FlowContext'
import { AuthProvider, useAuth } from './context/AuthContext'

import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'

import DocumentsList from './pages/documents/DocumentsList'
import DocumentDetail from './pages/documents/DocumentDetail'
import DocumentsThankYou from './pages/documents/DocumentsThankYou'

import PhotosList from './pages/photos/PhotosList'
import PhotoCategoryDetail from './pages/photos/PhotoCategoryDetail'
import PhotoCamera from './pages/photos/PhotoCamera'
import PhotoPreview from './pages/photos/PhotoPreview'
import PhotosValidating from './pages/photos/PhotosValidating'

import ItemsIdentifying from './pages/items/ItemsIdentifying'
import ItemsReview from './pages/items/ItemsReview'
import ItemsReviewDetail from './pages/items/ItemsReviewDetail'
import ItemsGenerating from './pages/items/ItemsGenerating'

import Chat from './pages/chat/Chat'

function RequireAuth({ children }) {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  const { session, loading } = useAuth()

  if (loading) return null

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={session ? <Navigate to="/" replace /> : <SignUp />} />

      <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/property-details" element={<RequireAuth><PropertyDetails /></RequireAuth>} />

      <Route path="/documents" element={<RequireAuth><DocumentsList /></RequireAuth>} />
      <Route path="/documents/thank-you" element={<RequireAuth><DocumentsThankYou /></RequireAuth>} />
      <Route path="/documents/:docId" element={<RequireAuth><DocumentDetail /></RequireAuth>} />

      <Route path="/photos" element={<RequireAuth><PhotosList /></RequireAuth>} />
      <Route path="/photos/validating" element={<RequireAuth><PhotosValidating /></RequireAuth>} />
      <Route path="/photos/:categoryId" element={<RequireAuth><PhotoCategoryDetail /></RequireAuth>} />
      <Route path="/photos/:categoryId/camera" element={<RequireAuth><PhotoCamera /></RequireAuth>} />
      <Route path="/photos/:categoryId/preview" element={<RequireAuth><PhotoPreview /></RequireAuth>} />

      <Route path="/items/identifying" element={<RequireAuth><ItemsIdentifying /></RequireAuth>} />
      <Route path="/items/review" element={<RequireAuth><ItemsReview /></RequireAuth>} />
      <Route path="/items/review/:categoryId" element={<RequireAuth><ItemsReviewDetail /></RequireAuth>} />
      <Route path="/items/generating" element={<RequireAuth><ItemsGenerating /></RequireAuth>} />

      <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <FlowProvider>
        <HashRouter>
          <div className="app-bg">
            <AppRoutes />
          </div>
        </HashRouter>
      </FlowProvider>
    </AuthProvider>
  )
}
