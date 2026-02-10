
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                coffee: {
                    bg: {
                        primary: '#2D1810',
                        secondary: '#3D2820',
                    },
                    border: '#5A4034',
                    text: {
                        primary: '#F5E6D3',
                        secondary: '#C9B8A0',
                    },
                    accent: '#4F9C8F',
                    gold: '#FFD700',
                }
            },
            backgroundImage: {
                'coffee-gradient': 'linear-gradient(135deg, #2D1810 0%, #1A0F0A 100%)',
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                serif: ['var(--font-playfair)'],
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
                glow: 'glow 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.5s ease-out forwards',
            }
        },
    },
    plugins: [],
};
export default config;
