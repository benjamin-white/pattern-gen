import { useEffect, useState } from 'react'
import drawingsMap, {
  type DrawingsMap,
  type DrawingEntry,
} from '../config/drawings-map'
import { DrawScriptType } from './useDraw'

const getEntryByPathElement = (
  currentEntry: DrawingsMap,
  slug: string,
): DrawingsMap | DrawingEntry | undefined => {
  const partBySlug = currentEntry.find((entry) => entry.slug === slug)
  return partBySlug?.children ?? partBySlug
}

const getScriptByPath = (
  path: string,
  entries: DrawingsMap,
): DrawScriptType | false => {
  const pathElements = path.split('/').filter(Boolean)
  let currentpart: DrawingsMap | DrawingEntry = entries

  for (const index in pathElements) {
    if (Array.isArray(currentpart)) {
      currentpart = getEntryByPathElement(currentpart, pathElements[index])
    }
  }

  return currentpart && 'script' in currentpart && currentpart.script
}

const useLoadDrawScript = () => {
  const [drawing, setDrawing] = useState(null)

  useEffect(() => {
    const drawScript = getScriptByPath(window.location.pathname, drawingsMap)
    if (!drawScript) return

    setDrawing(() => drawScript)
  })

  return drawing
}

export default useLoadDrawScript
