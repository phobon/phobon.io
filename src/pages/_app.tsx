import { useRef } from 'react'
import Header from '@/config'
import '@/design/index'
import { css } from '@/design/index'
import { GlobalCanvas } from '@14islands/r3f-scroll-rig'

const App = ({ Component, pageProps = { title: 'index' } }) => {
  const ref = useRef()
  return (
    <>
      <Header title={pageProps.title} />
      <main className={mainStyles()} ref={ref}>
        <GlobalCanvas
          eventSource={ref}
          eventPrefix='client'
          style={{
            pointerEvents: 'none',
          }}>
          <ambientLight />
        </GlobalCanvas>

        <Component {...pageProps} />
      </main>
    </>
  )
}

const mainStyles = css({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: '$2',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
})

export default App
