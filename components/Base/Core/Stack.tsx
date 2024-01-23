import styled from '@emotion/styled'
import { compose, get, system, ResponsiveValue, ThemeValue, RequiredTheme, ObjectOrArray } from 'styled-system'

import { BoxProps, boxSystem } from './Box'

import { containerStyles } from './containerProps'

const isNumber = (n: any) => typeof n === 'number' && !isNaN(n)

const getMargin = (n: any, scale: ObjectOrArray<string | number, string | number | symbol>, props: any): any => {
  if (!isNumber(n)) {
    return get(scale, n, n)
  }

  const { flexDirection } = props

  const isNegative = n < 0
  const absolute = Math.abs(n)
  const value = get(scale, absolute, absolute)
  if (!isNumber(value)) {
    return isNegative ? `-${value}` : value
  }

  const r = {}
  const v = value * (isNegative ? -1 : 1)
  r[flexDirection === 'row' ? 'marginLeft' : 'marginTop'] = v
  return r
}

// Casting this as any to get around styled-system TS definitions not being correct
const space: any = {
  property: '> * + *',
  scale: 'space',
  transform: getMargin,
}
const stackSpace = system({ space })

export const stackSystem = compose(stackSpace, boxSystem)

export interface IStackProps {
  space?: ResponsiveValue<ThemeValue<'space', RequiredTheme>>
}

export type StackProps = IStackProps & BoxProps

export const Stack = styled('div')<StackProps>(
  {
    display: 'flex',
    flexDirection: 'column',
  },
  containerStyles,
  stackSystem,
)

Stack.displayName = 'Stack'

Stack.defaultProps = {
  space: 0,
}
