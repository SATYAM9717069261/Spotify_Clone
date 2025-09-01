import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        'side-menu': 'var(--side-menu-width)',
        'body-width': 'var(--body-width)',
        'player-width': 'var(--player-width)',
        'user-details-width': 'var(--user-details-width)',
      },
      height: {
        'side-menu': 'var(--side-menu-height)',
        'body-height': 'var(--body-height)',
        'player-height': 'var(--player-height)',
        'playlist-height': 'var(--playlist-height)',
        'user-details-height': 'var(--user-details-height)',
      },
      spacing: {
        'side-menu': 'var(--side-menu-width)',
        'player': 'var(--player-height)',
      },
      gridTemplateRows: {
        'layout': 'var(--grid-rows)',
      },
      gridTemplateColumns: {
        'layout': 'var(--grid-cols)',
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'copy-primary': 'rgb(var(--copy-primary) / <alpha-value>)',
        'copy-secondary': 'rgb(var(--copy-secondary) / <alpha-value>)',
        cta: 'rgb(var(--cta) / <alpha-value>)',
        'cta-active': 'rgb(var(--cta-active) / <alpha-value>)',
        'cta-text': 'rgb(var(--cta-text) / <alpha-value>)',
        grape: 'rgb(var(--grape) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}

export default config
