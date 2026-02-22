import { useEffect, useMemo, useState } from 'react'
import { clearBrowserApiKey, getBrowserApiKey, saveBrowserApiKey } from '../utils/browserApiKey.js'

const maskKey = (key) => {
  const value = String(key || '').trim()
  if (value.length <= 8) {
    return value ? '********' : ''
  }
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

export default function BrowserApiKeyPanel({ onApiKeyChange }) {
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [savedKey, setSavedKey] = useState('')

  useEffect(() => {
    const existing = getBrowserApiKey()
    setApiKeyInput(existing)
    setSavedKey(existing)
    onApiKeyChange?.(existing)
  }, [onApiKeyChange])

  const hasSavedKey = useMemo(() => Boolean(savedKey), [savedKey])

  const handleSave = () => {
    saveBrowserApiKey(apiKeyInput)
    const next = getBrowserApiKey()
    setSavedKey(next)
    setApiKeyInput(next)
    onApiKeyChange?.(next)
  }

  const handleClear = () => {
    clearBrowserApiKey()
    setSavedKey('')
    setApiKeyInput('')
    onApiKeyChange?.('')
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="section-title">API Key (Browser-Only)</h3>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            Paste your Groq/OpenAI-compatible key before starting a new analysis.
          </p>
        </div>
        {hasSavedKey && (
          <span className="rounded-full border border-[color:var(--border-mid)] px-3 py-1 text-xs text-[color:var(--text-muted)]">
            Saved: {maskKey(savedKey)}
          </span>
        )}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          className="input"
          type="password"
          value={apiKeyInput}
          onChange={(event) => setApiKeyInput(event.target.value)}
          placeholder="Paste API key (e.g., gsk_...)"
          autoComplete="off"
          spellCheck={false}
        />
        <button className="button-secondary" type="button" onClick={handleSave}>
          Save in Browser
        </button>
        <button className="button-secondary" type="button" onClick={handleClear}>
          Clear
        </button>
      </div>

      <p className="mt-3 text-xs text-[color:var(--text-muted)]">
        Your key is stored only in this browser using local storage, and is sent only with analysis requests.
      </p>
    </div>
  )
}
