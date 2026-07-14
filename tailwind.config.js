/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        fontFamily: {
          // Geist Sans cho chữ thường (Heading, Body)
          sans: ['Geist Variable', 'sans-serif'],
          // Geist Mono cho số (01, 02) và nhãn kỹ thuật
          mono: ['Geist Mono Variable', 'monospace'],
          // Thêm alias 'display' để dùng trong code Lovable của bạn
          display: ['Geist Variable', 'sans-serif'], 
        },
        // Khai báo thêm vài màu custom mà UI của Lovable hay dùng (để tránh lỗi)
        'card-border': "var(--card-border, #000)",
        'ink': "var(--ink, #000)",
        'accent': "var(--accent, #10b981)",
        'bg-base': "var(--bg-base, #ffffff)",
        'globe-bg': "var(--globe-bg, #0f172a)",
        'bunny-bg': "var(--bunny-bg, #f3f4f6)",
        'bunny-text': "var(--bunny-text, #374151)",
        'outdoor-bg': "var(--outdoor-bg, #ecfdf5)",
      },
    },
  },
  plugins: [],
}