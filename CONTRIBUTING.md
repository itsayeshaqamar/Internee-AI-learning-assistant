# Contributing to InterneeAI Learning Coach

First off, thank you for taking the time to contribute to InterneeAI Learning Coach! It is because of contributors like you that this project continues to improve and empower interns.

Please read through these guidelines to ensure a smooth, collaborative contribution process.

---

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful, welcoming, and inclusive environment. Please treat all contributors with respect, construct feedback constructively, and focus on collaborative problem-solving.

---

## 🌿 Branching Strategy

We follow a structured branching system to keep the repository clean and stable:

- **`main` / `master`**: Represents the current stable production release. Do not push directly to this branch.
- **`develop`**: The primary branch for staging changes and integration testing.
- **Feature Branches (`feature/your-feature-name`)**: For adding new features or capabilities.
- **Bug Fix Branches (`bugfix/issue-description`)**: For resolving reported bugs.
- **Documentation Branches (`docs/doc-topic`)**: For updating guides, readmes, or inline comments.

---

## 💻 Local Development Workflow

To start contributing, follow these steps:

1. **Fork the Repository:** Create a personal fork on GitHub.
2. **Clone the Forked Repository:**
   ```bash
   git clone https://github.com/your-username/internee-ai-learning-coach.git
   cd internee-ai-learning-coach
   ```
3. **Set Up Upstream Remote:**
   ```bash
   git remote add upstream https://github.com/internee-pk/internee-ai-learning-coach.git
   ```
4. **Create a New Branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
5. **Install Dependencies:**
   ```bash
   npm install
   ```
6. **Set Up Local Configuration:**
   - Copy `.env.example` to `.env.local`
   - Supply dummy credentials or configure your private development Firebase & OpenAI projects.
7. **Run the Development Server:**
   ```bash
   npm run dev
   ```
8. **Make Your Changes:** Write clean, documented, and typed code.

---

## 🎨 Coding Standards

To maintain consistency across the codebase, please adhere to these coding standards:

### 1. Naming Conventions
- **Components:** PascalCase for React component names (e.g., `ChatDemo.tsx`, `SidebarNavigation.tsx`).
- **Files/Directories:** camelCase or kebab-case for assets and auxiliary files.
- **Variables & Functions:** camelCase for variables, objects, functions, and hook definitions.
- **TypeScript Interfaces/Types:** PascalCase prefixed with descriptive titles (e.g., `interface UserProfile`).

### 2. TypeScript and Safety
- Avoid using `any` unless absolutely necessary. Define explicit types or interfaces for parameters, return values, and objects.
- Ensure strict null checking is satisfied before submitting code.
- Ensure components handle empty/loading states gracefully (e.g., loading spinners, skeleton wrappers).

### 3. Styling & Framework Guidelines
- Use **Tailwind CSS** for layout adjustments. Leverage standard theme colors (`blue`, `navy`, `slate`) to preserve the custom professional theme.
- Avoid using inline `style={{ ... }}` unless calculating dynamic values at runtime.
- Do not import Tailwind CSS CDN packages directly in HTML or components.

---

## 📝 Commit Message Guidelines

We use semantic commit messages to make the release history transparent and easy to parse:

- **`feat:`** A new feature (e.g., `feat: add flashcard generation option`).
- **`fix:`** A bug fix (e.g., `fix: resolve sidebar viewport clipping on mobile`).
- **`docs:`** Documentation changes only (e.g., `docs: update deployment guidelines`).
- **`style:`** Changes that do not affect the meaning of the code (formatting, white-space, missing semi-colons, etc).
- **`refactor:`** A code change that neither fixes a bug nor adds a feature (e.g., `refactor: clean up firestore helper functions`).
- **`chore:`** Updating build tasks, package manager configs, etc. (e.g., `chore: update next.js package versions`).

**Example Commit Message:**
```bash
git commit -m "feat: implement interactive streak tracker animation"
```

---

## 🚀 Submitting a Pull Request (PR)

Before submitting your PR, complete this checklist:

1. **Verify Compilation:** Ensure the application builds without errors:
   ```bash
   npm run build
   ```
2. **Linting Check:** Run ESLint rules to identify style issues:
   ```bash
   npm run lint
   ```
3. **Synchronize with Upstream:** Fetch the latest changes from the upstream main branch:
   ```bash
   git fetch upstream
   git merge upstream/main
   ```
4. **Push to Your Fork:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a PR:** Go to the upstream repository on GitHub and select **New Pull Request**. Fill out the PR template thoroughly.
