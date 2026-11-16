export const ACCESSIBILITY_MODES = [
  { value: 'standard', label: 'Cores padrão' },
  { value: 'protanopia', label: 'Paleta para protanopia (azul e laranja)' },
  { value: 'protanomaly', label: 'Paleta para protanomalia (azul e laranja)' },
  { value: 'deuteranopia', label: 'Paleta para deuteranopia (azul e laranja)' },
  { value: 'deuteranomaly', label: 'Paleta para deuteranomalia (azul e laranja)' },
  { value: 'tritanopia', label: 'Paleta para tritanopia (verde-azulado e roxo)' },
  { value: 'tritanomaly', label: 'Paleta para tritanomalia (verde-azulado e roxo)' },
  { value: 'achromatopsia', label: 'Tons de cinza com símbolos reforçados' },
  { value: 'achromatomaly', label: 'Tons de cinza com símbolos reforçados' }
]

const PALETTES = {
  standard: {
    theme: 'standard',
    successText: '#065F46',
    successBackground: '#D1FAE5',
    warningText: '#92400E',
    warningBackground: '#FEF3C7',
    dangerText: '#7F1D1D',
    dangerBackground: '#FEE2E2',
    infoText: '#0C4A6E',
    infoBackground: '#DBEAFE',
    chartPrimary: '#8FB3E2',
    chartPrimaryFill: 'rgba(143, 179, 226, 0.16)',
    chartSecondary: '#EF4444'
  },
  'red-green': {
    theme: 'red-green',
    successText: '#005A8B',
    successBackground: '#E1F2FA',
    warningText: '#744800',
    warningBackground: '#FFF0D1',
    dangerText: '#8A3C00',
    dangerBackground: '#FCE4D6',
    infoText: '#005A8B',
    infoBackground: '#E1F2FA',
    chartPrimary: '#0072B2',
    chartPrimaryFill: 'rgba(0, 114, 178, 0.16)',
    chartSecondary: '#D55E00'
  },
  'blue-yellow': {
    theme: 'blue-yellow',
    successText: '#00664F',
    successBackground: '#DDF3EC',
    warningText: '#763F7A',
    warningBackground: '#F5E6F5',
    dangerText: '#8B3A2D',
    dangerBackground: '#F8E3DD',
    infoText: '#245B64',
    infoBackground: '#E0F1F2',
    chartPrimary: '#009E73',
    chartPrimaryFill: 'rgba(0, 158, 115, 0.16)',
    chartSecondary: '#CC79A7'
  },
  monochrome: {
    theme: 'monochrome',
    successText: '#111111',
    successBackground: '#E5E5E5',
    warningText: '#222222',
    warningBackground: '#F2F2F2',
    dangerText: '#000000',
    dangerBackground: '#D0D0D0',
    infoText: '#333333',
    infoBackground: '#F7F7F7',
    chartPrimary: '#222222',
    chartPrimaryFill: 'rgba(34, 34, 34, 0.12)',
    chartSecondary: '#777777'
  }
}

export function getAccessibilityPalette(mode = 'standard', highContrast = false) {
  let palette
  if (mode.startsWith('protan') || mode.startsWith('deuteran')) {
    palette = PALETTES['red-green']
  } else if (mode.startsWith('tritan')) {
    palette = PALETTES['blue-yellow']
  } else if (mode.startsWith('achromat')) {
    palette = PALETTES.monochrome
  } else {
    palette = PALETTES.standard
  }

  if (!highContrast) {
    return palette
  }

  return {
    ...palette,
    chartPrimary: '#000000',
    chartPrimaryFill: 'rgba(0, 0, 0, 0.16)',
    chartPrimaryBorder: '#000000',
    chartSecondary: '#FFFFFF',
    chartSecondaryBorder: '#000000'
  }
}
