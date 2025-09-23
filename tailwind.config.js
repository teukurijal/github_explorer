/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'slideDown': 'slideDown 0.3s ease-out',
        'fadeOut': 'fadeOut 0.5s ease-in 2.5s forwards',
        'progress': 'progress 2.5s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          from: {
            transform: 'translateX(-50%) translateY(-100%)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(-50%) translateY(0)',
            opacity: '1',
          },
        },
        fadeOut: {
          from: {
            opacity: '1',
            transform: 'translateX(-50%) translateY(0)',
          },
          to: {
            opacity: '0',
            transform: 'translateX(-50%) translateY(-20px)',
          },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}

