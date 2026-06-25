# Security Policy - InterneeAI Learning Coach

We take the security of our application, user data, and credentials very seriously. This document outlines our security policies, how to report vulnerabilities, and our internal security practices.

---

## 🛡️ Supported Versions

We actively provide security patches and updates for the following versions:

| Version | Supported | Notes |
| --- | --- | --- |
| 1.x.x | Yes | Current active release branch. |
| < 1.0.0 | No | Development pre-releases. Upgrade to 1.x.x. |

---

## 🛑 Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public GitHub issue**. Instead, report it privately to our team so we can address it before it is disclosed publicly.

### How to Submit a Report
1. Send an email to **security@internee.pk** (or the designated security contact).
2. Include the following details to help us triage the issue:
   - A descriptive title outlining the vulnerability type (e.g., "XSS in Chat Response component").
   - Step-by-step instructions to reproduce the issue.
   - Any proof-of-concept (PoC) code or screen captures if available.
   - The impact of the vulnerability and how it might be exploited.

### Our Response Timeline
- **Acknowledgement:** Within 24-48 hours of receipt.
- **Triage & Patch:** Within 7-14 days depending on the severity level.
- **Disclosure:** We will coordinate a public disclosure date with the reporter after releasing the fix.

---

## 🔒 Security Best Practices in the Codebase

All developers contributing to InterneeAI Learning Coach must follow these core security guidelines:

### 1. Protect Server-Side Secrets
- Never prefix server-side environment variables with `NEXT_PUBLIC_`. For example, `OPENAI_API_KEY` must remain a private, server-only environment variable.
- Any API key or authentication token prefix with `NEXT_PUBLIC_` is shipped to the client browser and can be read by any visitor.
- Only Firebase configuration parameters (such as `NEXT_PUBLIC_FIREBASE_API_KEY`) are safe to expose on the client, as Firebase relies on security rules for backend database protection.

### 2. Firestore Database Security Rules
- Do not deploy Firestore with default open rules (`allow read, write: if true`).
- Ensure all collections are protected by authentication guards:
  ```javascript
  allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
  ```
- Regularly run audit tests using the Firebase Security Rules Emulator to verify query isolation.

### 3. Safe AI Output Rendering
- AI tutors return markdown and code blocks that must be rendered safely.
- When rendering markdown or using third-party formatting libraries (like `react-markdown`), ensure HTML tag interpretation is disabled or sanitized to prevent cross-site scripting (XSS) via injected `<script>` tags in AI responses.

### 4. Input Sanitization
- Sanitize user inputs sent to Firebase and OpenAI endpoints.
- Ensure that prompt injection checks are handled gracefully on the API routes (`/api/chat`, `/api/quiz`) to avoid malicious commands manipulating the backend LLM parameters.

### 5. Dependency Management
- Keep all dependencies updated. Avoid using packages with known high-severity vulnerabilities.
- Run automated vulnerability scanning as part of development workflows:
  ```bash
  npm audit
  ```
- Configure GitHub Dependabot alerts on your forks to track out-of-date or vulnerable packages.
