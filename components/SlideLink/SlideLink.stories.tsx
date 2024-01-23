import React from 'react'
import { Stack } from '@/components/Base/Core'
import { theme } from '@/theme/index'

import { SlideLink } from './SlideLink'

export default {
  component: SlideLink,
  title: 'Components/SlideLink',
}

export const withDefaultProps = () => <SlideLink>This is a SlideLink</SlideLink>

export const withDifferentColours = () => {
  const excludedItems = ['grayscale', 'accent', 'black', 'white', 'background', 'foreground', 'guidance']
  const colours = Object.keys(theme.colors).filter((o) => excludedItems.indexOf(o) === -1)
  return (
    <Stack space={3}>
      {colours.map((c) => (
        <SlideLink slideColor={c} key={c}>
          This is a SlideLink
        </SlideLink>
      ))}
    </Stack>
  )
}

export const withDifferentFontSizes = () => {
  const fontSizes = [...theme.fontSizes]
  return (
    <Stack space={3} alignItems='flex-start'>
      {fontSizes.map((fs) => (
        <SlideLink fontSize={fs} key={fs}>
          This is a SlideLink
        </SlideLink>
      ))}
    </Stack>
  )
}

export const withWrapping = () => (
  <Stack width={200}>
    <SlideLink fontSize={5}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, risus vel blandit sodales, lorem nunc
      mattis velit, et convallis dui tortor quis nulla. Vivamus at ex vel magna consequat egestas.
    </SlideLink>
  </Stack>
)
