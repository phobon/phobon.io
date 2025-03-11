import { useEffect, useState } from 'react'

export enum BrowserOS {
  Windows = 'Windows',
  MacOS = 'MacOS',
  UNIX = 'UNIX',
  Linux = 'Linux',
  Unknown = 'Unknown',
  Any = 'Any',
}

export const useDetectOS = () => {
  const [os, setOs] = useState<BrowserOS>(() => BrowserOS.MacOS)
  // "Windows"    for all versions of Windows
  // "MacOS"      for all versions of Macintosh OS
  // "Linux"      for all versions of Linux
  // "UNIX"       for all other UNIX flavors
  // "Unknown"    indicates failure to detect the OS

  // We want to use a useEffect here so that we can use the navigator in a SSR context
  useEffect(() => {
    const appVersion = navigator.appVersion
    if (appVersion.indexOf('Win') != -1) {
      setOs(BrowserOS.Windows)
    } else if (appVersion.indexOf('Mac') != -1) {
      setOs(BrowserOS.MacOS)
    } else if (appVersion.indexOf('X11') != -1) {
      setOs(BrowserOS.UNIX)
    } else if (appVersion.indexOf('Linux') != -1) {
      setOs(BrowserOS.Linux)
    } else {
      setOs(BrowserOS.Unknown)
    }
  }, [])

  return os
}
