# Bandan Kumar Mahto — iOS Developer Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<p align="center">
  A modern, high-performance personal portfolio website showcasing mobile engineering expertise in <b>Swift</b>, <b>SwiftUI</b>, <b>UIKit</b>, and iOS app architecture.
</p>

[**🌐 Live Demo**](https://bandan-kumar.vercel.app/) • [**💼 LinkedIn**](https://www.linkedin.com/in/bandan-kumar/) • [**🐙 GitHub**](https://github.com/Bandan-K)

</div>

---

## 📖 Overview

This portfolio website is crafted to highlight my professional experience, key metrics, technical skill sets, and development methodologies as an iOS Developer. It features a sleek glassmorphic dark theme, fluid micro-interactions, dynamic Firestore data integration, and built-in resume viewing.

### ✨ Key Features

- **⚡ Modern Tech Stack**: Built with Next.js 16 (App Router + Turbopack), React 19, and TypeScript.
- **🎨 Glassmorphic & Dynamic UI**: Dark-mode aesthetic designed with Tailwind CSS and animated with Framer Motion.
- **🔥 Dynamic Profile & Stats**: Integrated with Google Firebase Firestore to dynamically fetch real-time stats and technical skills with local fallbacks.
- **🛠 Interactive Technical Expertise**: Organized skill categories (Core Stack, Frameworks & Services, Tools & Distribution) with detailed modal inspections.
- **📱 iOS Development Lifecycle**: Step-by-step breakdown of requirements analysis, architecture, testing, and App Store deployment workflow.
- **📄 In-App Resume Preview**: Built-in modal PDF viewer and direct download capabilities with automatic device compatibility fallback.
- **📬 Interactive Contact Flow**: Direct mail client trigger and Gmail web compose integration.
- **📊 Analytics & Telemetry**: Privacy-conscious interaction and navigation tracking via Firebase Analytics.
- **🔍 SEO & Social Sharing Optimized**: Complete OpenGraph, Twitter card tags, sitemap, robots.txt, and structured JSON-LD schema metadata.

---

## 🛠 Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components & Turbopack |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type checking & enhanced DX |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first responsive styling & CSS animations |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | Smooth spring physics, modals, and enter/exit transitions |
| **Backend / DB** | [Firebase Firestore](https://firebase.google.com/) | Cloud database for real-time profile data & analytics |
| **Deployment** | [Vercel](https://vercel.com/) | Edge network hosting and continuous deployment |

---

## 📁 Project Structure

```text
├── app/
│   ├── api/                 # API route handlers
│   ├── globals.css          # Global Tailwind and font styles
│   ├── layout.tsx           # Root layout with SEO, metadata & JSON-LD schemas
│   ├── page.tsx             # Main landing page (SSR profile fetching)
│   ├── robots.ts            # Dynamic robots.txt configuration
│   └── sitemap.ts           # Dynamic XML sitemap generation
├── components/
│   ├── hero/                # Hero section & dynamic App Store stats
│   ├── skills/              # Categorized skills matrix, cards & detail modals
│   ├── AnalyticsTracker.tsx # Client-side page navigation tracking
│   ├── AppShowcase.tsx      # Application showcase component
│   ├── ContactDialog.tsx    # Modal for initiating email conversations
│   ├── ContactSection.tsx   # Contact section & social profile links
│   ├── DevelopmentProcess.tsx # 3-stage iOS engineering pipeline
│   ├── NavBar.tsx           # Floating glassmorphic navigation bar
│   └── ResumeModal.tsx      # PDF viewer & download dialog
├── lib/
│   ├── services/
│   │   └── profile.ts       # Firestore profile data fetching service
│   ├── analytics.ts         # Firebase Analytics event helpers
│   └── firebase.ts          # Firebase app and service initialization
├── public/                  # Static assets (images, icons, resume PDF, manifest)
└── tailwind.config.ts       # Tailwind CSS design system configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.18.0` or higher (Node.js 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bandan-K/Bandan.git
   cd Bandan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts the Next.js development server with Turbopack |
| `build` | `npm run build` | Compiles the production build |
| `start` | `npm run start` | Runs the compiled production server |
| `lint` | `npm run lint` | Runs ESLint checks across the project |

---

## ⚙️ Configuration & Customization

### 1. Personal Information & Profile Content
- **Firestore**: Update the `ProfileDetails/MyDetail` document in your Firebase project to dynamically adjust your stats and skills.
- **Local Fallback**: Fallback values are maintained in [lib/services/profile.ts](file:///Users/bkmahto/Development/Portfolio/Bandan/lib/services/profile.ts) and [components/hero/index.tsx](file:///Users/bkmahto/Development/Portfolio/Bandan/components/hero/index.tsx).

### 2. Resume & Static Assets
- Place your updated resume PDF in `public/Bandan_Kumar_Mahto_Resume.pdf`.
- Update your OpenGraph banner and favicons in the `public/` folder.

### 3. SEO & Metadata
- Update domain URLs and author metadata in [app/layout.tsx](file:///Users/bkmahto/Development/Portfolio/Bandan/app/layout.tsx), [app/robots.ts](file:///Users/bkmahto/Development/Portfolio/Bandan/app/robots.ts), and [app/sitemap.ts](file:///Users/bkmahto/Development/Portfolio/Bandan/app/sitemap.ts).

---

## 🌐 Deployment

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com):

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project into **Vercel**.
3. Vercel will automatically detect Next.js and apply optimal build settings.
4. Click **Deploy**.

---

## 📬 Contact & Connect

**Bandan Kumar Mahto** — *iOS Developer*

- 💼 **LinkedIn**: [Bandan Kumar Mahto](https://www.linkedin.com/in/bandan-kumar/)
- 🐙 **GitHub**: [@Bandan-K](https://github.com/Bandan-K)
- 📧 **Email**: [bandan.kmahto@gmail.com](mailto:bandan.kmahto@gmail.com)

---

<div align="center">
  <sub>Designed & Developed by Bandan Kumar Mahto • Licensed under MIT</sub>
</div>
