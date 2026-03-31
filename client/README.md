# 📻 Teton Walkie-Talkie

> **⚠️ DEPRECATION NOTICE** > Effective **April 1st, 2026**, this repository will no longer be actively maintained or updated. Security patches and bug fixes will cease. Feel free to fork and modify the code for your own legacy needs.

Teton Walkie-Talkie is a real-time communication platform designed for rapid, room-based chatting (e.g., medical staff, remote teams). 

This project recently underwent a major architectural migration from Create React App to Vite, utilizing Bun for lightning-fast package management and Material Design 3 (M3) for a modern, Google-native UX.

## 🛠 Tech Stack
* **Frontend Engine:** [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Material Web Components (M3)](https://m3.material.io/)
* **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
* **Real-time Engine:** [Socket.io](https://socket.io/)
* **Package Manager:** [Bun](https://bun.sh/)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Bun](https://bun.sh/) and [Node.js](https://nodejs.org/) installed on your machine.

### 1. Start the Backend Server
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
npm start
