# API Documentation - InterneeAI Learning Coach Router

This document lists HTTP specifications, request headers, payload targets, and JSON response models for all server API route handlers.

---

## 📌 Base Routing Path
`http://localhost:3000/api`

---

## 🔑 Request Guidelines
- **Format:** All POST endpoints require `"Content-Type: application/json"` headers.
- **Failures:** Endpoint routes return `500 Internal Server` HTTP codes containing `{ error: "Message description" }` payloads on script crashes.

---

## 📶 API Endpoint Catalog

### 1. `/api/generate-roadmap` [POST]
Formulates structured JSON course roadmaps based on experience level and committed timelines.

#### Request Body
```json
{
  "track": "String (frontend | ml | backend | analytics)",
  "experience": "String (none | beginner | intermediate)",
  "timeline": "String (2weeks | 1month | 3months)"
}
```

#### Response (Success)
```json
{
  "trackName": "Frontend Learning Roadmap",
  "progress": 0,
  "milestones": [
    {
      "id": 1,
      "title": "Modern Styling & Tailwind Integration",
      "duration": "1 week",
      "completed": false,
      "topics": ["Flexbox layouts", "Custom config themes", "Dark mode"]
    }
  ]
}
```

---

### 2. `/api/chat` [POST]
Conversational messenger endpoint returns context-aware tutoring responses.

#### Request Body
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain how indexes speed up SQL reads."
    }
  ]
}
```

#### Response (Success)
```json
{
  "role": "assistant",
  "content": "Database indexes function like an alphabetical lookup deck at the back of a textbook..."
}
```

---

### 3. `/api/generate-quiz` [POST]
Dynamically builds 5 multiple choice technical assessment questions.

#### Request Body
```json
{
  "topic": "String (e.g. React state Hooks)"
}
```

#### Response (Success)
```json
{
  "topic": "React UI Development",
  "questions": [
    {
      "id": 1,
      "questionText": "Which hook is used to memoize execution calculations?",
      "options": ["useMemo", "useState", "useRef", "useEffect"],
      "correctOptionIndex": 0
    }
  ]
}
```

---

### 4. `/api/evaluate-interview` [POST]
Evaluates user responses to technical questions and outputs a scorecard.

#### Request Body
```json
{
  "question": "What is the difference between useEffect and useLayoutEffect?",
  "response": "useEffect runs asynchronously after rendering..."
}
```

#### Response (Success)
```json
{
  "score": "8.8 / 10",
  "strengths": "Accurate distinction between async paint and sync mutations.",
  "improvements": "Could detail performance impacts of blocking browser paints.",
  "detailedFeedback": "Great answer! Your understanding of painted lifecycle hooks is solid..."
}
```

---

### 5. `/api/generate-notes` [POST]
Compiles structured technical study note documents formatted in markdown.

#### Request Body
```json
{
  "topic": "String (e.g. SQL joins details)"
}
```

#### Response (Success)
```json
{
  "topic": "SQL joins details",
  "content": "# Comprehensive Guide to Joins\n\n## Introduction..."
}
```
