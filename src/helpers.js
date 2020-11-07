export function getScrolledDownPercentage () {
  // get how much scrolled down
  const scrollY = Math.round(window.pageYOffset)
      
  // get scroll height
  const scrollHeight = window.document.body.scrollHeight

  // get window height
  const screenHeight = window.innerHeight

  // window height + scrolled down + scroll height
  
  const percentage = Math.round((scrollY + screenHeight) / scrollHeight * 100)

  return percentage
}