import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FlowProvider } from './context/FlowContext'
import { AuthProvider, useAuth } from './context/AuthContext'

import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'

import DocumentsList from './pages/documents/DocumentsList'
import DocumentsThankYou from './pages/documents/DocumentsThankYou'

import PhotosList from './pages/photos/PhotosList'
import PhotoCamera from './pages/photos/PhotoCamera'
import PhotoPreview from './pages/photos/PhotoPreview'
import PhotosValidating from './pages/photos/PhotosValidating'

import ItemsIdentifying from './pages/items/ItemsIdentifying'
import ItemsReview from './pages/items/ItemsReview'
import ItemsReviewDetail from './pages/items/ItemsReviewDetail'
import ItemsGenerating from './pages/items/ItemsGenerating'

import HazardReport from './pages/checklist/HazardReport'
import ChecklistHub from './pages/checklist/ChecklistHub'
import MarkItemComplete from './pages/checklist/MarkItemComplete'
import AIReview from './pages/checklist/AIReview'
import ReviewSuccess from './pages/checklist/ReviewSuccess'
import ReviewFailed from './pages/checklist/ReviewFailed'
import YourReport from './pages/checklist/YourReport'
import YourInsurer from './pages/checklist/YourInsurer'
import ShareReport from './pages/checklist/ShareReport'
import FireSmartInsurers from './pages/checklist/FireSmartInsurers'
import SendToInsurer from './pages/checklist/SendToInsurer'
import AllDone from './pages/checklist/AllDone'

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

      <Route path="/photos" element={<RequireAuth><PhotosList /></RequireAuth>} />
      <Route path="/photos/validating" element={<RequireAuth><PhotosValidating /></RequireAuth>} />
      <Route path="/photos/:categoryId" element={<RequireAuth><PhotosList /></RequireAuth>} />
      <Route path="/photos/:categoryId/camera" element={<RequireAuth><PhotoCamera /></RequireAuth>} />
      <Route path="/photos/:categoryId/preview" element={<RequireAuth><PhotoPreview /></RequireAuth>} />

      <Route path="/items/identifying" element={<RequireAuth><ItemsIdentifying /></RequireAuth>} />
      <Route path="/items/review" element={<RequireAuth><ItemsReview /></RequireAuth>} />
      <Route path="/items/review/:categoryId" element={<RequireAuth><ItemsReviewDetail /></RequireAuth>} />
      <Route path="/items/generating" element={<RequireAuth><ItemsGenerating /></RequireAuth>} />

      <Route path="/checklist" element={<RequireAuth><HazardReport /></RequireAuth>} />
      <Route path="/checklist/items" element={<RequireAuth><ChecklistHub /></RequireAuth>} />
      <Route path="/checklist/items/:itemId" element={<RequireAuth><MarkItemComplete /></RequireAuth>} />
      <Route path="/checklist/items/:itemId/review" element={<RequireAuth><AIReview /></RequireAuth>} />
      <Route path="/checklist/items/:itemId/confirmed" element={<RequireAuth><ReviewSuccess /></RequireAuth>} />
      <Route path="/checklist/items/:itemId/failed" element={<RequireAuth><ReviewFailed /></RequireAuth>} />
      <Route path="/checklist/report" element={<RequireAuth><YourReport /></RequireAuth>} />
      <Route path="/checklist/report/insurer" element={<RequireAuth><YourInsurer /></RequireAuth>} />
      <Route path="/checklist/share" element={<RequireAuth><ShareReport /></RequireAuth>} />
      <Route path="/checklist/share/browse" element={<RequireAuth><FireSmartInsurers /></RequireAuth>} />
      <Route path="/checklist/send" element={<RequireAuth><SendToInsurer /></RequireAuth>} />
      <Route path="/checklist/done" element={<RequireAuth><AllDone /></RequireAuth>} />

      <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />

      <Route path="*" element={<Navigate to="/" replace />} />
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
