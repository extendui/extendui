import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md,mdx}',
    './src/showcase/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		boxShadow: {
  			'button-inset': 'inset 0px 0px 3px rgba(0, 0, 0, 0.4)',
  			'button-inset-dark': 'inset 0px 0px 4px rgba(0, 0, 0, 0.8)',
  			button: '0 0px 2px 1px rgba(0,0,0,0.4)'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem',
  			'10xl': '104rem',
  			'11xl': '112rem'
  		},
  		fontFamily: {
  			sans: ['var(--font-geist-sans)', ...fontFamily.sans]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			glow: {
  				'0%, 100%': {
  					boxShadow: '0 0 5px rgba(52, 211, 153, 0.5), 0 0 10px rgba(52, 211, 153, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 10px rgba(52, 211, 153, 0.8), 0 0 20px rgba(52, 211, 153, 0.5)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '200% 0'
  				},
  				'100%': {
  					backgroundPosition: '-200% 0'
  				}
  			},
  			perimeterShimmer: {
  				'0%, 100%': {
  					clipPath: 'inset(0 0 calc(100% - 2px) 0)'
  				},
  				'25%': {
  					clipPath: 'inset(0 0 0 calc(100% - 2px))'
  				},
  				'50%': {
  					clipPath: 'inset(calc(100% - 2px) 0 0 0)'
  				},
  				'75%': {
  					clipPath: 'inset(0 calc(100% - 2px) 0 0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			glow: 'glow 2s ease-in-out infinite',
  			shimmer: 'shimmer 3s linear infinite',
  			perimeterShimmer: 'perimeterShimmer 4s linear infinite'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;

