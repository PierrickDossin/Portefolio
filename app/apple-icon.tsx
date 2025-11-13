import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
 
export const contentType = 'image/png'
 
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 140,
          background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '40px',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 5H21"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="7" cy="12" r="1.5" fill="white" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
          <circle cx="17" cy="12" r="1.5" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
