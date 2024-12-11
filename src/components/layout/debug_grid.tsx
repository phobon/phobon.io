'use client'

import React, { useState } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'

import { css, cva } from '@/design/css'
import { ColumnsIcon } from '@radix-ui/react-icons'

const DebugGrid = ({ show: initialShow = false }) => {
  const smallDevice = useMediaQuery('only screen and (max-width: 768px)')
  const columns = new Array(smallDevice ? 6 : 12).fill(0)
  const [show, setShow] = useState(initialShow)

  return (
    <>
      {show ? (
        <aside
          className={css({
            display: 'grid',
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 9999999,
            inset: 0,
            pointerEvents: 'none',
            gridTemplateRows: '1fr',
            gridTemplateColumns: 'repeat(6, 1fr)',
            opacity: 0.1,
            md: {
              gridTemplateColumns: 'repeat(12, 1fr)',
            },
          })}
        >
          {columns.map((_, i) => {
            const key = `debug__grid--${i}`
            return <Column alternate={i % 2 === 0} key={key} />
          })}
        </aside>
      ) : null}

      <button
        type='button'
        className={css({
          position: 'fixed',
          left: 0,
          bottom: 0,
          cursor: 'pointer',
          zIndex: 99999,
          background: 'transparent',
          border: 'none',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
        onClick={() => setShow((s) => !s)}
      >
        <ColumnsIcon />
      </button>
    </>
  )
}

const Column = ({ alternate, ...props }: any) => {
  return (
    <div
      className={columnStyle({
        alternate,
      })}
    />
  )
}

const columnStyle = cva({
  base: {
    width: '100%',
    height: '100%',
  },
  variants: {
    alternate: {
      true: {
        background: '#f00',
      },
      false: {
        background: '#000',
      },
    },
  },
  defaultVariants: {
    alternate: false,
  },
})

export default DebugGrid
