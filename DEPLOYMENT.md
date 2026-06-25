# Deployment Guide - InterneeAI Learning Coach

This guide details the step-by-step process of preparing, deploying, and maintaining the InterneeAI Learning Coach application in a production environment. 

---

## 🗺️ Deployment Overview

The application is built on Next.js (App Router), Firebase (Authentication, Firestore Database), and OpenAI APIs. The recommended production deployment targets are:
- **Frontend Hosting:** Vercel (recommended) or Netlify/Amplify.
- **Backend & Database:** Firebase Cloud Firestore & Firebase Auth.
- **AI Engine:** OpenAI API (model `gpt-4o-mini` or `gpt-3.5-turbo`).

---

## 🛠️ Step 1: Firebase Project Setup

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it `interneeai-learning-coach`.
3. Choose whether to enable Google Analytics (recommended for usage tracking) and click **Create Project**.

### 2. Enable Firebase Authentication
1. Navigate to **Build > Authentication** in the left sidebar.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, enable:
   - **Email/Password** (Enable both Email/Password and Email link options).
4. Save the changes.

### 3. Create Cloud Firestore Database
1. Navigate to **Build > Firestore Database**.
2. Click **Create Database**.
3. Select **Start in test mode** initially (we will secure it with rules below).
4. Choose a Cloud Firestore location closest to your users (e.g., `nam5 (us-central)`).
5. Click **Enable**.

### 4. Register the Web Application
1. In the Project Overview page, click the web icon (`</>`) to register a new Web App.
2. Enter the App nickname (e.g., `InterneeAI Web Client`).
3. Click **Register App**.
4. Firebase will generate a `firebaseConfig` object containing credentials. Save these values; they map to your environment variables.

---

## 🔒 Step 2: Firestore Security Rules

Deploying secure Firestore rules is critical before exposing the application to production. Go to **Firestore Database > Rules** and deploy the following configuration:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if the user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if the document belongs to the logged-in user
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // User profiles rules
    match /users/{userId} {
      allow read, write: if isAuthenticated() && isOwner(userId);
    }
    
    // Learning Roadmaps rules
    match /roadmaps/{roadmapId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }

    // Chat sessions and messages rules
    match /chats/{chatId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      
      // Subcollection for detailed message history
      match /messages/{messageId} {
        allow read, write: if isAuthenticated();
      }
    }

    // Quizzes rules
    match /quizzes/{quizId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }

    // Flashcards rules
    match /flashcards/{cardId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }

    // Notes rules
    match /notes/{noteId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }

    // Mock Interviews rules
    match /interviews/{interviewId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 🔑 Step 3: Environment Variables

You need to gather all API keys and credentials to configure the deployment environment. Refer to `.env.example` for details.

| Variable Name | Description | Source |
| --- | --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Access Key | Firebase Web App Settings |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Authentication Domain | Firebase Web App Settings |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Firebase Web App Settings |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket URL | Firebase Web App Settings |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Firebase Web App Settings |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Application ID | Firebase Web App Settings |
| `OPENAI_API_KEY` | OpenAI secret API Key | OpenAI API Keys Console |

> [!WARNING]
> Keep the `OPENAI_API_KEY` strictly confidential. Never prefix it with `NEXT_PUBLIC_` as that would expose the key directly on the client browser.

---

## 🚀 Step 4: Hosting on Vercel (Recommended)

### Option A: Deployment via Vercel Dashboard (No CLI)
1. Push your repository code to GitHub, GitLab, or Bitbucket.
2. Go to the [Vercel Dashboard](https://vercel.com/).
3. Click **New Project** and select your imported repository.
4. Configure the Project:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` or `next build`
   - **Output Directory:** `.next`
5. Expand the **Environment Variables** section and add all items listed in [Environment Variables](#-step-3-environment-variables).
6. Click **Deploy**. Vercel will build the project and assign a production URL (e.g., `https://interneeai.vercel.app`).

### Option B: Deployment via Vercel CLI
If you prefer running deployments from the command line, perform the following:
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Authenticate the CLI with your Vercel Account:
   ```bash
   vercel login
   ```
3. Initialize and link your local directory to Vercel:
   ```bash
   vercel link
   ```
4. Push environmental variables directly:
   ```bash
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY <your-value>
   # Repeat for all variables
   ```
5. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 🌐 Step 5: Post-Deployment Verification

Once the build successfully completes, navigate to your public production URL and verify:
1. **Landing Page Animations:** Verify that scroll effects and SVG interactive mockups work.
2. **Registration / Login:** Perform a sign-up flow. If Firebase is correctly configured, you will see a real user record populated in the Firebase Console under **Authentication**.
3. **Roadmap Generation:** Create a study roadmap. Firestore should populate a new document under the `/roadmaps` collection.
4. **AI Coach Chat:** Open the chat and ask a programming question. The system will make a secure call to `/api/chat` using the environment's `OPENAI_API_KEY` and respond with markdown formatted text.
5. **Dashboard Analytics:** Complete a mockup quiz and ensure that dashboard analytics graphs render without layout shifts.

---

## 📈 Monitoring & Alerts

1. **OpenAI Cost Limits:** Set billing thresholds and budget alerts in your OpenAI dashboard to avoid unexpected usage fees.
2. **Firebase Usage Limits:** Keep track of the Free Spark tier limitations:
   - Firestore: 20k writes/day, 50k reads/day.
   - Auth: 10k verification codes per month.
3. **Vercel Edge Functions Log:** Access error logs and runtime issues by opening the **Logs** tab in your Vercel Deployment Dashboard.
