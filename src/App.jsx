import { HashRouter, Routes, Route } from 'react-router-dom'
import { FlowProvider } from './context/FlowContext'

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

export default function App() {
  return (
    <FlowProvider>
      <HashRouter>
        <div className="app-bg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property-details" element={<PropertyDetails />} />

            <Route path="/documents" element={<DocumentsList />} />
            <Route path="/documents/thank-you" element={<DocumentsThankYou />} />
            <Route path="/documents/:docId" element={<DocumentDetail />} />

            <Route path="/photos" element={<PhotosList />} />
            <Route path="/photos/validating" element={<PhotosValidating />} />
            <Route path="/photos/:categoryId" element={<PhotoCategoryDetail />} />
            <Route path="/photos/:categoryId/camera" element={<PhotoCamera />} />
            <Route path="/photos/:categoryId/preview" element={<PhotoPreview />} />

            <Route path="/items/identifying" element={<ItemsIdentifying />} />
            <Route path="/items/review" element={<ItemsReview />} />
            <Route path="/items/review/:categoryId" element={<ItemsReviewDetail />} />
            <Route path="/items/generating" element={<ItemsGenerating />} />

            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </HashRouter>
    </FlowProvider>
  )
}
