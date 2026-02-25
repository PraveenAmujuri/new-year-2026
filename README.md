# New Year 2026 -- Interactive React Project

![React](https://img.shields.io/badge/React-Frontend-blue?logo=react&style=flat)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UtilityCSS-38B2AC?logo=tailwind-css&style=flat)
![Framer Motion](https://img.shields.io/badge/FramerMotion-Animation-black?style=flat)
![Vite](https://img.shields.io/badge/Vite-Bundler-purple?logo=vite&style=flat)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?logo=vercel&style=flat)

An interactive New Year web experience built using React, Tailwind CSS,
and Framer Motion.

Live Demo: https://2026.praveenai.tech\
Deployed on: Vercel

------------------------------------------------------------------------

## About

This project was built to:

-   Practice React component structure
-   Learn animation using Framer Motion
-   Experiment with user interaction psychology
-   Understand state-driven UI behavior
-   Implement time-based rendering logic

Instead of a static greeting page, this project changes its behavior
based on time, scroll position, and user interaction.

------------------------------------------------------------------------

## Core Concepts Implemented

### 1. State Management (React Hooks)

The project heavily uses:

-   useState
-   useEffect
-   useRef

State is used for:

-   Countdown timer (days, hours, minutes, seconds)
-   Detecting when the New Year has arrived
-   Scroll-based content reveal
-   Typing animation logic (character-by-character rendering)
-   Conditional UI rendering
-   Route switching behavior

------------------------------------------------------------------------

### 2. Time-Based Logic

A countdown is implemented using setInterval inside useEffect.

-   Calculates the difference between current time and January 1, 2026
-   Updates every second
-   Switches UI automatically when time reaches zero
-   Triggers confetti animation after midnight

This demonstrates real-time UI updates based on system time.

------------------------------------------------------------------------

### 3. Scroll-Based Interaction

In Troll pages:

-   window.scrollY is tracked using useEffect
-   UI sections appear only after specific scroll thresholds
-   Content animates into view using Framer Motion

This creates progressive reveal behavior.

------------------------------------------------------------------------

### 4. Typing Effect Simulation

In Troll2:

-   Commands are typed character-by-character
-   Managed using multiple state variables:
    -   currentText
    -   history
    -   cmdIndex
    -   charIndex
    -   typing
-   Controlled with setTimeout inside useEffect

This simulates a boot terminal experience.

------------------------------------------------------------------------

## Features

-   Live countdown to 2026
-   Automatic UI change after midnight
-   Confetti animation when countdown ends
-   Scroll-triggered meme reveal
-   Terminal-style boot animation
-   Mouse glow interaction effect
-   HyperText animation effect
-   Video text background effect
-   Smooth hover and tap animations

------------------------------------------------------------------------

## Tech Stack

Frontend: - React (Vite) - React Router DOM

Styling: - Tailwind CSS - tailwindcss-animate - shadcn/ui setup - Lucide
Icons

Animation: - Framer Motion

Deployment: - Vercel (Custom domain configured)

------------------------------------------------------------------------

## Installation

1.  Clone the repository

```Bash
git clone https://github.com/your-username/new-year-2026.git

cd new-year-2026
```

2.  Install dependencies

```Bash
npm install
```

3.  Run development server

```Bash
npm run dev
```

4.  Build for production

```Bash
npm run build
```

------------------------------------------------------------------------

## Purpose

This project helped improve understanding of:

-   Real-time state updates in React
-   Time-based conditional rendering
-   Managing multiple states in complex UI flows
-   Combining animation with application logic
-   Structuring interactive frontend applications
