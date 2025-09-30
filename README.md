# 🚦 Red Light, Green Light Game

A modern React-based implementation of the classic "Red Light, Green Light" game. Test your reflexes and timing skills in this interactive web game where you must move only when the light is green!

## 🎮 Game Rules

### 🎯 Objective

Score as many points as possible by taking steps only when the green light is on. Avoid moving during red light phases!

### 📋 How to Play

1. **Start the Game**: Enter your name and click "Start Playing"
2. **Wait for Green Light**: The traffic light will cycle between red and green
3. **Take Steps**: When the light is **GREEN**, click either "Left" or "Right" step buttons
4. **Avoid Red Light**: Never click step buttons when the light is **RED**
5. **Score Points**:
   - **+1 point** for each successful step during green light
   - **-1 point** for clicking the same step button twice in a row
   - **Game Over** if you click any step button during red light

## 🛠 Tech Stack

### 📦 Core Dependencies

- **React** 19.1.1 - Modern React with concurrent features
- **TypeScript** 5.8.3 - Type-safe development
- **Vite** 7.1.7 - Fast build tool and dev server
- **Material-UI** 7.3.2 - Comprehensive React UI framework
- **Zustand** 5.0.8 - Lightweight state management
- **React Router Dom** 7.9.2 - Client-side routing

### 🧪 Testing & Quality

- **Vitest** 3.2.4 - Fast unit testing framework
- **React Testing Library** 16.3.0 - Component testing utilities
- **ESLint** 9.36.0 - Code linting and quality enforcement
- **Prettier** 3.6.2 - Code formatting
- **jsdom** 27.0.0 - DOM testing environment

### 🚀 Build & Deployment

- **GitHub Pages** - Static site hosting
- **gh-pages** - Deployment automation

## 📦 Installation

### 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** package manager

### 🔧 Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/red-light-green-light/
   ```

## 🚀 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run test suite
- `yarn test:run` - Run tests once
- `yarn test:ui` - Run tests with UI interface
- `yarn coverage` - Run tests with coverage report
- `yarn lint` - Run ESLint
- `yarn deploy` - Build and deploy to GitHub Pages

## ⭐ Features

- **Modern Tech Stack**: React 19, TypeScript, Vite
- **UI Framework**: Material-UI (MUI) v7 with custom theming
- **State Management**: Zustand with localStorage persistence
- **Design System**: Atomic Design Pattern (Atoms, Molecules, Organisms, Templates)
- **Testing**: Comprehensive test suite with Vitest and React Testing Library
- **Audio Integration**: Sound effects synchronized with game state
- **Mobile Support**: Responsive design with haptic feedback (not available on Safari)
- **Persistent Storage**: High scores and user data saved locally
- **Real-time Scoring**: Live score updates with high score tracking
- **Type Safety**: Full TypeScript implementation for robust development

## 📄 License

This project is created for demonstration purposes as part of a technical assessment.
