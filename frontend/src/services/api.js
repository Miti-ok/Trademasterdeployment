import axios from 'axios'

const DEFAULT_PROD_API_BASE_URL = 'https://trademasterdeployment-production.up.railway.app'

const resolveBaseUrl = () => {
  const envBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim()
  if (envBaseUrl) {
    return envBaseUrl
  }

  if (import.meta.env.PROD) {
    return DEFAULT_PROD_API_BASE_URL
  }

  return 'http://localhost:8000'
}

const api = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 120000
})

const unwrap = (response) => {
  if (!response?.data?.success) {
    const apiError = response?.data?.error
    const message =
      typeof apiError === 'string' ? apiError : apiError?.message || 'Unexpected API response'
    throw new Error(message)
  }
  return response.data
}

export const analyzeProduct = async (payload, options = {}) => {
  const apiKey = String(options?.apiKey || '').trim()
  const requestConfig = apiKey
    ? {
        headers: {
          'X-GROQ-API-KEY': apiKey
        }
      }
    : undefined

  const response = await api.post('/analyze', payload, requestConfig)
  return unwrap(response)
}

export const recalculateTariffs = async (payload) => {
  const response = await api.post('/recalculate', payload)
  return unwrap(response)
}

export const generateReport = async (payload) => {
  const response = await api.post('/generate-report', payload)
  return unwrap(response)
}

export default api
