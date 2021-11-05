export function backTracking(end) {
  const tracking = []
  let dummy = end
  while (dummy) {
    tracking.unshift(dummy)
    dummy = dummy.previousCell
  }
  return tracking
}