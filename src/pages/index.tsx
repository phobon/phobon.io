import { Header } from '@/components/header'
import { css } from '@/design'
import { ScrollScene, SmoothScrollbar, UseCanvas } from '@14islands/r3f-scroll-rig'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

const WebGLBlob = dynamic(() => import('@/components/blob'), { ssr: false })

const Blob = () => {
  const trackRef = useRef<any>()
  return (
    <>
      <div ref={trackRef} style={{ width: 300, height: 300 }} />
      <UseCanvas>
        <ScrollScene track={trackRef}>{(scrollProps) => <WebGLBlob {...scrollProps} />}</ScrollScene>
      </UseCanvas>
    </>
  )
}

const HomePage = (props) => {
  return (
    <>
      <Header />
      <SmoothScrollbar>
        {(bind) => (
          <section {...bind} className={containerStyles()}>
            <Blob />
          </section>
        )}
      </SmoothScrollbar>
    </>
  )
}

export const getStaticProps = async () => {
  return { props: { title: 'Index' } }
}

const containerStyles = css({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export default HomePage
