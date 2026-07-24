import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useAuth } from './AuthContext'

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

// Wildfire mitigation checklist shown in the post-report "hazard report" flow.
export const HAZARD_RISK_SCORE = 8.6

export const CHECKLIST_ITEMS = [
  { id: 'gutters', label: 'Clear leaves and debris from gutters', cost: '$0 · DIY' },
  { id: 'firewood', label: 'Move firewood 10 m from the house', cost: '$0 · DIY' },
  { id: 'branches', label: 'Trim branches over the roof', cost: '~$150–300' },
  { id: 'mulch', label: 'Replace wood mulch with gravel', cost: '~$400' },
  { id: 'roof', label: 'Upgrade to a Class A fire-rated roof', cost: '$8,000+ · rebate may apply' },
]

const initialChecklistProgress = {
  gutters: { done: true, photo: null, receipt: null },
  firewood: { done: true, photo: null, receipt: null },
  branches: { done: true, photo: null, receipt: null },
  mulch: { done: false, photo: null, receipt: null },
  roof: { done: false, photo: null, receipt: null },
}

export const INSURERS = [
  { id: 'pacific-coast', label: 'Pacific Coast Insurance', firesmartNote: 'Accepts FireSmart certificates · mitigation discount' },
  { id: 'bc-mutual', label: 'BC Mutual Home', firesmartNote: 'Accepts mitigation reports at quote time' },
  { id: 'interior-shield', label: 'Interior Shield Insurance', firesmartNote: 'Covers high-risk postal codes with verified fixes' },
]

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

function submissionToProperty(row) {
  const address = [row.street_address, row.city].filter(Boolean).join(', ')
  return { id: row.id, address: address || 'Untitled property' }
}

export function FlowProvider({ children }) {
  const { user } = useAuth()
  const [propertyDetails, setPropertyDetails] = useState({
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    propertyType: '',
    yearBuilt: '',
    nStories: '',
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

  const [checklistProgress, setChecklistProgress] = useState(initialChecklistProgress)
  const [reportInclusions, setReportInclusions] = useState({ photos: true, receipts: true })
  const [insurer, setInsurerState] = useState({ insurerId: 'pacific-coast', policyNumber: 'HO-4482-1937' })
  const [properties, setProperties] = useState([])

  useEffect(() => {
    if (!user) {
      setProperties([])
      return
    }

    let cancelled = false

    supabase
      .from('submissions')
      .select('id, street_address, city, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return
        setProperties(data.map(submissionToProperty))
      })

    return () => {
      cancelled = true
    }
  }, [user])

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

  function updateChecklistItem(itemId, patch) {
    setChecklistProgress((prev) => ({ ...prev, [itemId]: { ...prev[itemId], ...patch } }))
  }

  function toggleReportInclusion(key) {
    setReportInclusions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function setInsurer(patch) {
    setInsurerState((prev) => ({ ...prev, ...patch }))
  }

  function addProperty(row) {
    setProperties((prev) => [submissionToProperty(row), ...prev])
  }

  async function removeProperty(id) {
    const previous = properties
    setProperties((prev) => prev.filter((p) => p.id !== id))

    const { error } = await supabase.from('submissions').delete().eq('id', id)
    if (error) {
      setProperties(previous)
      throw error
    }
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
    checklistProgress,
    updateChecklistItem,
    reportInclusions,
    toggleReportInclusion,
    insurer,
    setInsurer,
    properties,
    addProperty,
    removeProperty,
  }

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}
