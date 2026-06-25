# Changelog

All notable changes to the **InterneeAI Learning Coach** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-06-25

This is the initial release of the InterneeAI Learning Coach application, introducing a premium SaaS-style landing page tailored for Internee.pk interns, along with an authenticated user dashboard equipped with local-storage fallbacks and API routers for full production integrations.

### Added
- **Premium landing page UI:** Interactive scroll animations, hero section tailored to Internee.pk requirements, visual features sections, and dynamic mockups.
- **Onboarding Flow:** Registration page and onboarding step sequence (name, field, level, study times) to populate initial Firestore profiles.
- **Sidebar & Dashboard Navigation:** Multi-page dashboard layouts including Overview, Roadmap, Chat, Quizzes, Flashcards, Notes, Mocks, and Settings pages.
- **Adaptive Roadmap Generator:** Visual tree roadmap rendering modules, milestones, and adaptive locks/unlocks with real progress updates.
- **AI Tutor Chat Room:** Dynamic markdown parsing chat room, message history tracking, custom programming question templates, and XP rewards logic.
- **Interactive Quiz Center:** Quiz scoring UI with animations, answers review sheets, score percentages, and automated weakness-tag detections.
- **Analytics & Settings:** Reusable charts tracking monthly study minutes, weekly module progress, profile updating configuration, and weak-area lists.
- **Firebase client setup:** Client initialization script (`src/lib/firebase.ts`) supporting local-storage fallback mode if variables are missing.
- **OpenAI route handlers:** Server API endpoints (`/api/chat`, `/api/quiz`, `/api/roadmap`) configured with JSON schema instructions.
- **Comprehensive Documentation:** README, Project Overview, System Architecture, Database Schema, API Details, and Feature Breakdown logs.

### Fixed
- Fixed compilation errors in `src/components/ChatDemo.tsx` caused by raw Python braces inside JSX expressions by wrapping them as string literals `{"{idx+1}"}`.
- Resolved Tailwind CSS viewport overflow limits on sidebar components on medium screen dimensions.

### Security
- Created Firestore production-ready security rules guarding access to user documents, roadmaps, chats, and quiz histories.
- Setup `.env.example` configurations to hide developer OpenAI keys and Firebase API credentials.
