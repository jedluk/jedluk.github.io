type Theme = 'dark' | 'light'
const LS_KEY = 'theme'

const isValidTheme = (theme: string | null): theme is Theme =>
  theme !== null && ['light', 'dark'].includes(theme)

const item = window.localStorage.getItem(LS_KEY)
let theme: Theme = 'light'
if (isValidTheme(item)) {
  theme = item
} else {
  window.localStorage.removeItem(LS_KEY)
}

const body = document.querySelector('body')
if (body !== null) {
  body.dataset.theme = theme
}
