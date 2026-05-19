# Testing Strategy

This project is an interactive chemistry learning application with a React frontend, Firebase authentication, and a Java Spring Boot backend. The tests are organized so they can be explained using the testing techniques from class, not only as a random list of test cases.

## Test Levels

| Level | Tool | Location | Purpose |
| --- | --- | --- | --- |
| Unit tests | JUnit 5 | `backend/src/test/java/.../service` | Test service logic directly without HTTP or UI. |
| Integration tests | JUnit 5 + Spring MockMvc | `backend/src/test/java/.../controller` | Test controllers, validation, service calls, and JSON responses together. |
| Component / UI tests | React Testing Library | `src/**/*.test.js` | Test user-visible frontend behavior through accessible controls. |
| End-to-end style tests | React Testing Library + app routes | `src/App.test.js`, `src/components/Landing.test.js` | Test navigation and full user flows inside the rendered app. |
| Performance / smoke tests | JMeter | `backend/src/test/jmeter/chemistry-backend.jmx` | Test running backend endpoints over HTTP. |

## How To Run

Frontend:

```bash
npm run test:ci
npm run test:coverage
```

Backend:

```bash
cd backend
mvn test
```

Backend coverage report:

```bash
cd backend
mvn test
```

Open:

```text
backend/target/site/jacoco/index.html
```

JMeter, after backend is already running on `localhost:8080`:

```bash
cd backend
mvn verify -Pjmeter
```

## Input Space Partitioning

The most important backend operation is reaction checking: `POST /api/reactions/check`.

### Characteristics

| Characteristic | Blocks | Representative Tests |
| --- | --- | --- |
| Number of selected elements | 0, 1, 2, more than 2 | invalid payload test with one element; valid two-element tests |
| Element pair validity | known reaction, unknown reaction | `H + O`, `Na + Cl`, `H + Na` |
| Element order | canonical order, reversed order | `Na + Cl`, `Cl + Na` |
| Element formatting | clean, whitespace-padded | `Na`, `" Na "` |
| Authentication header | missing, wrong prefix, blank bearer token | `FirebaseTokenServiceTest` |
| Response channel | service direct, HTTP controller | `ReactionServiceTest`, `ApiControllerTest` |

### Coverage

The chosen tests cover valid classes, invalid classes, boundary cases for list size, order independence, and formatting normalization.

## Graph Coverage

The `ReactionService.check(elements)` control-flow graph can be described as:

```text
N1 Start
N2 Create normalized reaction key
N3 Lookup reaction in CORRECT_REACTIONS
N4 Is reaction found?
N5 Return correct response
N6 Return incorrect response
N7 End
```

Edges:

```text
E1 N1 -> N2
E2 N2 -> N3
E3 N3 -> N4
E4 N4 true -> N5
E5 N4 false -> N6
E6 N5 -> N7
E7 N6 -> N7
```

Basis paths:

| Path | Meaning | Test |
| --- | --- | --- |
| P1: N1-N2-N3-N4-N5-N7 | Valid known reaction | `acceptsCorrectReactionInEitherOrder`, `returnsCarbonDioxideHtmlFormula` |
| P2: N1-N2-N3-N4-N6-N7 | Unknown reaction | `rejectsUnknownReaction` |
| P3: N1-N2-N3-N4-N5-N7 with whitespace normalization | Valid after trim | `trimsElementsBeforeCheckingReaction` |

This satisfies node coverage and edge coverage for the service decision point.

## Frontend User Flow Coverage

| Flow | Test |
| --- | --- |
| App opens on landing page | `renders chemistry app title` |
| Login modal opens and closes | `opens and closes the login form` |
| Signup modal has all required fields | `opens the sign up form with labeled fields` |
| Signed-in user opens profile page | `opens the profile page from the username in navigation` |
| Quiz advances after answer | `moves to the next quiz question after a correct answer` |
| Full quiz can finish with score | `shows the quiz score after answering all questions` |
| Lab accepts correct reaction | `checks a correct water reaction` |
| Lab rejects incomplete and incorrect input | `shows a useful message when only one element is selected`, `rejects an incorrect reaction and clears the selected tube` |
| Duplicate lab reaction is not double-counted | `does not count the same correct reaction twice` |
| Lab completion message appears | `shows the final message after all three reactions are completed` |

## Extra Authentication Coverage

Firebase token verification is tested without needing a real Firebase token by covering the local validation before the SDK call:

| Case | Expected Result |
| --- | --- |
| Missing `Authorization` header | rejected |
| Header without `Bearer` prefix | rejected |
| Blank bearer token | rejected |

This keeps the unit tests deterministic while the real Firebase Admin verification remains available in the running backend.

## Presentation Checklist

During presentation, show:

1. `npm run test:ci` for RTL tests.
2. IntelliJ Maven `test` for JUnit tests.
3. `target/site/jacoco/index.html` for backend coverage.
4. Backend running on `localhost:8080/api/health`.
5. JMeter plan `chemistry-backend.jmx`.
6. This document, especially the Input Space Partitioning and Graph Coverage sections.
