# System Architecture - InterneeAI Learning Coach

This document details the architectural layout, integration flow, database mappings, and lifecycle stages of the InterneeAI Learning Coach application.

---

## 🎨 Frontend Architecture
Built using **Next.js (App Router)** and **Tailwind CSS v4** styling framework:
* **Directory Routing:** Modular directory route slots mapping `/login`, `/signup`, `/onboarding`, and `/dashboard`.
* **State Management Context:** Custom [AuthContext](file:///f:/internee%20tasks/Task%201/src/context/AuthContext.tsx) context coordinating Firebase user profiles, xp changes, and streak validations.
* **Animations:** Framer Motion for sliding drawers, flipping flashcards, and expanding accordions.

---

## 🔧 Backend & API Architecture
Next.js Serverless Route Handlers are used to bridge client requests with database models and AI models:
* **API Routers:** Nesting under `/src/app/api/` (roadmap planner, chatbot, quiz evaluator, notes compiler).
* **OpenAI Client:** [openai.ts](file:///f:/internee%20tasks/Task%201/src/lib/openai.ts) coordinates completions from OpenAI GPT models using environment tokens.
* **Authentication Guards:** [layout.tsx](file:///f:/internee%20tasks/Task%201/src/app/dashboard/layout.tsx) serves as the security shell, checking sessions and onboarding boolean status, redirecting unauthorized reads back to `/login`.

---

## ☁️ Firebase & Cloud Firestore Strategy

The application uses **Cloud Firestore** for user metadata, roadmaps, quizzes, chats, and notes. To maintain out-of-the-box local testing stability:
* **isMock Fallback Toggle:** [firebase.ts](file:///f:/internee%20tasks/Task%201/src/lib/firebase.ts) checks for public credentials. If absent, all reads/writes are mapped to local client `localStorage` buffers mimicking actual collections!

### Database Relationships
* **User Profile Document (`/users/{uid}`)** holds core attributes.
* **Nested Collections:**
  * **Roadmaps (`/users/{uid}/roadmaps/{trackId}`)** stores milestones arrays.
  * **Chats (`/users/{uid}/chats/current`)** stores the message arrays.
  * **Quizzes (`/users/{uid}/quizzes/{autoId}`)** logs scores and dates.
  * **Notes (`/users/{uid}/notes/{autoId}`)** logs study sheets.
  * **Interviews (`/users/{uid}/interviews/{autoId}`)** logs mock scorecards.

---

## ⚡ OpenAI Integration Flow

```
+--------------------+            +-----------------------+            +---------------------+
|   Client request   |  =======>  |  Next.js API Handler  |  =======>  |  OpenAI GPT Models  |
| (Topic, Track, exp)|            | (isConfigured checks) |            |   (JSON formats)    |
+--------------------+            +-----------+-----------+            +----------+----------+
                                              |                                   |
                                      (If key is missing)                    (If Key active)
                                              |                                   |
                                              v                                   v
                                  +-----------------------+           +----------------------+
                                  | Local Storage Mockup  |           | JSON Parse Responses |
                                  +-----------+-----------+           +-----------+----------+
                                              |                                   |
                                              +-----------------+-----------------+
                                                                |
                                                                v
                                                      +-------------------+
                                                      |   Firestore DB    |
                                                      |   Client View     |
                                                      +-------------------+
```

---

## 🔄 Application Lifecycle Stages
1. **Bootstrap Initialization:** Web app boots. Firebase client validates connection parameters. Sets `isMock` mode flags.
2. **Access Security Check:** Auth listener catches state. Redirects guest users to `/login`. Redirects un-onboarded users to `/onboarding`.
3. **Questionnaire Setup:** Intern fills out onboarding forms. Triggers roadmap generator. Writes roadmap schemas to Firestore.
4. **Learning & Evaluation Loop:** Student studies milestones, asks tutor questions, takes quizzes, reviews notes, and practices mock technical rounds. XP increments and Streak calendars evaluate active days.
