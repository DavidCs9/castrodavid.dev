/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: [
          'Inter var',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'Fira Code',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'Consolas',
          'monospace',
        ],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            lineHeight: '1.75',

            // Remove quotes around code
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            // Remove quotes around blockquotes
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },

            // Heading styles
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '800',
              fontSize: theme('fontSize.2xl'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.6'),
              lineHeight: '1.2',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
              fontSize: theme('fontSize.xl'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
              lineHeight: '1.3',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontSize: theme('fontSize.lg'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.3'),
              lineHeight: '1.4',
            },
            h4: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.2'),
            },

            // Link styles
            a: {
              color: theme('colors.primary.600'),
              fontWeight: '500',
              textDecoration: 'none',
              borderBottom: `1px solid transparent`,
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.primary.700'),
                borderBottomColor: theme('colors.primary.600'),
              },
            },

            // Code styles
            code: {
              color: theme('colors.primary.700'),
              backgroundColor: theme('colors.gray.100'),
              padding: theme('spacing.1'),
              borderRadius: theme('borderRadius.md'),
              fontSize: '0.875em',
              fontWeight: '500',
            },

            // Pre styles
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              padding: theme('spacing.6'),
              borderRadius: theme('borderRadius.lg'),
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              margin: `${theme('spacing.8')} 0`,
              boxShadow: theme('boxShadow.lg'),
            },

            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              padding: '0',
            },

            // Blockquote styles
            blockquote: {
              borderLeftColor: theme('colors.gray.300'),
              borderLeftWidth: '4px',
              paddingLeft: theme('spacing.6'),
              fontStyle: 'italic',
              color: theme('colors.gray.600'),
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              padding: theme('spacing.4'),
              borderRadius: theme('borderRadius.lg'),
              margin: `${theme('spacing.8')} 0`,
            },

            // Image styles
            img: {
              borderRadius: theme('borderRadius.lg'),
              boxShadow: theme('boxShadow.md'),
              margin: `${theme('spacing.8')} 0`,
            },

            // List styles
            ul: {
              paddingLeft: theme('spacing.6'),
              margin: `${theme('spacing.4')} 0`,
            },
            ol: {
              paddingLeft: theme('spacing.6'),
              margin: `${theme('spacing.4')} 0`,
            },
            li: {
              margin: `${theme('spacing.2')} 0`,
              lineHeight: '1.6',
            },

            // Table styles
            table: {
              borderCollapse: 'collapse',
              width: '100%',
              margin: `${theme('spacing.8')} 0`,
              borderRadius: theme('borderRadius.lg'),
              overflow: 'hidden',
              boxShadow: theme('boxShadow.sm'),
            },
            th: {
              backgroundColor: theme('colors.gray.50'),
              padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
              border: `1px solid ${theme('colors.gray.300')}`,
              fontWeight: '600',
              textAlign: 'left',
            },
            td: {
              padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
              border: `1px solid ${theme('colors.gray.200')}`,
            },

            // HR styles
            hr: {
              borderColor: theme('colors.gray.300'),
              margin: `${theme('spacing.12')} 0`,
            },
          },
        },
        sm: {
          css: {
            fontSize: '0.875rem',
            lineHeight: '1.6',
            h1: { fontSize: theme('fontSize.xl') },
            h2: { fontSize: theme('fontSize.lg') },
            h3: { fontSize: theme('fontSize.base') },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.8',
            h1: { fontSize: theme('fontSize.3xl') },
            h2: { fontSize: theme('fontSize.2xl') },
            h3: { fontSize: theme('fontSize.xl') },
          },
        },
        xl: {
          css: {
            fontSize: '1.25rem',
            lineHeight: '1.8',
            h1: { fontSize: theme('fontSize.4xl') },
            h2: { fontSize: theme('fontSize.3xl') },
            h3: { fontSize: theme('fontSize.2xl') },
          },
        },
        // Dark theme
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray.300'),
            '--tw-prose-links': theme('colors.primary.400'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.400'),
            '--tw-prose-bullets': theme('colors.gray.600'),
            '--tw-prose-hr': theme('colors.gray.700'),
            '--tw-prose-quotes': theme('colors.gray.100'),
            '--tw-prose-quote-borders': theme('colors.gray.700'),
            '--tw-prose-captions': theme('colors.gray.400'),
            '--tw-prose-code': theme('colors.primary.400'),
            '--tw-prose-pre-code': theme('colors.gray.300'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-th-borders': theme('colors.gray.600'),
            '--tw-prose-td-borders': theme('colors.gray.700'),

            color: theme('colors.gray.300'),
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            strong: { color: theme('colors.white') },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': { color: theme('colors.primary.300') },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            },
            code: {
              color: theme('colors.primary.400'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
