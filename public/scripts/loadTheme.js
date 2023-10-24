const LS_KEY = 'theme'
let theme = 'light'

const isValidTheme = (theme) =>
  theme !== null && ['light', 'dark'].includes(theme)

const item = window.localStorage.getItem(LS_KEY)
if (isValidTheme(item)) {
  theme = item
} else {
  window.localStorage.removeItem(LS_KEY)
}

const body = document.querySelector('body')
if (body !== null) {
  body.dataset.theme = theme
}
