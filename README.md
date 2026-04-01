# Teton-Walkie-Talkie (Modernized Prototype)

> ⚠️ **DEPRECATION NOTICE: April 1, 2026**
>
> This project is officially deprecated and is now in a "Sunset" state. What this means:
> - **No Active Maintenance:** No further bug fixes, security patches, or feature updates will be provided.
> - **Legacy Status:** The code is provided "as-is" for portfolio and educational reference.
> - **Compatibility Risk:** As browser security standards for WebRTC and the Bun runtime evolve, this prototype may cease to function without manual intervention.

---

## 🌅 Project Sunset Summary

This project was a time-boxed exploration into WebRTC, Socket.io, and modern frontend tooling. What began as a 5-hour sprint was eventually evolved into a functioning Peer-to-Peer (P2P) Secure Video & Audio Walkie-Talkie.

### What is Teton-Walkie-Talkie?

A secure, browser-based walkie-talkie for hospital ward communication. It leverages WebRTC for low-latency media streaming and Socket.io for signaling.

---

## 🚀 Final Architecture & Stack

- **Runtime:** Bun (High-performance JS toolkit)
- **Signaling Server:** Node.js / Express with Socket.io v4
- **P2P Protocol:** WebRTC (via `adapter-latest.js`)
- **Styling:** Tailwind CSS + Material Web Components (Google)
- **Security:** Mandatory HTTPS/Localhost enforcement for `getUserMedia()`

---

## 🛠️ How to Run (Legacy Instructions)

**Prerequisites:** Ensure [Bun](https://bun.sh) is installed.

1. **Install Dependencies:**
   ```bash
   bun install
   ```

2. **Build CSS:**
   ```bash
   bun run build
   ```

3. **Start the Server:**
   ```bash
   bun run start
   ```

4. **Access:** Open `http://localhost:8080`.
   > Note: Remote devices require an HTTPS tunnel (like [ngrok](https://ngrok.com)) to access camera/mic permissions.

---

## 📈 Evolution & Reflections

### Phase 1: The 5-Hour Sprint (Initial Attempt)

- **Goal:** MVP Chat app with HarperDB.
- **Challenge:** Realized WebRTC scope was larger than the 5-hour window allowed for a solo dev.
- **Original Architecture:** React frontend, Express backend, HarperDB.

### Phase 2: Modernization (Final State)

- **WebRTC Success:** Successfully implemented `RTCPeerConnection` for 1-to-1 secure video/audio calls.
- **Performance:** Migrated to Bun for faster builds and a streamlined developer workflow.
- **UX Overhaul:** Rebuilt the UI with Material Design 3 and a responsive "Ward" selection system.

---

## 🏗️ Technical Logic

- **Signaling:** Server-side logic limits rooms to 2 users to ensure stable P2P performance.
- **Dynamic Routing:** Utilizes URL parameters (`?room=WardName`) for direct channel access.
- **Cleanup:** Implemented automatic media track disposal to prevent "ghost" camera usage after disconnects.

---

## 📝 Final Notes

> *"I prefer to work in proof-of-concept workflows and note the blocks/painpoints in the process, which can then be evaluated later for further research. This project reflects that iterative development cycle."*
