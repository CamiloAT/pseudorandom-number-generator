# Pseudorandom Number Generator and Analyzer

[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-teal?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.8-blueviolet?style=flat)](https://recharts.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-pink?style=flat)](https://www.framer.com/motion/)
[![jStat](https://img.shields.io/badge/jStat-1.9-orange?style=flat)](https://jstat.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat)](https://opensource.org/licenses/MIT)

A modern and interactive web application designed for the generation, visualization, and statistical evaluation of pseudorandom numbers. This simulation project allows users to experiment with different mathematical generation algorithms and subject the results to rigorous tests of uniformity and independence.

---

## Main Features

- **Linear Congruential Generator:** Generation using the classic linear recurrence relation `Xi+1 = (a*Xi + c) mod m`.
- **Multiplicative Congruential Generator:** Variant that uses a pure multiplier without increment for specific sequences.
- **Middle Square Method:** Algorithm based on extracting the middle digits of the square of a seed number.
- **Interactive Statistical Tests:** Chi-Square, Kolmogorov-Smirnov, and Poker tests with educational tooltips and dynamic frequency tables.
- **Animated Chart Carousel:** 5 visualization types — scatter plot, lag plot, frequency histogram, trend line, and cumulative mean — powered by Recharts.
- **Side-by-Side Algorithm Comparison:** Run all three generators simultaneously with the same parameters and compare their statistical results.
- **Dark Mode UI with Guided Tour:** Elegant dark theme with fluid Framer Motion animations and an interactive step-by-step walkthrough via Driver.js.

---

## Execution and Development Guide

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CamiloAT/pseudorandom-number-generator.git
   cd pseudorandom-number-generator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Nota:** You can also run `npm run build` for a production build, `npm run preview` to preview the production build locally, or `npm run lint` to check for code issues. In VS Code, use the task `Ctrl+Shift+P` > "Tasks: Run Task" > "dev" to start the server.

---

## Project Structure

```text
pseudorandom-number-generator/
├── index.html                         ← Vite entry HTML (SPA shell)
├── package.json                       ← Project manifest and dependencies
├── vite.config.js                     ← Vite config with React + Tailwind plugins
├── eslint.config.js                   ← ESLint flat config for React/JSX
├── public/
│   ├── favicon.svg                    ← SVG favicon
│   └── icons.svg                      ← SVG icon sprite sheet
└── src/
    ├── main.jsx                       ← React entry point (createRoot)
    ├── App.jsx                        ← Main application component and state management
    ├── index.css                      ← Tailwind imports + CSS custom properties
    ├── utils/
    │   ├── generators.js              ← Core RNG algorithms (3 generators + stats)
    │   └── tests.js                   ← Statistical tests (Chi-Square, K-S, Poker)
    └── components/
        ├── WelcomeScreen.jsx          ← Animated landing screen
        ├── TransitionScreen.jsx       ← Initialization splash screen
        ├── ChartDisplay.jsx           ← Animated chart carousel (5 chart types)
        ├── DataTable.jsx              ← Paginated data table of generated numbers
        ├── StatsDisplay.jsx           ← Mean, variance, and period summary cards
        ├── TestResults.jsx            ← Expandable statistical test result cards
        ├── CompareModal.jsx           ← Side-by-side algorithm comparison modal
        └── InfoModal.jsx              ← About modal with project and team info
```

---

## Tech Stack

| Layer            | Technology                |
|------------------|---------------------------|
| **Framework**    | React 19.2                |
| **Build Tool**   | Vite 8.0                  |
| **Styling**      | Tailwind CSS 4.2          |
| **Charts**       | Recharts 3.8              |
| **Animation**    | Framer Motion 12.38       |
| **Statistics**   | jStat 1.9                 |
| **Icons**        | Lucide React 1.7          |
| **Guided Tour**  | Driver.js 1.4             |
| **Utilities**    | clsx 2.1, tailwind-merge 3.5 |

---

## Authors

| Name                      | GitHub                                      |
|---------------------------|---------------------------------------------|
| **Camilo Andres Arias Tenjo** | [@CamiloAT](https://github.com/CamiloAT)     |
| **Jose Luis Ortega Castillo** | [@JoseOrtegaUPTC](https://github.com/JoseOrtegaUPTC) |

*Computer Simulation*