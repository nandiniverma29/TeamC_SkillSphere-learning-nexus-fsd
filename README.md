# 🎓 Enterprise Learning Platform

**AI-Powered Learning & Career Development Platform**

An all-in-one learning platform that combines structured courses, AI-driven personalized roadmaps, hands-on practice, and career tools — taking students from *"learning a skill"* to *"being job-ready"* in one connected experience.

Built by **Team C** | Full-Stack Project · React + Spring Boot + MySQL + Gemini AI
Working under the guidance of **Shakthi Gopalakrishnan**

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup-spring-boot)
  - [Frontend Setup](#2-frontend-setup-react--vite)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [User Roles](#-user-roles)
- [Team & Contributions](#-team--contributions)
- [Git Workflow](#-git-workflow)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 📖 About the Project

Online learning today is often **generic**, **fragmented**, and disconnected from career outcomes — courses don't adapt to the learner, and certificates, practice, and career prep live on separate platforms. Students struggle to bridge the gap between *learning a skill* and *being job-ready*.

**Enterprise Learning Platform** solves this by unifying:
- Structured, catalog-based courses
- AI-generated personalized learning roadmaps
- Hands-on practice and assessments
- Career-readiness tools (resume builder, skill-gap analysis)
- Community and gamification

...into a single, connected student journey: **Sign Up → Assessment → AI Roadmap → Enroll → Certify.**

---

## ✨ Features

| Feature | Description |
|---|---|
| 📚 **Course Catalog** | Structured, browsable courses with lessons and progress tracking |
| 🧭 **AI Roadmap Generator** | Gemini-powered personalized learning paths based on skill gaps |
| 🤖 **AI Chatbot Assistant** | In-app Gemini-powered assistant for real-time learner support |
| 📝 **Quizzes & Assignments** | Auto-graded quizzes and instructor-reviewed assignments |
| 📊 **Skill Gap Analysis** | Identifies missing skills against target career paths |
| 🛠️ **Practice Modules** | Hands-on exercises to reinforce learning |
| 📄 **Resume Builder** | Generates job-ready resumes from learner profile & achievements |
| 🏆 **Leaderboard & Gamification** | Badges, points, and rankings to drive engagement |
| 💬 **Community Forum** | Threaded discussions with upvotes between learners |
| 🎓 **Digital Certificates** | Verifiable certificates on course completion |
| 🔐 **Secure Auth** | JWT-based auth plus Google OAuth2 login |
| 📅 **Live Sessions & Scheduling** | Session booking and instructor-led live classes |
| 🔔 **Notifications & Announcements** | Platform and course-level updates |

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- React Router v7
- ESLint

**Backend**
- Spring Boot 3.5 (Java 17)
- Spring Security (JWT + Google OAuth2)
- Spring Data JPA / Hibernate
- MySQL
- Lombok
- Spring Mail (email notifications)

**AI Integration**
- Google Gemini API (AI Roadmap + Chatbot)

**Build Tools**
- Maven (backend), npm (frontend)

---

## 🏗️ System Architecture

```
┌──────────────────────────┐
│   Client & External      │
│  React + Vite UI         │
│  Google Gemini API       │
└─────────────┬─────────────┘
              │ REST (JSON) / JWT
┌─────────────▼─────────────┐
│      Core Backend         │
│   Spring Boot REST API    │
└─────────────┬─────────────┘
              │ Spring Data JPA
┌─────────────▼─────────────┐
│    Data & Security        │
│  MySQL + Spring Security  │
│  JWT + Google OAuth2      │
└────────────────────────────┘
```

- **React + Vite** — responsive client UI
- **Spring Boot** — REST API layer (controllers, services, business logic)
- **Spring Security** — JWT authentication + Google OAuth2 login
- **MySQL (via Spring Data JPA / Hibernate)** — persistence layer
- **Gemini API** — external AI integration for roadmap generation & chatbot

---

## 📂 Project Structure

```
TeamC_EnterpriseLearning/
├── client/                    # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                # Axios/fetch API client
│   │   ├── components/         # Pages & UI components
│   │   ├── context/             # Auth, Theme, Toast contexts
│   │   └── data/
│   ├── .env.example
│   └── package.json
│
├── server/                    # Spring Boot backend
│   ├── src/main/java/com/skillsphere/server/
│   │   ├── controller/          # REST controllers
│   │   ├── service/             # Business logic
│   │   ├── repository/          # Spring Data JPA repositories
│   │   ├── model/               # JPA entities
│   │   ├── dto/                 # Request/response DTOs
│   │   ├── security/            # JWT & OAuth2 handlers
│   │   ├── exception/           # Global exception handling
│   │   └── config/               # Security & app configuration
│   ├── src/main/resources/
│   │   └── application.properties.example
│   └── pom.xml
│
├── LICENSE
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version |
|---|---|
| Node.js | 18+ |
| npm | 9+ |
| Java (JDK) | 17 |
| Maven | Bundled (`mvnw` included) |
| MySQL | 8+ |

---

### 1. Backend Setup (Spring Boot)

```bash
# Navigate to the server folder
cd server

# Copy the config template and fill in your own values
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Edit `application.properties` with your local MySQL credentials, Google OAuth2 keys, JWT secret, mail credentials, and Gemini API key (see [Environment Variables](#-environment-variables) below).

Create the database in MySQL:

```sql
CREATE DATABASE skillsphere_db;
```

Run the backend:

```bash
# Windows
mvnw.cmd spring-boot:run

# macOS/Linux
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**.

---

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to the client folder
cd client

# Install dependencies
npm install

# Copy the environment template
cp .env.example .env
```

`.env` should point to your backend:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Run the frontend:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 🔑 Environment Variables

### Backend — `server/src/main/resources/application.properties`

| Variable | Description |
|---|---|
| `spring.datasource.url` | MySQL connection URL |
| `spring.datasource.username` / `password` | MySQL credentials |
| `spring.security.oauth2.client.registration.google.client-id` / `client-secret` | Google OAuth2 credentials |
| `jwt.secret` | 64-character HMAC-SHA256 secret for signing JWTs |
| `jwt.expiration` | Token expiry in ms (default: `86400000` = 24h) |
| `app.admin-secret-key` | Passkey required for admin account creation |
| `spring.mail.username` / `password` | Gmail address + App Password for email notifications |
| `app.frontend-url` | Frontend URL (for OAuth2 redirects/emails) |
| `gemini.api.key` | Google Gemini API key |
| `gemini.api.url` | Gemini generateContent endpoint |

> ⚠️ Never commit real secrets. `application.properties` and `.env` are already git-ignored — only the `.example` templates are tracked.

### Frontend — `client/.env`

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API |

---

## 📜 Available Scripts

### Frontend (`client/`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

### Backend (`server/`)

| Command | Description |
|---|---|
| `./mvnw spring-boot:run` | Run the backend in dev mode |
| `./mvnw clean install` | Build the project and run tests |
| `./mvnw test` | Run backend tests only |
| `./mvnw clean package` | Package as a runnable JAR |

---

## 👥 User Roles

| Role | Capabilities |
|---|---|
| 🎓 **Student** | Enroll in courses, track progress, take quizzes, earn certificates |
| 🧑‍🏫 **Instructor** | Create courses, manage lessons, monitor student performance |
| 🛡️ **Admin** | Oversee platform, manage users, ensure content quality |

---

## 👨‍💻 Team & Contributions

**Team C** — Full-Stack Project, guided by **Shakthi Gopalakrishnan**

| Member | Role | Contribution |
|---|---|---|
| **Nandini Verma** | Frontend UI Lead | Crafted React pages, components, dashboards, courses, forms, and layouts |
| **Rahul** | Backend & API Architect | Developed Spring Boot REST APIs, controllers, services, and business logic |
| **Rajeev** | Database Specialist | Designed and managed MySQL schema, entities, repositories, and data relationships |
| **Sasi Madhuri** | Authentication & Security Engineer | Implemented Login/Signup, JWT, Google OAuth2, and Spring Security |
| **Madhumitha** | AI & Deployment Strategist | Integrated Gemini AI Chatbot, managed roadmap features, testing, and deployment |

---

## 🔀 Git Workflow

This project follows a simple feature-branch workflow:

1. **Clone the repo**
   ```bash
   git clone https://github.com/nandiniverma29/TeamC_SkillSphere-learning-nexus-fsd.git
   ```
2. **Create a feature branch** off `main` for any new work
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "Add: short description of change"
   ```
4. **Push your branch and open a Pull Request** into `main`
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Review & merge** — at least one teammate reviews before merging into `main`.
6. Keep `main` deployable at all times — avoid pushing directly to it once the team grows past solo work.

> 💡 **Suggestion:** As the team scales, consider protecting `main` on GitHub (require PR reviews, disable force-push) so no one accidentally overwrites shared history.

---

## 🗺️ Roadmap

Planned enhancements beyond the current release:

- 📱 **Mobile App** — learn on the go
- 🤖 **Deeper AI Personalization** — richer, more adaptive roadmap generation
- 🤝 **Employer Partnerships** — internship and hiring integrations
- 👥 **Peer Mentorship** — structured mentor-mentee matching

---

## 💡 Suggestions for Next Steps

A few things worth considering as the project matures:

- **API documentation**: Add Swagger/OpenAPI (`springdoc-openapi`) so all REST endpoints are self-documented.
- **Testing**: Expand backend unit/integration tests (`ServerApplicationTests.java` currently has minimal coverage) and add frontend tests (Vitest/React Testing Library).
- **CI/CD**: Add a GitHub Actions workflow to run `mvn test` and `npm run lint`/`build` on every PR before merge.
- **Docker**: Containerize both `client` and `server` with a `docker-compose.yml` (including MySQL) for one-command local setup.
- **Branch protection**: Enable required PR reviews on `main` to prevent accidental force-pushes now that the repo is stabilized.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<p align="center">Made with ❤️ by <b>Team C</b></p>
