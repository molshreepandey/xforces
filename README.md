
# xForces 

![Status](https://img.shields.io/badge/status-active-success.svg)
![Tech](https://img.shields.io/badge/tech-Next.js%20%7C%20TypeScript%20%7C%20Docker%20%7C%20Redis-blueviolet)

**xForces** is a high-performance **Competitive Programming Platform** designed to host coding contests, practice algorithmic problems, and provide real-time code execution.

Built with a modern tech stack, it features a **Next.js** frontend for a seamless user experience and a **Rust-based worker** for secure, high-speed code compilation and execution within isolated Docker containers.

---

## 🏗️ Architecture

The platform follows a microservices-inspired architecture to separate the web interface from the heavy lifting of code execution.

1.  **Frontend & API (Next.js)**: Handles user authentication, problem management, contest logic, and serves the UI.
2.  **Message Queue (Redis)**: Acts as a buffer between the web server and the execution engine, ensuring reliability under high load.
3.  **Execution Engine (TypeScript)**: A dedicated worker service that pulls jobs from Redis, compiles code, and executes it safely.
4.  **Sandbox (Docker & cgroups)**: Ensures that user code runs in a restricted environment with strict memory and CPU limits.

---

## Key Features

-   **Real-time Code Execution**: Instant feedback on submissions with detailed verdicts (AC, WA, TLE, MLE).
-   **Secure Sandboxing**: Uses Docker containers and Linux `cgroups` to isolate and limit resources for untrusted code.
<!---   **Contest System**: Support for timed competitive programming contests with live leaderboards.-->
<!---   **Multi-Language Support**: Architecture supports C++, Java, Python, and Rust (extensible to more).-->
<!---   **Problem Archive**: A searchable library of algorithmic problems with varying difficulty levels.-->
-   **User Dashboard**: Track submissions, ratings, and solve history.

---

## Tech Stack

### Core
-   **Frontend**: [Next.js](https://nextjs.org/) (React Framework), TypeScript
-   **Styling**: Tailwind CSS
-   **Backend Logic**: Next.js Server Actions / API Routes

### Execution & Infrastructure
-   **Worker Service**: [Bun](https://bun.sh/) (for maximum performance and safety)
-   **Containerization**: Docker
-   **Queue & Caching**: Redis
-   **Database**: PostgreSQL (Prisma ORM)

---

## Getting Started

Follow these instructions to set up the project locally for development.

### Prerequisites
Ensure you have the following installed:
-   **Node.js** (v18+)
-   **Bun** (latest stable)
-   **Docker** (Desktop or Engine)
-   **PostgreSQL** & **Redis** (or use Docker Compose)

### 1. Clone the Repository
```bash
git clone [https://github.com/pankajyadav-dev/xforces.git](https://github.com/pankajyadav-dev/xforces.git)
cd xforces

```

### 2. Environment Setup

Create a `.env` file in the root directory (or inside `apps/xforces` and `apps/engine`) and add your credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/xforces"
REDIS_URL="redis://localhost:6379"
AUTH_SECRET="your-secret-key"
AUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-auth-id"
AUTH_GOOGLE_SECRET="your-google-auth-secret"
AUTH_TRUST_HOST=true
REDIS_URL=redis://localhost:6379
```

### 3. Start Infrastructure (Database & Redis)

If you don't have Postgres/Redis running locally, you can use Docker Compose:

```bash
docker-compose up -d redis postgres

```

### 4. Install Dependencies & Run App (Development mode)

```bash
# Install Node dependencies
bun install
# Initialize Database
bun turbo db:migrate

# Start the Next.js development server
bun run dev

```

The web app should now be running at `http://localhost:3000`.


> **Note:** Ensure Docker is running, as the Typescript worker needs to spawn containers.

---


## 👤 Author

**Pankaj Yadav**

* GitHub: [@pankajyadav-dev]()
* LinkedIn: [Pankaj Yadav]()

