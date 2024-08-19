/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        6: '1.5rem',
        8: '2rem',
        3: '0.75rem',
        4: '1rem',
      },
      maxWidth: {
        '4xl': '56rem',
      },
      colors: {
        zait: "#3F7A5E",
        zait1: "rgba(63,122,94, 0.2)",
                gray: {
          50: '#f9fafb',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6b7280',
          700: '#374151',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        red: {
          100: '#fee2e2',
          700: '#b91c1c',
        },
      },
      boxShadow: {
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
      },
      zIndex: {
        10: '10',
      },
      flex: {
        1: '1 1 0%',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.ltr': {
    direction: 'ltr',
    textAlign: 'left',
  },
  '.rtl': {
    direction: 'rtl',
    textAlign: 'right',
  },
      }, ['responsive', 'hover']);
    }
  ],
};
