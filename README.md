# Daniel Bonds Portfolio

A premium, high-performance portfolio at the intersection of leadership, technology, and AI innovation. Built with Next.js 15, Three.js, and Tailwind CSS 4.

## 🚀 Overview

This project is a sophisticated digital showcase for Daniel Bonds, a Senior Tech Lead with over 10 years of experience. It features immersive 3D experiences, advanced AI integrations, and a robust multi-language (i18n) architecture.

## ✨ Key Features

- **🌀 Immersive 3D Experience**: Powered by Three.js and React Three Fiber, featuring interactive WebGL scenes and physics-based interactions.
- **🤖 AI Studio**: A dedicated space for AI-driven experiments and orchestrations, integrating OpenAI and Google Gemini APIs.
- **🌍 Internationalization (i18n)**: Full multi-language support (German/English) using `next-intl`.
- **🎭 Advanced Animations**: Smooth, performant animations driven by Framer Motion and Lenis scroll optimization.
- **✨ Premium UI**: A futuristic, dark-themed aesthetic with glowing micro-interactions and custom typography.
- **📱 Responsive Design**: Fully optimized for all device sizes with a mobile-first approach.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **3D Engine**: [Three.js](https://threejs.org/) / [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Localization**: [next-intl](https://next-intl-docs.vercel.app/)
- **AI Integration**: OpenAI & Google Generative AI (Gemini)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

- `/src/app/[locale]` - Localized routes and page components.
- `/src/components` - Reusable UI components (Nav, Footer, UI primitives).
- `/src/components/motion` - Animation-specific wrappers and helpers.
- `/src/components/orchestrator` - 3D and AI logic for the AI Studio.
- `/src/messages` - Localization JSON files for German and English.
- `/scripts` - Utility and testing scripts.

## 🏁 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm / yarn / pnpm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd daniel-bonds-portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file and add your API keys:
    ```env
    OPENAI_API_KEY=your_key_here
    GOOGLE_API_KEY=your_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is private and all rights are reserved.

