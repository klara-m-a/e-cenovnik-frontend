// This file creates placeholder logos for stores
// In a real application, you would use actual logos stored in your public folder

const createPlaceholderLogo = (storeName) => {
    // Get initials from store name
    const initials = storeName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  
    // Generate a deterministic color based on the store name
    const getColor = (str) => {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
  
      const hue = hash % 360
      return `hsl(${hue}, 70%, 60%)`
    }
  
    const backgroundColor = getColor(storeName)
  
    // Create SVG
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="${backgroundColor}" />
        <text x="50" y="50" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">
          ${initials}
        </text>
      </svg>
    `
  
    // Convert SVG to data URL
    const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`
  
    return dataUrl
  }
  
  export default createPlaceholderLogo
  