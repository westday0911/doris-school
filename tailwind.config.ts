import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155', // slate-700
            lineHeight: '1.6',
            fontSize: '0.9375rem', // 15px
            p: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            h1: {
              color: '#0f172a', // slate-900
              fontWeight: '900',
              marginTop: '1.5em',
              marginBottom: '0.8em',
              lineHeight: '1.2',
            },
            h2: {
              color: '#0f172a',
              fontWeight: '800',
              marginTop: '1.4em',
              marginBottom: '0.6em',
              lineHeight: '1.3',
            },
            h3: {
              color: '#0f172a',
              fontWeight: '700',
              marginTop: '1.2em',
              marginBottom: '0.5em',
            },
            'ul > li': {
              paddingLeft: '1.5em',
            },
            'ul > li::before': {
              backgroundColor: '#3b82f6', // blue-500
              width: '0.4em',
              height: '0.4em',
              top: '0.6em',
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '500',
              color: '#475569',
              borderLeftColor: '#3b82f6',
              borderLeftWidth: '4px',
              backgroundColor: '#f8fafc',
              padding: '1em 1.5em',
              borderRadius: '0.5rem',
            },
            code: {
              color: '#2563eb',
              backgroundColor: '#eff6ff',
              paddingLeft: '0.4em',
              paddingRight: '0.4em',
              paddingTop: '0.2em',
              paddingBottom: '0.2em',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            iframe: {
              width: '100%',
              aspectRatio: '16/9',
              height: 'auto',
              borderRadius: '0.75rem',
              marginTop: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              border: '1px solid #e2e8f0',
            },
            'div[data-youtube-video]': {
              position: 'relative',
              width: '100%',
              margin: '2rem 0',
            },
          },
        },
      },
      fontFamily: {
  			sans: [
  				'var(--font-sans)',
  				'ui-sans-serif',
  				'system-ui'
  			]
  		},
  		colors: {
  			brand: {
  				'50': '#f2f7ff',
  				'100': '#e6efff',
  				'200': '#c4dbff',
  				'300': '#9dc3ff',
  				'400': '#6b9dff',
  				'500': '#4a7dff',
  				'600': '#335cf2',
  				'700': '#2947c3',
  				'800': '#253b9a',
  				'900': '#21347a'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			soft: '0 20px 60px -40px rgba(15, 23, 42, 0.35)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'bounce-slow': 'bounce 3s infinite',
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
