// Inline SVG icons recreated from the Wildfire design set.
// Strokes use `currentColor` so color is driven by CSS `color`.
// Multi-color marks (camera, selected tab glyphs) take an explicit fill.

// Stylised placeholder brand marks for the prototype insurer list — simple
// coloured emblems keyed by `INSURERS[].logo`, not real logo artwork.
export function InsurerLogo({ id, size = 30 }) {
  if (id === 'pci') {
    return (
      <svg width={size} height={(size * 22) / 30} viewBox="0 0 30 22" fill="none" aria-hidden="true">
        <rect width="30" height="22" rx="3" fill="#0A3D91" />
        <text x="15" y="15" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fontWeight="700" fontStyle="italic" fill="#fff">PCI</text>
      </svg>
    )
  }
  if (id === 'bcm') {
    return (
      <svg width={size} height={(size * 26) / 30} viewBox="0 0 30 26" fill="none" aria-hidden="true">
        <path d="M15 1L27 13L15 25L3 13L15 1Z" fill="#5B6670" />
        <path d="M15 5.5L22.5 13L15 20.5L7.5 13L15 5.5Z" fill="#3E8FD6" />
      </svg>
    )
  }
  // BCAA
  return (
    <svg width={size} height={(size * 16) / 30} viewBox="0 0 30 16" fill="none" aria-hidden="true">
      <rect width="30" height="16" rx="2" fill="#0033A0" />
      <text x="15" y="11.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" fill="#fff">BCAA</text>
    </svg>
  )
}

export function ChevronLeft({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronDown({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Upload({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 6.66667L10 2.5L14.1667 6.66667M10 2.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckCircle({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="10" fill="#004040" />
      <path d="M5.83333 10.4167L8.75 13.3333L14.1667 7.08333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FilePdf({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3.4125 0C2.3625 0 1.5 0.8625 1.5 1.9125V22.0875C1.5 23.1375 2.3625 24 3.4125 24H20.5875C21.6375 24 22.5 23.1375 22.5 22.0875V7.6125L15.4125 0H3.4125Z" fill="#DE7356" />
      <path d="M22.5 7.64995V8.02495H17.7C17.7 8.02495 15.3375 7.53745 15.4125 5.51245C15.4125 5.51245 15.4875 7.64995 17.6625 7.64995H22.5Z" fill="#6B0D12" />
      <path opacity="0.5" d="M15.4125 0V5.475C15.4125 6.1125 15.825 7.65 17.7 7.65H22.5L15.4125 0Z" fill="white" />
      <path d="M7.08748 18.375H5.84998V19.9125C5.84998 20.0625 5.73748 20.175 5.54998 20.175C5.39998 20.175 5.28748 20.0625 5.28748 19.9125V16.0875C5.28748 15.8625 5.47498 15.675 5.69998 15.675H7.08748C7.98748 15.675 8.51248 16.3125 8.51248 17.025C8.51248 17.775 7.98748 18.375 7.08748 18.375ZM7.04998 16.1625H5.84998V17.8875H7.04998C7.57498 17.8875 7.94998 17.55 7.94998 17.025C7.94998 16.5 7.57498 16.1625 7.04998 16.1625ZM10.95 20.175H9.82498C9.59998 20.175 9.41248 19.9875 9.41248 19.7625V16.0875C9.41248 15.8625 9.59998 15.675 9.82498 15.675H10.95C12.3375 15.675 13.275 16.65 13.275 17.925C13.275 19.2 12.375 20.175 10.95 20.175ZM10.95 16.1625H9.97498V19.65H10.95C12.0375 19.65 12.675 18.8625 12.675 17.8875C12.7125 16.95 12.075 16.1625 10.95 16.1625ZM17.0625 16.1625H14.8875V17.625H17.025C17.175 17.625 17.25 17.7375 17.25 17.8875C17.25 18.0375 17.1375 18.1125 17.025 18.1125H14.8875V19.9125C14.8875 20.0625 14.775 20.175 14.5875 20.175C14.4375 20.175 14.325 20.0625 14.325 19.9125V16.0875C14.325 15.8625 14.5125 15.675 14.7375 15.675H17.0625C17.2125 15.675 17.2875 15.7875 17.2875 15.9375C17.325 16.05 17.2125 16.1625 17.0625 16.1625Z" fill="white" />
    </svg>
  )
}

export function Flower({ size = 43, ...props }) {
  return (
    <svg width={size} height={(size * 71) / 43} viewBox="0 0 43 71" fill="none" {...props}>
      <path d="M16.1145 15.8984C25.4233 34.5764 28.3645 56.5234 16.1145 68.5234" stroke="#004040" strokeWidth="3" strokeLinecap="round" />
      <path d="M40.3123 43.3877C40.4938 43.4032 40.5543 43.4474 40.5593 43.4512C40.5634 43.4542 40.5688 43.4589 40.5769 43.4707C40.5857 43.4836 40.6037 43.5149 40.6228 43.5752C40.764 44.0227 40.8091 44.722 40.6482 45.6973C40.4899 46.6566 40.1477 47.7935 39.6121 49.0576C38.5409 51.5855 36.7478 54.5059 34.3455 57.3623C32.0949 60.0382 27.6869 62.5617 23.6248 64.4609C22.561 64.9583 21.5387 65.4032 20.613 65.79C21.1195 65.0327 21.6803 64.1917 22.283 63.2959C24.7644 59.6079 27.9189 54.9713 30.6257 51.1543C33.2469 47.4581 36.0013 45.1048 38.0925 44.0352C39.1582 43.4901 39.9051 43.353 40.3123 43.3877Z" stroke="#004040" strokeWidth="3" strokeLinecap="round" />
      <circle cx="15" cy="15" r="15" fill="#DE7356" />
    </svg>
  )
}

export function EllipsisVertical({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99999C10.8334 9.53976 10.4603 9.16666 10 9.16666C9.53978 9.16666 9.16669 9.53976 9.16669 9.99999C9.16669 10.4602 9.53978 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4.99999C10.4603 4.99999 10.8334 4.6269 10.8334 4.16666C10.8334 3.70642 10.4603 3.33333 10 3.33333C9.53978 3.33333 9.16669 3.70642 9.16669 4.16666C9.16669 4.6269 9.53978 4.99999 10 4.99999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 16.6667C10.4603 16.6667 10.8334 16.2936 10.8334 15.8333C10.8334 15.3731 10.4603 15 10 15C9.53978 15 9.16669 15.3731 9.16669 15.8333C9.16669 16.2936 9.53978 16.6667 10 16.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Trash2({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M2.5 5.00001H17.5M15.8333 5.00001V16.6667C15.8333 17.5 15 18.3333 14.1667 18.3333H5.83333C5 18.3333 4.16667 17.5 4.16667 16.6667V5.00001M6.66667 5.00001V3.33334C6.66667 2.50001 7.5 1.66667 8.33333 1.66667H11.6667C12.5 1.66667 13.3333 2.50001 13.3333 3.33334V5.00001M8.33333 9.16667V14.1667M11.6667 9.16667V14.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Plus({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Camera({ size = 20, ...props }) {
  // White body over the orange send button, with an orange lens.
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12.4167 3H8.25L6.16667 5.5H3.66667C3.22464 5.5 2.80072 5.67559 2.48816 5.98816C2.17559 6.30072 2 6.72464 2 7.16667V14.6667C2 15.1087 2.17559 15.5326 2.48816 15.8452C2.80072 16.1577 3.22464 16.3333 3.66667 16.3333H17C17.442 16.3333 17.866 16.1577 18.1785 15.8452C18.4911 15.5326 18.6667 15.1087 18.6667 14.6667V7.16667C18.6667 6.72464 18.4911 6.30072 18.1785 5.98816C17.866 5.67559 17.442 5.5 17 5.5H14.5L12.4167 3Z" fill="white" />
      <path d="M10.3333 13C11.714 13 12.8333 11.8807 12.8333 10.5C12.8333 9.11929 11.714 8 10.3333 8C8.95262 8 7.83333 9.11929 7.83333 10.5C7.83333 11.8807 8.95262 13 10.3333 13Z" fill="#DE7356" />
    </svg>
  )
}

export function CameraOutline({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12.0834 3.33325H7.91669L5.83335 5.83325H3.33335C2.89133 5.83325 2.4674 6.00885 2.15484 6.32141C1.84228 6.63397 1.66669 7.05789 1.66669 7.49992V14.9999C1.66669 15.4419 1.84228 15.8659 2.15484 16.1784C2.4674 16.491 2.89133 16.6666 3.33335 16.6666H16.6667C17.1087 16.6666 17.5326 16.491 17.8452 16.1784C18.1578 15.8659 18.3334 15.4419 18.3334 14.9999V7.49992C18.3334 7.05789 18.1578 6.63397 17.8452 6.32141C17.5326 6.00885 17.1087 5.83325 16.6667 5.83325H14.1667L12.0834 3.33325Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 13.3333C11.3807 13.3333 12.5 12.214 12.5 10.8333C12.5 9.45254 11.3807 8.33325 10 8.33325C8.61931 8.33325 7.50002 9.45254 7.50002 10.8333C7.50002 12.214 8.61931 13.3333 10 13.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function XMark({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PenEdit({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M15.8805 5.10904C16.277 4.71261 16.4998 4.17489 16.4999 3.61418C16.4999 3.05347 16.2773 2.5157 15.8808 2.11917C15.4844 1.72263 14.9467 1.49983 14.386 1.49976C13.8253 1.49969 13.2875 1.72236 12.8909 2.11879L2.88145 12.1305C2.70732 12.3042 2.57854 12.5179 2.50645 12.753L1.5157 16.017C1.49632 16.0819 1.49485 16.1508 1.51146 16.2164C1.52807 16.2821 1.56214 16.342 1.61005 16.3898C1.65796 16.4376 1.71792 16.4716 1.78357 16.4881C1.84922 16.5046 1.91812 16.503 1.98295 16.4835L5.2477 15.4935C5.48258 15.4221 5.69633 15.2941 5.8702 15.1208L15.8805 5.10904Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Large filled check in a coral disc — used on the confirm bottom sheet.
export function CheckCircleLarge({ size = 70, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" fill="none" {...props}>
      <circle cx="35" cy="35" r="28" fill="#DE7356" />
      <path d="M24 35.5L31 42.5L46 26" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Mic({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4.16663 8.33335V10C4.16663 11.5471 4.78121 13.0308 5.87517 14.1248C6.96913 15.2188 8.45286 15.8334 9.99996 15.8334C11.5471 15.8334 13.0308 15.2188 14.1247 14.1248C15.2187 13.0308 15.8333 11.5471 15.8333 10V8.33335M9.99996 15.8334V18.3334M9.99996 1.66669C9.33692 1.66669 8.70103 1.93008 8.23219 2.39892C7.76335 2.86776 7.49996 3.50365 7.49996 4.16669V10C7.49996 10.6631 7.76335 11.2989 8.23219 11.7678C8.70103 12.2366 9.33692 12.5 9.99996 12.5C10.663 12.5 11.2989 12.2366 11.7677 11.7678C12.2366 11.2989 12.5 10.6631 12.5 10V4.16669C12.5 3.50365 12.2366 2.86776 11.7677 2.39892C11.2989 1.93008 10.663 1.66669 9.99996 1.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ImageIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M17.5 12.5L14.9283 9.92828C14.6158 9.61583 14.1919 9.44031 13.75 9.44031C13.3081 9.44031 12.8842 9.61583 12.5717 9.92828L5 17.5M4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5ZM9.16667 7.5C9.16667 8.42047 8.42047 9.16667 7.5 9.16667C6.57953 9.16667 5.83333 8.42047 5.83333 7.5C5.83333 6.57953 6.57953 5.83333 7.5 5.83333C8.42047 5.83333 9.16667 6.57953 9.16667 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Home({ size = 24, filled = false, ...props }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="currentColor" />
        <path d="M9 22V12H15V22" fill="currentColor" />
        <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MessageSquare({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function UserRound({ size = 24, filled = false, ...props }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z" fill="currentColor" />
        <path d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13ZM12 13C14.1217 13 16.1566 13.8429 17.6569 15.3431C19.1571 16.8434 20 18.8783 20 21M12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Settings({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10.1833 1.66667H9.81667C9.37464 1.66667 8.95072 1.84227 8.63816 2.15483C8.3256 2.46739 8.15 2.89131 8.15 3.33334V3.48334C8.1497 3.77561 8.07255 4.06266 7.92628 4.3157C7.78002 4.56874 7.56978 4.77887 7.31667 4.925L6.95834 5.13334C6.70497 5.27962 6.41756 5.35663 6.125 5.35663C5.83244 5.35663 5.54503 5.27962 5.29167 5.13334L5.16667 5.06667C4.78422 4.84606 4.32987 4.78621 3.90334 4.90026C3.47681 5.01432 3.11296 5.29295 2.89167 5.675L2.70833 5.99167C2.48772 6.37412 2.42787 6.82847 2.54192 7.255C2.65598 7.68153 2.93461 8.04538 3.31667 8.26667L3.44167 8.35001C3.69356 8.49543 3.90302 8.70425 4.04921 8.9557C4.1954 9.20715 4.27325 9.49248 4.275 9.78334V10.2083C4.27617 10.502 4.19971 10.7908 4.05337 11.0454C3.90703 11.3001 3.69601 11.5115 3.44167 11.6583L3.31667 11.7333C2.93461 11.9546 2.65598 12.3185 2.54192 12.745C2.42787 13.1715 2.48772 13.6259 2.70833 14.0083L2.89167 14.325C3.11296 14.7071 3.47681 14.9857 3.90334 15.0997C4.32987 15.2138 4.78422 15.154 5.16667 14.9333L5.29167 14.8667C5.54503 14.7204 5.83244 14.6434 6.125 14.6434C6.41756 14.6434 6.70497 14.7204 6.95834 14.8667L7.31667 15.075C7.56978 15.2211 7.78002 15.4313 7.92628 15.6843C8.07255 15.9373 8.1497 16.2244 8.15 16.5167V16.6667C8.15 17.1087 8.3256 17.5326 8.63816 17.8452C8.95072 18.1577 9.37464 18.3333 9.81667 18.3333H10.1833C10.6254 18.3333 11.0493 18.1577 11.3618 17.8452C11.6744 17.5326 11.85 17.1087 11.85 16.6667V16.5167C11.8503 16.2244 11.9275 15.9373 12.0737 15.6843C12.22 15.4313 12.4302 15.2211 12.6833 15.075L13.0417 14.8667C13.295 14.7204 13.5824 14.6434 13.875 14.6434C14.1676 14.6434 14.455 14.7204 14.7083 14.8667L14.8333 14.9333C15.2158 15.154 15.6701 15.2138 16.0967 15.0997C16.5232 14.9857 16.887 14.7071 17.1083 14.325L17.2917 14C17.5123 13.6176 17.5721 13.1632 17.4581 12.7367C17.344 12.3101 17.0654 11.9463 16.6833 11.725L16.5583 11.6583C16.304 11.5115 16.093 11.3001 15.9466 11.0454C15.8003 10.7908 15.7238 10.502 15.725 10.2083V9.79167C15.7238 9.49799 15.8003 9.20921 15.9466 8.95458C16.093 8.69995 16.304 8.48851 16.5583 8.34167L16.6833 8.26667C17.0654 8.04538 17.344 7.68153 17.4581 7.255C17.5721 6.82847 17.5123 6.37412 17.2917 5.99167L17.1083 5.675C16.887 5.29295 16.5232 5.01432 16.0967 4.90026C15.6701 4.78621 15.2158 4.84606 14.8333 5.06667L14.7083 5.13334C14.455 5.27962 14.1676 5.35663 13.875 5.35663C13.5824 5.35663 13.295 5.27962 13.0417 5.13334L12.6833 4.925C12.4302 4.77887 12.22 4.56874 12.0737 4.3157C11.9275 4.06266 11.8503 3.77561 11.85 3.48334V3.33334C11.85 2.89131 11.6744 2.46739 11.3618 2.15483C11.0493 1.84227 10.6254 1.66667 10.1833 1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Plain checkmark (no circle) — used for the AI-review analysis checklist.
export function Check({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ExternalLink({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M14 6V2H10M14 2L6.66667 9.33333M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Rightward arrow used between the before/after scores on the completed screen.
export function MoveRight({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M18 16L22 12L18 8M22 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Flame mark shown on the Wildfire Risk Report score card.
export function Fire({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path opacity="0.5" d="M12.8324 21.8013C15.9583 21.1747 20 18.926 20 13.1112C20 7.8196 16.1267 4.29593 13.3415 2.67685C12.7235 2.31757 12 2.79006 12 3.50492V5.3334C12 6.77526 11.3938 9.40711 9.70932 10.5018C8.84932 11.0607 7.92052 10.2242 7.816 9.20388L7.73017 8.36604C7.6304 7.39203 6.63841 6.80075 5.85996 7.3946C4.46147 8.46144 3 10.3296 3 13.1112C3 20.2223 8.28889 22.0001 10.9333 22.0001C11.0871 22.0001 11.2488 21.9955 11.4171 21.9858C11.863 21.9296 11.4171 22.085 12.8324 21.8013Z" fill="#DE7356" />
      <path d="M7.99997 18.4442C7.99997 21.064 10.1113 21.8742 11.4171 21.9858C11.863 21.9296 11.4171 22.085 12.8324 21.8013C13.871 21.4343 15 20.4922 15 18.4442C15 17.1465 14.1814 16.3459 13.5401 15.9711C13.3439 15.8564 13.1161 16.0008 13.0985 16.2273C13.0429 16.9454 12.3534 17.5174 11.8836 16.9714C11.4685 16.4889 11.2941 15.784 11.2941 15.3331V14.7439C11.2941 14.3887 10.9365 14.1533 10.631 14.3346C9.49504 15.0085 7.99997 16.3949 7.99997 18.4442Z" fill="#DE7356" />
    </svg>
  )
}

export function CircleHelp({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M7.57483 7.50006C7.77075 6.94311 8.15746 6.47348 8.66646 6.17433C9.17546 5.87519 9.77391 5.76584 10.3558 5.86565C10.9377 5.96546 11.4655 6.26799 11.8457 6.71966C12.2259 7.17133 12.434 7.74299 12.4332 8.33339C12.4332 10.0001 9.93316 10.8334 9.93316 10.8334M9.99996 14.1667H10.0083M18.3333 9.99999C18.3333 14.6024 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6024 1.66663 9.99999C1.66663 5.39762 5.39759 1.66666 9.99996 1.66666C14.6023 1.66666 18.3333 5.39762 18.3333 9.99999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
