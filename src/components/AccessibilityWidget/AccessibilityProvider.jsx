import { useMemo, useState, useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ACCESSIBILITY_MODES, getAccessibilityPalette, UI_SCALE_OPTIONS } from '../../utils/accessibility'
import { AccessibilityContext } from './AccessibilityContext'

const STORAGE_PREFIX = 'easygest.accessibility.preferences.v2:'
const DEFAULT_SETTINGS = { vision: 'standard', highContrast: false }
const UI_SCALE_STORAGE_KEY = 'easygest.accessibility.ui-scale.v1'

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

function loadUiScale() {
  try {
    const storedScale = Number(window.localStorage.getItem(UI_SCALE_STORAGE_KEY))
    return UI_SCALE_OPTIONS.some((option) => option.value === storedScale)
      ? storedScale
      : 1
  } catch (error) {
    console.warn('Não foi possível carregar a escala de interface.', error)
    return 1
  }
}

export default function AccessibilityProvider({ username, children }) {
  const { pathname } = useLocation()
  const [settings, setSettings] = useState(() => loadSettings(username))
  const [savedSettings, setSavedSettings] = useState(() => loadSettings(username))
  const [saveMessage, setSaveMessage] = useState('')
  const [uiScale, setUiScale] = useState(loadUiScale)
  const [uiScaleMessage, setUiScaleMessage] = useState('')
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

  useLayoutEffect(() => {
    const root = document.documentElement
    const isErpRoute = pathname === '/app' || pathname.startsWith('/app/')

    if (!isErpRoute || uiScale === 1) {
      delete root.dataset.uiScaleActive
      root.style.removeProperty('--app-ui-scale')
      return undefined
    }

    root.dataset.uiScaleActive = 'true'
    root.style.setProperty('--app-ui-scale', String(uiScale))

    return () => {
      delete root.dataset.uiScaleActive
      root.style.removeProperty('--app-ui-scale')
    }
  }, [pathname, uiScale])

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

  const updateUiScale = (nextScale) => {
    if (!UI_SCALE_OPTIONS.some((option) => option.value === nextScale)) {
      throw new RangeError(`Escala de interface inválida: ${nextScale}`)
    }

    setUiScale(nextScale)
    setUiScaleMessage('')

    try {
      window.localStorage.setItem(UI_SCALE_STORAGE_KEY, String(nextScale))
    } catch (error) {
      console.error('Não foi possível salvar a escala de interface.', error)
      setUiScaleMessage('A escala foi aplicada nesta sessão, mas não pôde ser salva neste navegador.')
    }
  }

  const resetUiScale = () => updateUiScale(1)

  const value = {
    settings,
    palette,
    uiScale,
    uiScaleMessage,
    hasUnsavedChanges,
    saveMessage,
    updateSettings,
    updateUiScale,
    resetUiScale,
    saveSettings
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}
