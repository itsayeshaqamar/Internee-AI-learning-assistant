# InterneeAI Learning Coach 🎓⚡

> Learn Smarter with AI-Powered Personalized Guidance built specifically for Internee.pk interns.

InterneeAI Learning Coach is an enterprise-grade personalized AI tutoring platform designed to accelerate tech skill acquisition and career readiness for interns. By merging adaptive curriculum planners, interactive chatbots, dynamic quizzes, and mock technical evaluation panels, the platform bridges the gap between learning theoretical modules and securing professional internships.

---

## 📌 Table of Contents
- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture & User Flow](#-architecture--user-flow)
- [Installation & Setup](#-installation--setup)
- [Folder Structure](#-folder-structure)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ⚠️ Problem Statement
Standard upskilling portals present static, text-heavy curricula that fail to adapt to a student's prior experience or timeline commitments. Without a dedicated personal mentor:
* Interns struggle to translate complex technical jargon into intuitive concepts.
* There is no feedback loop to identify conceptual weak areas before screening phases.
* Students lack mock interview practice with line-by-line coding scorecards, leading to higher rejection rates in job placement rounds.

---

## 💡 Solution Overview
InterneeAI Learning Coach serves as a dedicated **1-on-1 AI Mentor** synced with Internee.pk internship objectives.
1. **Dynamic Onboarding:** Students specify their track, timeline targets, and background expertise.
2. **Personalized Roadmaps:** The AI structures a vertical learning chain of milestones.
3. **Adaptive Feedback Loop:** Quiz performances automatically flag weak areas. Flagged areas trigger warnings suggesting notes reviews or refresher assessments.
4. **Mock Engineering Panels:** Simulates coding rounds and prints grading scorecards detailing strengths and space/time complexity recommendations.

---

## 🚀 Key Features

* **Personalized Onboarding Wizard:** Tailors course milestones based on tracks (Frontend React, Machine Learning, Python Backend, Data Analyst).
* **AI Tutor Chat:** Persistent messenger delivering custom analogies and code examples.
* **Quiz Center:** Generates 5 multiple choice questions. Updates profile `weakAreas` lists when scores fall below 80%.
* **Notes Generator:** Compiles Markdown technical reviews saveable to a personal notebook.
* **Flashcards Deck:** 3D flipping card modules displaying essential tech definitions.
* **Mock Interviews Simulator:** technical question panels providing score reports (strengths/improvements).
* **XP & Streak Gamification:** Streak calendars and XP meters rewarding active participation.
* **Career Center:** Displays partner company job listings, locking applications behind XP milestones.

---

## 🛠️ Technology Stack

* **Frontend Framework:** Next.js (App Router)
* **Styling Engine:** Tailwind CSS v4 & Vanilla CSS variables
* **State & Transitions:** Framer Motion, React Context
* **Backend Database:** Cloud Firestore (synced with a robust Local Storage mockup fallback)
* **Security & Auth:** Firebase Authentication (or localStorage mock sessions)
* **AI Engines:** OpenAI API (GPT models)
* **Icons & UI:** Lucide React icons, Canvas Confetti

---

## 📐 Architecture & User Flow

```
+--------------------------------------------------------+
|                      Landing Page                      |
|          (Visual Demos, Testimonials, FAQs)            |
+---------------------------+----------------------------+
                            |
                     (Start Learning)
                            v
+--------------------------------------------------------+
|                   Auth (Login/Signup)                  |
|          (Firebase Auth or Local Storage Mock)         |
+---------------------------+----------------------------+
                            |
                  (First Time Redirect)
                            v
+--------------------------------------------------------+
|                    Onboarding Wizard                   |
|       (Select Track, Experience, Timeline)             |
+---------------------------+----------------------------+
                            |
                   (Generates Roadmap)
                            v
+--------------------------------------------------------+
|                     User Dashboard                     |
|  [Sidebar Navigation Shell - Gamified XP & Streaks]    |
|                                                        |
|  +--------------------+   +-------------------------+  |
|  |   Overview Metrics |   | Personalized Roadmaps   |  |
|  +--------------------+   +-------------------------+  |
|  |   AI Tutor Chat    |   | Quiz Center (Fails flag)|  |
|  +--------------------+   +-------------------------+  |
|  |   Notes Notebook   |   | Flashcards Flipping     |  |
|  +--------------------+   +-------------------------+  |
|  |   Mock Interviews  |   | Career Center (XP Lock) |  |
|  +--------------------+   +-------------------------+  |
|  |   Analytics Metrics|   | Settings profile        |  |
|  +--------------------+   +-------------------------+  |
+--------------------------------------------------------+
```

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js v18.0.0 or higher
* NPM or Yarn package manager

### 1. Clone & Install
```bash
git clone https://github.com/internee-pk/internee-ai-coach.git
cd internee-ai-coach
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and copy the contents of [.env.example](file:///f:/internee%20tasks/Task%201/.env.example):
```env
# Cloud DB Config (Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

# AI Engine Config (OpenAI)
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

> [!NOTE]
> If keys are left undefined or placeholder, the application runs automatically in **Offline Mock Fallback Mode**, saving all data directly inside the browser's `localStorage` and generating local simulated AI tutor results!

### 3. Local Development Run
```bash
npm run dev
```
Open `http://localhost:3000` to review the local deployment.

### 4. Build Compilation
To compile optimized production assets:
```bash
npm run build
```

---

## 📁 Folder Structure

```
.
├── .github/                     # GitHub PR & Issue templates
├── public/                      # Static assets (logos, icons)
└── src/
    ├── app/                     # Next.js Page components & API route handlers
    │   ├── api/                 # Endpoint routers (generate-roadmap, chat, quiz, evaluate)
    │   ├── dashboard/           # Authenticated user viewports (roadmap, quiz, career)
    │   ├── login/               # Sign In portal
    │   ├── onboarding/          # Setup Questionnaire wizards
    │   ├── signup/              # User registrations page
    │   ├── layout.tsx           # Global wrapping components
    │   └── page.tsx             # Public landing page entry
    ├── components/              # Modular UI elements (Navbar, Hero, ChatDemo, Features)
    ├── context/                 # Global state management providers (AuthContext)
    └── lib/                     # Config initialize layers (firebase, openai)
```

---

## 🔮 Future Roadmap
* **Audio Voice Tutorials:** Voice inputs for mock behavioral interview responses.
* **IDE Sandbox Sync:** Sync Sandboxes directly to VS Code extensions.
* **Resume Parse Matcher:** Automatically parse user PDFs in Career Center to update matching scores.

---

## 🤝 Contributing
Contributions are highly welcomed. Please read [CONTRIBUTING.md](file:///f:/internee%20tasks/Task%201/CONTRIBUTING.md) for branch naming specifications, coding patterns, and pull requests reviews before submitting updates.

---

## 🛡️ License
Distributed under the MIT License. See [LICENSE](file:///f:/internee%20tasks/Task%201/LICENSE) for more details.

---

## 🌟 Acknowledgements
Powered by [Internee.pk](https://internee.pk) to empower thousands of students transitioning to professional software careers.
