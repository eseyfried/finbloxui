export const CheckedState = Boolean | 'indeterminate'
export const Direction = 'ltr' | 'rtl'

export const ITEM_NAME = 'MenuItem'
export const ITEM_SELECT = 'menu.itemSelect'
export const SELECTION_KEYS = ['Enter', ' ']
export const FIRST_KEYS = ['ArrowDown', 'PageUp', 'Home']
export const LAST_KEYS = ['ArrowUp', 'PageDown', 'End']
export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]
export const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, 'ArrowRight'],
  rtl: [...SELECTION_KEYS, 'ArrowLeft'],
}
export const SUB_CLOSE_KEYS = {
  ltr: ['ArrowLeft'],
  rtl: ['ArrowRight'],
}

export function getOpenState(open) {
  return open ? 'open' : 'closed'
}

export function isIndeterminate(
  checked
) {
  return checked === 'indeterminate'
}

export function getCheckedState(checked) {
  return isIndeterminate(checked)
    ? 'indeterminate'
    : checked
      ? 'checked'
      : 'unchecked'
}

export function focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement
  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return
    candidate.focus()
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return
  }
}

export const Point = {
  x: null,
  y: null
}
export const Polygon = []
export const Side = 'left' | 'right'
export const GraceIntent = {
  area: null,
  side: null
}

// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
export function isPointInPolygon(point, polygon) {
  const { x, y } = point
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y

    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect)
      inside = !inside
  }

  return inside
}

export function isPointerInGraceArea(event, area) {
  if (!area)
    return false
  const cursorPos = { x: event.clientX, y: event.clientY }
  return isPointInPolygon(cursorPos, area)
}

export function isMouseEvent(event) {
  return event.pointerType === 'mouse'
}