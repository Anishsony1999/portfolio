# 💼 Anish N — Portfolio

This is my personal developer portfolio built with **Vite + React + TypeScript + Tailwind CSS** and deployed on **GitHub Pages**.

> [!NOTE]
> 🔗 Live Site: [https://anishsony1999.github.io/portfolio/](https://anishsony1999.github.io/portfolio/)

## 🚀 Features

- ✨ Modern, responsive single-page UI
- 🌌 Particle background animation
- 🧑‍💻 Projects and experience sections
- 🎯 Animated transitions and custom cursor
- 🎨 Styled with Tailwind CSS 
- ⚡ Built with Vite for fast development

## 🛠️ Running Locally

```bash
# Install dependencies
npm install
```

```bash
# Start development server
npm run dev
```

## 📧 Contact Form Email Configuration (EmailJS)

Create a `.env` file in the project root and add:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then restart the dev server:

```bash
npm run dev
```

The contact form in `App.tsx` is now connected to EmailJS and sends real messages when these values are configured.
## 📦 portfolio

```text
📦 portfolio
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   └── main.tsx
├── index.html
├── tailwind.config.js
└── vite.config.ts
