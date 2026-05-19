# Presentation Guide

Use this as the short explanation during the project presentation.

## What The Project Does

This is an interactive chemistry learning application. The user can read lessons, answer quiz questions, play a memory game, create reactions in a virtual lab, sign in with Firebase, and open their profile page.

The project has:

- React frontend
- Firebase authentication and Firestore profile storage
- Java Spring Boot backend
- JUnit backend tests
- React Testing Library frontend tests
- JMeter HTTP smoke/performance tests
- JaCoCo backend coverage report

## Testing Levels

I tested the application on multiple levels:

| Level | What I Tested | Tool |
| --- | --- | --- |
| Unit | Service logic directly, without HTTP | JUnit 5 |
| Integration | Controllers, validation, JSON responses, and services together | Spring MockMvc |
| UI component | Buttons, forms, quiz flow, profile navigation, lab flow | React Testing Library |
| End-to-end style | Full user flows through rendered React routes | React Testing Library |
| Performance/smoke | Real backend endpoints over HTTP | JMeter |

## How I Chose The Tests

I did not choose only random examples. I used input space partitioning and graph coverage.

### Input Space Partitioning

For the lab reaction checker, the main input is the list of selected elements.

Characteristics:

- Number of elements: 0, 1, 2, more than 2
- Reaction type: correct pair or incorrect pair
- Element order: normal order or reversed order
- Formatting: clean value or value with whitespace
- Access path: service directly or HTTP controller

Representative tests:

- `H + O` creates water
- `C + O` creates carbon dioxide
- `Na + Cl` creates salt
- `Cl + Na` still works because order should not matter
- `H + Na` is rejected
- one element is rejected by validation
- three elements are rejected by validation
- whitespace around an element is trimmed

### Graph Coverage

For `ReactionService.check`, the control flow has one important decision:

```text
Start
Create normalized key
Find reaction by key
If found -> return correct response
If not found -> return incorrect response
End
```

The tests cover:

- correct branch
- incorrect branch
- normalization before lookup
- order-independent lookup

That gives node coverage and edge coverage for the important decision in the service.

## Commands To Show

Frontend tests:

```bash
npm run test:ci
```

Frontend coverage:

```bash
npm run test:coverage
```

Backend tests in IntelliJ Maven:

```bash
test
```

Backend tests from terminal if Maven is on PATH:

```bash
cd backend
mvn test
```

Backend JaCoCo coverage:

```text
backend/target/site/jacoco/index.html
```

JMeter after the backend is running:

```bash
cd backend
mvn verify -Pjmeter
```

## What To Say If They Ask About JMeter

JMeter is used here as a backend smoke/performance test. It calls real HTTP endpoints on the running Spring Boot server:

- `/api/health`
- `/api/lessons`
- `/api/quiz/intro`
- `/api/reactions/check`

This proves the API works outside unit tests and can be tested as a running service.

## Short Script

My project is not only tested through one test type. I have unit tests for backend service logic, integration tests for controllers and validation, React Testing Library tests for the frontend user flows, and JMeter tests for running backend endpoints. For selecting the test cases, I used input space partitioning on the reaction checker and graph coverage on the main service decision, so the tests cover both successful and unsuccessful branches.
