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
    question: 'Has this home undergone a FireSmart BC Home Ignition Zone Assessment?',
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
  DOCUMENT_TYPES.map((d) => [d.id, { answered: false, hasIt: null, uploaded: false, fileName: null }])
)

// Each category tracks an array of simulated preview ids. The actual image is
// always the same bundled grass photo — ids only need to be unique so previews
// can be removed individually.
const initialPhotos = Object.fromEntries(
  PHOTO_CATEGORIES.map((c) => [c.id, { previews: [] }])
)

let previewSeq = 0
function makePreviews(categoryId, n) {
  return Array.from({ length: n }, () => `${categoryId}-${(previewSeq += 1)}`)
}

// Wildfire mitigation checklist shown in the post-report "Action Plan" flow.
// The base risk score before any recommendation is completed. Each completed
// item shaves off its `scoreImpact`, so the live score is derived, never stored.
export const HAZARD_RISK_SCORE = 8.6

// The sample PDF that a simulated "Upload Files" produces on an action item.
export const SAMPLE_EVIDENCE_PDF = 'FireSmart_BC_Home_Ignition_Zone_Assessment.pdf'

export const CHECKLIST_ITEMS = [
  {
    id: 'gutters',
    label: 'Clear leaves and debris from gutters',
    shortName: 'Gutters',
    cost: 'Free',
    scoreImpact: 0.4,
    description:
      'Remove leaves, pine needles, and other debris from all gutters and downspouts to reduce ember ignition risk.',
    aiChecks: ['Gutter is clearly visible', 'No leaves or debris detected', 'Photo quality is sufficient'],
  },
  {
    id: 'firewood',
    label: 'Move firewood 10m from the house',
    shortName: 'Firewood',
    cost: 'Free',
    scoreImpact: 0.4,
    description:
      'Relocate firewood, lumber, and other combustible stacks at least 10 m from the house to keep fuel away from the structure.',
    aiChecks: ['Firewood is clearly visible', 'Stored 10 m or more from the house', 'Photo quality is sufficient'],
  },
  {
    id: 'branches',
    label: 'Trim branches over the roof',
    shortName: 'Branches',
    cost: '$0-300',
    scoreImpact: 0.4,
    description:
      'Prune tree branches overhanging the roof and within 2 m of the chimney so flames and embers can’t bridge to the structure.',
    aiChecks: ['Roofline is clearly visible', 'No overhanging branches detected', 'Photo quality is sufficient'],
  },
  {
    id: 'mulch',
    label: 'Replace wood mulch with gravel',
    shortName: 'Mulch',
    cost: '~$400',
    scoreImpact: 0.6,
    description:
      'Swap bark or wood-chip mulch within 1.5 m of the home for gravel or another non-combustible ground cover.',
    aiChecks: ['Ground cover is clearly visible', 'Non-combustible material detected', 'Photo quality is sufficient'],
  },
  {
    id: 'fencing',
    label: 'Replace wooden fencing near the home',
    shortName: 'Fencing',
    cost: '~$1,500–4,000',
    scoreImpact: 0.6,
    description:
      'Replace wooden fences or gates that attach to the home with metal or other non-combustible materials to break the fuel path.',
    aiChecks: ['Fencing is clearly visible', 'Non-combustible material detected', 'Photo quality is sufficient'],
  },
  {
    id: 'roof',
    label: 'Upgrade to Class A fire-rated roof',
    shortName: 'Roof',
    cost: '~$8K',
    costNote: 'Rebate may apply',
    scoreImpact: 0.8,
    description:
      'Upgrade to a Class A fire-rated roof to significantly improve your home’s resilience to wind-blown embers.',
    aiChecks: ['Roof is clearly visible', 'Class A materials detected', 'Photo quality is sufficient'],
  },
]

// Recommended actions shown on the Wildfire Risk Report (report-level guidance,
// distinct from the actionable checklist above).
export const REPORT_RECOMMENDATIONS = [
  {
    title: 'Book a free FireSmart assessment',
    detail: 'Receive personalized recommendations tailored to your property.',
  },
  {
    title: 'Remove combustible vegetation',
    detail: 'Clear dry grass, leaves, and flammable plants within 1.5 m of your home’s exterior.',
  },
  {
    title: 'Install ember-resistant vents',
    detail: 'Upgrade vulnerable vents to reduce the chance of wind-blown embers entering your home.',
  },
  {
    title: 'Replace your roof with fire-resistant materials',
    detail: 'Consider upgrading to a Class A fire-rated roof to significantly improve wildfire resilience.',
  },
]

// Initial Action Plan state — nothing completed, no evidence attached.
const initialChecklistProgress = Object.fromEntries(
  CHECKLIST_ITEMS.map((i) => [i.id, { done: false, evidence: null }])
)

// Live risk score: base minus the impact of every completed item, floored at 0.
export function computeRiskScore(progress) {
  const drop = CHECKLIST_ITEMS.reduce(
    (sum, i) => sum + (progress[i.id]?.done ? i.scoreImpact : 0),
    0
  )
  return Math.max(0, HAZARD_RISK_SCORE - drop)
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
    { id: 'roof-3', label: 'Chimney' },
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
  // Snapshot of the Action Plan's completed items as of the last time it was
  // viewed — lets the plan animate the progress bar and newly-checked rows from
  // their previous state instead of snapping to the final value.
  const [planBaseline, setPlanBaseline] = useState({ doneIds: [] })
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
      .eq('user_id', user.id)
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

  // Simulated upload — treats the action as successful and appends `n` grass
  // previews to the category instead of requiring a real file/camera.
  function addPhotos(categoryId, n = 5) {
    setPhotos((prev) => ({
      ...prev,
      [categoryId]: { previews: [...(prev[categoryId]?.previews ?? []), ...makePreviews(categoryId, n)] },
    }))
  }

  function removePhoto(categoryId, previewId) {
    setPhotos((prev) => ({
      ...prev,
      [categoryId]: { previews: (prev[categoryId]?.previews ?? []).filter((id) => id !== previewId) },
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

  function removeIdentifiedItem(categoryId, itemId) {
    setIdentifiedItems((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] ?? []).filter((item) => item.id !== itemId),
    }))
  }

  function addIdentifiedItem(categoryId) {
    setIdentifiedItems((prev) => {
      const existing = prev[categoryId] ?? []
      const item = { id: `${categoryId}-${(previewSeq += 1)}`, label: 'New Item' }
      return { ...prev, [categoryId]: [...existing, item] }
    })
  }

  function addChatMessage(from, text) {
    setChatMessages((prev) => [...prev, { id: prev.length + 1, from, text }])
  }

  function updateChecklistItem(itemId, patch) {
    setChecklistProgress((prev) => ({ ...prev, [itemId]: { ...prev[itemId], ...patch } }))
  }

  function emptyEvidence(prev, itemId) {
    return prev[itemId]?.evidence ?? { photos: [], files: [] }
  }

  // Simulated "Upload Files" — treats the picker as successful and drops in the
  // sample photo set + FireSmart PDF instead of requiring a real selection.
  function addChecklistFiles(itemId) {
    setChecklistProgress((prev) => {
      const ev = emptyEvidence(prev, itemId)
      const files = ev.files.includes(SAMPLE_EVIDENCE_PDF) ? ev.files : [...ev.files, SAMPLE_EVIDENCE_PDF]
      const photos = ev.photos.length ? ev.photos : makePreviews(`${itemId}-ev`, 2)
      return { ...prev, [itemId]: { ...prev[itemId], evidence: { photos, files } } }
    })
  }

  // Simulated "Take Photo" — appends one more captured photo.
  function addChecklistPhoto(itemId) {
    setChecklistProgress((prev) => {
      const ev = emptyEvidence(prev, itemId)
      return {
        ...prev,
        [itemId]: { ...prev[itemId], evidence: { ...ev, photos: [...ev.photos, ...makePreviews(`${itemId}-ev`, 1)] } },
      }
    })
  }

  function removeChecklistPhoto(itemId, previewId) {
    setChecklistProgress((prev) => {
      const ev = emptyEvidence(prev, itemId)
      return {
        ...prev,
        [itemId]: { ...prev[itemId], evidence: { ...ev, photos: ev.photos.filter((id) => id !== previewId) } },
      }
    })
  }

  function removeChecklistFile(itemId, name) {
    setChecklistProgress((prev) => {
      const ev = emptyEvidence(prev, itemId)
      return {
        ...prev,
        [itemId]: { ...prev[itemId], evidence: { ...ev, files: ev.files.filter((f) => f !== name) } },
      }
    })
  }

  function commitPlanBaseline(doneIds) {
    setPlanBaseline({ doneIds })
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
    addPhotos,
    removePhoto,
    identifiedItems,
    renameIdentifiedItem,
    removeIdentifiedItem,
    addIdentifiedItem,
    chatMessages,
    addChatMessage,
    checklistProgress,
    updateChecklistItem,
    addChecklistFiles,
    addChecklistPhoto,
    removeChecklistPhoto,
    removeChecklistFile,
    planBaseline,
    commitPlanBaseline,
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
