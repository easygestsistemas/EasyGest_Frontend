import { useEffect, useRef, useState } from 'react'
import { ACCESSIBILITY_MODES } from '../../utils/accessibility'
import { Badge } from '../Common'
import useAccessibility from './useAccessibility'
import './AccessibilityWidget.css'

export default function AccessibilityWidget() {
  const {
    settings,
    hasUnsavedChanges,
    updateSettings,
    saveSettings,
    saveMessage
  } = useAccessibility()
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.querySelector('select')?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div className="a11y-profile-settings">
      <button
        ref={triggerRef}
        className="a11y-profile-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'a11y-profile-panel' : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="7.5" r="1.25" />
          <path d="M7.5 10.5h9M12 10.5v8m0-4-3 4m3-4 3 4" />
        </svg>
        <span>{isOpen ? 'Fechar' : 'Acessibilidade'}</span>
      </button>

      {isOpen && (
        <section
          ref={panelRef}
          className="a11y-profile-panel"
          id="a11y-profile-panel"
          aria-labelledby="a11y-profile-title"
        >
          <h4 id="a11y-profile-title">Preferências de cores</h4>
          <p className="a11y-profile-description">
            As paletas ajustam as cores de status e gráficos, sem trocar as cores
            principais do layout. Os status também usam símbolos e rótulos.
          </p>

          <div className="a11y-palette-preview" aria-label="Prévia das cores de status">
            <Badge status="success">Normal</Badge>
            <Badge status="warning">Atenção</Badge>
            <Badge status="danger">Crítico</Badge>
            <Badge status="info">Informação</Badge>
          </div>

          <label className="a11y-profile-label" htmlFor="a11y-profile-vision">
            Paleta para percepção de cores
          </label>
          <select
            id="a11y-profile-vision"
            value={settings.vision}
            onChange={(event) => updateSettings({ vision: event.target.value })}
          >
            {ACCESSIBILITY_MODES.map((mode) => (
              <option key={mode.value} value={mode.value}>{mode.label}</option>
            ))}
          </select>

          <label className="a11y-profile-contrast">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(event) => updateSettings({ highContrast: event.target.checked })}
            />
            <span>Alto contraste</span>
          </label>

          <button
            className="a11y-profile-save"
            type="button"
            onClick={saveSettings}
            disabled={!hasUnsavedChanges}
          >
            Salvar preferências
          </button>

          <p className="a11y-profile-note">
            As alterações são aplicadas para pré-visualização. Clique em Salvar
            preferências para mantê-las neste navegador para seu usuário; elas não
            são sincronizadas com outros dispositivos.
          </p>
          {saveMessage && <p className="a11y-profile-status" role="status">{saveMessage}</p>}
        </section>
      )}
    </div>
  )
}
