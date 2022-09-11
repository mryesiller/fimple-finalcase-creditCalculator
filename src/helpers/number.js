export const convertToFixed = (item, fixedStep) => {
  switch (typeof item) {
    case "string":
      return Number.isNaN(item) ? item : Number(item).toFixed(fixedStep)
    case "number":
      return item.toFixed(fixedStep)
    case "object":
      // If array
      if (item.length) {
        return item.map((item) => convertToFixed(item, fixedStep))
      }
      // If object
      return Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key,
          convertToFixed(value, fixedStep),
        ])
      )
    default:
      break
  }
}
