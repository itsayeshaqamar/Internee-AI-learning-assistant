# Database Schema - Cloud Firestore & Local Storage Mockup

This document outlines the Firestore document definitions, collections paths, variable types, and JSON models used to synchronize student data.

---

## 📁 Firestore Mappings

### 1. Student User Profile Document
* **Path:** `/users/{userId}`
* **Model:**
```json
{
  "uid": "String (matching Firebase Auth UID)",
  "email": "String",
  "name": "String (display name)",
  "isOnboarded": "Boolean",
  "careerTrack": "String (frontend | ml | backend | analytics)",
  "experience": "String (none | beginner | intermediate)",
  "timeline": "String (2weeks | 1month | 3months)",
  "streakCount": "Number",
  "lastActiveDate": "String (YYYY-MM-DD)",
  "totalXP": "Number",
  "weakAreas": ["String"]
}
```

### 2. Roadmaps Milestones Collection
* **Path:** `/users/{userId}/roadmaps/{trackId}`
* **Model:**
```json
{
  "trackName": "String",
  "progress": "Number (0 to 100 percentage)",
  "milestones": [
    {
      "id": "Number",
      "title": "String",
      "duration": "String",
      "completed": "Boolean",
      "topics": ["String"]
    }
  ]
}
```

### 3. AI Tutor Chat Histories Collection
* **Path:** `/users/{userId}/chats/current`
* **Model:**
```json
{
  "messages": [
    {
      "role": "String (user | assistant)",
      "content": "String"
    }
  ]
}
```

### 4. Quiz History Logs
* **Path:** `/users/{userId}/quizzes/{autoId}`
* **Model:**
```json
{
  "topic": "String",
  "score": "Number",
  "totalQuestions": "Number",
  "passed": "Boolean",
  "date": "String (ISO Timestamp)"
}
```

### 5. Compiled Notebook Guides
* **Path:** `/users/{userId}/notes/{autoId}`
* **Model:**
```json
{
  "topic": "String",
  "content": "String (Markdown text)",
  "timestamp": "Number"
}
```

### 6. Mock Technical Round Evaluations
* **Path:** `/users/{userId}/interviews/{autoId}`
* **Model:**
```json
{
  "tech": "String",
  "question": "String",
  "answer": "String",
  "score": "String (e.g. 9.2 / 10)",
  "date": "String (ISO Timestamp)"
}
```

---

## ⚡ Mock Database Storage Keys (Local Storage)
When running in offline mockup mode (`isMock = true`), data is mapped inside the browser's `localStorage` using the prefix formats below to mirror Firestore collections:
* `users_{uid}` -> holds user profile documents.
* `users_{uid}_roadmaps_{trackId}` -> holds student roadmap document.
* `users_{uid}_chats_current` -> holds chat histories.
* `users_{uid}_quizzes_{autoId}` -> holds quiz logs.
* `users_{uid}_notes_{autoId}` -> holds saved markdown guides.
* `users_{uid}_interviews_{autoId}` -> holds evaluated mock scorecards.
