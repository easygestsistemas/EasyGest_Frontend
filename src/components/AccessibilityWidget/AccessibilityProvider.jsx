import { useMemo, useState, useEffect } from 'react'
import { ACCESSIBILITY_MODES, getAccessibilityPalette } from '../../utils/accessibility'
import { AccessibilityContext } from './AccessibilityContext'

const STORAGE_PREFIX = 'easygest.accessibility.preferences.v2:'
const DEFAULT_SETTINGS = { vision: 'standard', highContrast: false }

function getStorageKey(username) {
  return `${STORAGE_PREFIX}${encodeURIComponent(username)}`
}

function loadSettings(username) {
  if (!username) {
    return DEFAULT_SETTINGS
  }

  try {
    const saved = window.localStorage.getItem(getStorageKey(username))
    if (!saved) {
      return DEFAULT_SETTINGS
    }

    const parsed = JSON.parse(saved)
    return {
      vision: ACCESSIBILITY_MODES.some((mode) => mode.value === parsed.vision)
        ? parsed.vision
        : DEFAULT_SETTINGS.vision,
      highContrast: typeof parsed.highContrast === 'boolean'
        ? parsed.highContrast
        : DEFAULT_SETTINGS.highContrast
    }
  } catch (error) {
    console.warn('Não foi possível carregar as preferências de acessibilidade.', error)
    return DEFAULT_SETTINGS
  }
}

export default function AccessibilityProvider({ username, children }) {
  const [settings, setSettings] = useState(() => loadSettings(username))
  const [savedSettings, setSavedSettings] = useState(() => loadSettings(username))
  const [saveMessage, setSaveMessage] = useState('')
  const palette = useMemo(
    () => getAccessibilityPalette(settings.vision, settings.highContrast),
    [settings.vision, settings.highContrast]
  )
  const hasUnsavedChanges = settings.vision !== savedSettings.vision
    || settings.highContrast !== savedSettings.highContrast

  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) {
      return undefined
    }

    root.dataset.a11yPalette = palette.theme
    root.dataset.a11yHighContrast = String(settings.highContrast)

    return () => {
      delete root.dataset.a11yPalette
      delete root.dataset.a11yHighContrast
    }
  }, [palette.theme, settings.highContrast])

  const updateSettings = (changes) => {
    setSettings((current) => ({ ...current, ...changes }))
    setSaveMessage('')
  }

  const saveSettings = () => {
    if (!username) {
      setSaveMessage('Entre novamente para salvar preferências associadas ao seu usuário.')
      return
    }

    try {
      window.localStorage.setItem(getStorageKey(username), JSON.stringify(settings))
      setSavedSettings(settings)
      setSaveMessage(`Preferências salvas neste navegador para ${username}.`)
    } catch (error) {
      console.error('Não foi possível salvar as preferências de acessibilidade.', error)
      setSaveMessage('Não foi possível salvar. Verifique as permissões de armazenamento do navegador.')
    }
  }

  const value = {
    settings,
    palette,
    hasUnsavedChanges,
    saveMessage,
    updateSettings,
    saveSettings
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}
