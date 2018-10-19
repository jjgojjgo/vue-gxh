function setRem () {
  let htmlDom = document.getElementsByTagName('html').item(0)
  let innerWidth = document.documentElement.clientWidth
  htmlDom.style.fontSize = innerWidth / 10 + 'px'
}

setRem()

window.addEventListener('resize', () => {
  console.log('in window resize')
  setRem()
})
