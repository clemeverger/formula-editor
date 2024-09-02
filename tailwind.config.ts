import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gradientLeft: '#E8F9E6',
        gradientRight: '#FFFFFF',
        backgroundSection: '#F5F7F8',
        textPrimary: '#394855',
        gray200: '#E2E6EB',
        gray800: '#4D5A66',

        mimbiGreenDarker: '#67D05E',
        mimbiGreenBase: '#8FE288',
        mimbiBlueBase: '#5B98C4',
      },
    },
  },
  plugins: [],
}
export default config
