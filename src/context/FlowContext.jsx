import { createContext, useContext, useState } from 'react'

// Shared mock state for the whole property-onboarding flow.
// Every screen group (documents, photos, items, chat) reads/writes here so
// state carries across routes without prop-drilling.

const FlowContext = createContext(null)

export const DOCUMENT_TYPES = [
  {
    id: 'firesmart',
    label: 'FireSmart BC',
    question: 'Have you completed a FireSmart BC Home Ignition Zone Assessment?',
    helpText: "Don't have the FireSmart BC assessment? Learn more here",
  },
  {
    id: 'insurance',
    label: 'Insurance Policy',
    question: 'Does your home currently have insurance coverage?',
  },
  {
    id: 'pds',
    label: 'Property Disclosure Statement',
    question: 'Do you have a Property Disclosure Statement (PDS)?',
    description:
      'A Property Disclosure Statement (PDS) provides information about the condition and history of a property.',
  },
]

export const PHOTO_CATEGORIES = [
  { id: 'exterior', label: 'Exterior Views', optional: false, description: 'Upload photos of the front, back, left side, and right side of your home.' },
  { id: 'roof', label: 'Roof', optional: false, description: 'Upload a clear photo of your roof, including the gutters if possible.' },
  { id: 'deck', label: 'Deck & Patio', optional: false, description: 'Upload photos of your deck, patio, porch, or other outdoor living areas.' },
  { id: 'flammable', label: 'Flammable Items', optional: false, description: 'Upload photos of firewood, propane tanks, fuel containers, or other flammable items near your home.' },
  { id: 'structures', label: 'Additional Structures', optional: false, description: 'Upload photos of any detached structures, such as sheds, garages, or gazebos.' },
  { id: 'concern', label: 'Areas of Concern (Optional)', optional: true, description: 'Upload photos of any areas you\'re concerned may pose a wildfire risk.' },
  { id: 'renovation', label: 'Renovation Receipt (Optional)', optional: true, description: 'Upload photos of any renovation receipts or proof of completed renovations.' },
]

const initialDocuments = Object.fromEntries(
  DOCUMENT_TYPES.map((d) => [d.id, { answered: false, hasIt: null, uploaded: false }])
)

const initialPhotos = Object.fromEntries(
  PHOTO_CATEGORIES.map((c) => [c.id, { count: 0 }])
)

// Mock AI-detected items shown in the review screens.
const initialIdentifiedItems = {
  exterior: [
    { id: 'ext-1', label: 'Window' },
    { id: 'ext-2', label: 'Siding' },
  ],
  roof: [
    { id: 'roof-1', label: 'Roof Vent' },
    { id: 'roof-2', label: 'Gutter' },
  ],
  deck: [{ id: 'deck-1', label: 'Wood Deck' }],
  flammable: [{ id: 'flam-1', label: 'Propane Tank' }],
  structures: [{ id: 'struct-1', label: 'Shed' }],
  concern: [],
  renovation: [],
}

export function FlowProvider({ children }) {
  const [propertyDetails, setPropertyDetails] = useState({
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    propertyType: '',
    yearBuilt: '',
    squareFootage: '',
    constructionType: '',
    roofType: '',
    livesHere: 'yes',
  })

  const [documents, setDocuments] = useState(initialDocuments)
  const [photos, setPhotos] = useState(initialPhotos)
  const [identifiedItems, setIdentifiedItems] = useState(initialIdentifiedItems)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, from: 'assistant', text: 'Hello! What can I help you with today?' },
  ])

  function updateDocument(id, patch) {
    setDocuments((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  function addPhoto(categoryId) {
    setPhotos((prev) => ({
      ...prev,
      [categoryId]: { count: (prev[categoryId]?.count ?? 0) + 1 },
    }))
  }

  function renameIdentifiedItem(categoryId, itemId, newLabel) {
    setIdentifiedItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].map((item) =>
        item.id === itemId ? { ...item, label: newLabel } : item
      ),
    }))
  }

  function addChatMessage(from, text) {
    setChatMessages((prev) => [...prev, { id: prev.length + 1, from, text }])
  }

  const value = {
    propertyDetails,
    setPropertyDetails,
    documents,
    updateDocument,
    photos,
    addPhoto,
    identifiedItems,
    renameIdentifiedItem,
    chatMessages,
    addChatMessage,
  }

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}
