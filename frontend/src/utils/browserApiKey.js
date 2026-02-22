const STORAGE_KEY = 'trade_ai_browser_api_key'

const canUseStorage = () => typeof window !== 'undefined' && !!window.localStorage

export const getBrowserApiKey = () => {
  if (!canUseStorage()) {
    return ''
  }
  return window.localStorage.getItem(STORAGE_KEY) || ''
}

export const saveBrowserApiKey = (apiKey) => {
  if (!canUseStorage()) {
    return
  }

  const normalized = String(apiKey || '').trim()
  if (!normalized) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }

  window.localStorage.setItem(STORAGE_KEY, normalized)
}

export const clearBrowserApiKey = () => {
  if (!canUseStorage()) {
    return
  }
  window.localStorage.removeItem(STORAGE_KEY)
}
