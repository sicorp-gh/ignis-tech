/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#000000',
          lighter: '#0A0A0A',
          card: '#0D0D0D',
        },
        primary: {
          DEFAULT: 'var(--color-primary, #FF4D00)', // Vibrant Orange/Fire
          dark: 'var(--color-primary-dark, #CC3E00)',
          light: 'var(--color-primary-light, #FF7033)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary, #FFD700)', // Gold Accent
          dark: 'var(--color-secondary-dark, #C2A300)',
          light: 'var(--color-secondary-light, #FFE033)',
        },
        accent: {
          DEFAULT: '#FF4D00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'], // Switched Poppins to Outfit for a more modern tech feel
      },
      backgroundImage: {
        'ignis-gradient': 'linear-gradient(135deg, #FF4D00 0%, #FFD700 100%)',
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
        'glow-mesh': 'radial-gradient(circle at 50% 50%, rgba(255, 77, 0, 0.1) 0%, transparent 50%)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem', // Sharper than previous 1.5rem
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
