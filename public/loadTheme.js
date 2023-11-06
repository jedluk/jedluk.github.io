const LS_KEY = 'theme'

const item = window.localStorage.getItem(LS_KEY)
const isDarkPreffered =
  item === null && window.matchMedia('(prefers-color-scheme: dark)').matches

if (item === 'dark' || isDarkPreffered) {
  document.querySelector('body').classList.add('dark')
}
