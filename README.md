# Premium Coffee Website ☕

A visually stunning, high-performance coffee brand website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Features

- **Scroll-Triggered Animations:** Immersive storytelling with frame-by-frame canvas animations.
- **Anti-Gravity Effects:** Floating coffee beans and smooth parallax scrolling.
- **High-DPI Support:** Crisp rendering on Retina/4K displays.
- **Static Export:** Blazing fast load times and easy deployment (Netlify/Vercel compatible).
- **Responsive Design:** Optimized for mobile, tablet, and desktop.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion & HTML5 Canvas
- **Language:** TypeScript

## 📦 Handling Assets

Place your high-resolution frame sequence (JPEG/WEBP) in `public/frames/` named `frame_0.jpg` to `frame_191.jpg`. The canvas component automatically handles loading and responsive scaling.

## 💻 Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🌍 Deployment

This project is configured for **Static Export**.

1. **Build the project:**
   ```bash
   npm run build
   ```
   This generates an `out` folder containing your static site.

2. **Deploy:**
   - **Netlify:** Drag & drop the `out` folder to [app.netlify.com/drop](https://app.netlify.com/drop).
   - **Vercel:** Connect your GitHub repo and deploy (ensure output directory is set to `out`).

---

Made with ❤️ for Coffee Lovers.
