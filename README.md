# Application for learning chemistry

## Welcome to a kid-friendly chemistry app designed to make learning science fun! ⚗️ 
This app is easy to use and explains chemical concepts in a way that children from all ages would understand. It uses different teaching techniques such as quizzes, memory game and a virtual chemical lab where the children get to test their aquired knowledge.

## Getting started

This link will take you to the page: https://milagjurovska.github.io/app-for-learning-chemistry/

## Technologies used:
REACT.js, HTML, CSS, Firebase, Java Spring Boot

## Testing

The full testing strategy is documented in `docs/TESTING_STRATEGY.md`. It includes unit tests, integration tests, React Testing Library tests, JMeter tests, input-space partitioning, and graph coverage mapping. A short presentation guide is available in `docs/PRESENTATION_GUIDE.md`.

Frontend tests:

```bash
npm run test:ci
```

Frontend coverage:

```bash
npm run test:coverage
```

## Backend

A Java backend lives in `backend/`. It exposes chemistry lessons, quiz content, reaction checking, and Firebase ID-token verification endpoints.

Run it with:

```bash
cd backend
mvn spring-boot:run
```

To let the React app call it locally, add `.env.local` in the project root:

```bash
REACT_APP_API_BASE_URL=http://localhost:8080
```

Firebase Auth still runs in the frontend. The backend is ready to verify Firebase tokens when you add a Firebase service account; see `backend/README.md`.
