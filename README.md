# 🔐 Secure PassGen | Random Password Generator

A high-performance, secure random password generator built with vanilla JavaScript. It uses the **Web Crypto API** for cryptographically strong randomness and provides real-time strength analysis without any external dependencies.

![Project Status](https://img.shields.io/badge/Status-Live-green)
![Tech Stack](https://img.shields.io/badge/HTML-CSS-JS-blue)
![Security](https://img.shields.io/badge/Security-Crypto_API-brightgreen)

## 🚀 Key Features

- **🔒 Cryptographically Secure**: Uses `window.crypto.getRandomValues()` instead of `Math.random()` for true randomness.
- **⚡ Real-Time Generation**: Updates password instantly as you adjust length or toggle options (no "Generate" button click required if desired, though a button is included).
- **📊 Strength Indicator**: Visual feedback (Weak/Medium/Strong) based on length and character variety.
- **📋 One-Click Copy**: Instantly copy the generated password to the clipboard with visual confirmation.
- **📱 Fully Responsive**: Works seamlessly on mobile, tablet, and desktop.
- **🎨 Modern UI**: Dark theme with neon accents and smooth animations.

## 🛠️ Technical Highlights

- **Zero Dependencies**: Pure HTML, CSS, and JavaScript. No frameworks or libraries.
- **Encapsulated Logic**: All JavaScript logic is scoped within `DOMContentLoaded` to prevent global variable conflicts.
- **Secure Randomness**: Leverages the browser's native `crypto` API for security-critical operations.
- **Event-Driven UI**: Real-time updates on slider movement and checkbox toggles.

## 📂 Project Structure

```text
password-generator/
│
├── index.html          # Main entry point and structure
├── style.css           # Modern dark theme and responsive styles
├── script.js           # Core logic (Crypto, Strength, Copy)
└── README.md           # This file