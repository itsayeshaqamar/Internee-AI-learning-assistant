# Features breakdown - InterneeAI Learning Coach

This guide details the functionality, workflow mechanisms, and state properties of all features inside the InterneeAI platform.

---

## 📈 System Features Catalog

### 1. Setup Onboarding Wizard
- **Goal:** Personalizes the platform to match student requirements.
- **Workflow:** 
  - On login, checks profile details. If `isOnboarded: false`, prompts configuration.
  - Student selects: Track -> Experience -> Timeline commmitment.
  - Sends a payload request to the AI models to create initial roadmap milestones.
  - Profile is updated in Firestore to `isOnboarded: true`.

### 2. Personalized Visual Roadmaps
- **Goal:** Visualizes path milestones and tracks course completions.
- **Workflow:**
  - Displays checkable milestones, difficulty tags, estimated completion hours, and subtopics.
  - Checking milestones recalculates path progress, awards **30 XP**, and triggers celebration confetti.

### 3. AI Tutor Chat
- **Goal:** 1-on-1 discussion panel answering doubts in real-time.
- **Workflow:**
  - Standard conversation logs saved to database chats.
  - Connects user input to chatbot completions.
  - Awards **5 XP** per query to encourage active discussions.

### 4. Quiz Center (Assessment Grader)
- **Goal:** Validates topic mastery.
- **Workflow:**
  - Generates a 5-question multiple choice test.
  - If score is less than 80% (fewer than 4 correct answers), the topic is flagged under profile `weakAreas`.
  - Passing clears the topic flag and awards **50 XP**. Fails award **10 XP** for trying.

### 5. Adaptive Learning (Weakness Detections)
- **Goal:** Identifies and corrects student weaknesses.
- **Workflow:**
  - Profile `weakAreas` array feeds alerts dynamically on the Overview dashboard warning page.
  - Links let interns jump directly into reviews or retake quizzes to clear flags.

### 6. Notes Generator
- **Goal:** Automatically creates well-formatted study guides.
- **Workflow:**
  - Input a topic, compiles markdown study sheets with analogies and code snippets.
  - Click "Save to Notebook" to write to the personal notes library, awarding **10 XP**.

### 7. Flashcards Deck
- **Goal:** Reinforces memory recall for technical definitions.
- **Workflow:**
  - Renders 3D double-sided cards flipping on tap (using CSS transform perspectives).
  - Clicking "I Know This" awards **5 XP** and filters card out of study decks.

### 8. Mock Interviews Simulator
- **Goal:** Prepares interns for screening sessions.
- **Workflow:**
  - Internee submits response text.
  - Evaluator scores performance, printing key strengths, weaknesses, and optimization logs.
  - Award **25 XP** per evaluation to reward candidate persistence.

### 9. Streaks and XP Gamifications
- **Goal:** Encourages consistency.
- **Workflow:**
  - Student profile tracks consecutive daily logins.
  - Displays weekly streak calendar maps with flame indicators.
  - XP levels scale dynamically (Level Up = Total XP / 100).

### 10. Career Guidance Center
- **Goal:** Links skill acquisition with placement opportunities.
- **Workflow:**
  - Displays corporate internship lists.
  - Applications are locked behind XP thresholds (e.g. 100 XP required), incentivizing interns to complete roadmaps and mock interviews first.
