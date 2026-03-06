import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#020617',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Accent border line */}
        <div
          style={{
            position: 'absolute',
            top: '56px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: '#1e293b',
          }}
        />

        {/* Text block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#f1f5f9',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
          >
            Brian Woodson
          </span>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 400,
              color: '#94a3b8',
              letterSpacing: '0px',
            }}
          >
            Websites for Small Businesses
          </span>
        </div>

        {/* Accent border line */}
        <div
          style={{
            position: 'absolute',
            bottom: '56px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: '#1e293b',
          }}
        />
      </div>
    ),
    size,
  )
}
