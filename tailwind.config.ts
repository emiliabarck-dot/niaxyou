import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        blue: '#385876',
        mint: '#8ccdc2',
        sand: '#ead4a1',
        coral: '#df826f',
        cream: '#f6f5f1'
      },
      fontFamily: {
        body: ['var(--font-work-sans)', 'sans-serif'],
        display: ['var(--font-nunito)', 'var(--font-work-sans)', 'sans-serif']
      },
      boxShadow: { soft: '0 12px 24px rgba(23,32,51,0.12)' }
    }
  },
  plugins: []
};
export default config;
