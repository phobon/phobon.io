import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

export const id = 'opengraph-image'
export const size = { width: 1200, height: 630 }
export const alt = 'Ben McCormick - Creative Developer'
export const contentType = 'image/png'

export default async function Image() {
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://phobon.io'
  const src = `${host}/images/og.png`
  const geist = fetch(new URL('../../public/fonts/Geist-Regular.otf', import.meta.url)).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width='100%' height='100%' alt={alt} />
        <div
          style={{
            position: 'absolute',
            fontSize: 72,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            padding: '24px 48px',
            color: 'white',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Ben McCormick</span>
          <span>Creative Developer</span>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'geist',
          data: await geist,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
