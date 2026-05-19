# Chemistry Backend

Java Spring Boot API for the interactive chemistry learning app.

## Run

```bash
mvn spring-boot:run
```

The API starts on `http://localhost:8080`.

## Firebase Admin

The frontend still uses Firebase Auth directly. This backend can verify Firebase ID tokens for protected API calls.

Set one of these before starting the backend:

```bash
firebase.service-account.path=C:/path/to/firebase-service-account.json
```

or:

```bash
firebase.service-account.json={"type":"service_account",...}
```

Then call protected routes with:

```bash
Authorization: Bearer <firebase-id-token>
```

## Useful endpoints

- `GET /api/health`
- `GET /api/lessons`
- `GET /api/lessons/{slug}`
- `GET /api/quiz/intro`
- `POST /api/reactions/check`
- `GET /api/auth/me`

## Tests

Run the JUnit test suite:

```bash
mvn test
```

Run the JMeter smoke/load plan after the backend is already running on `localhost:8080`:

```bash
mvn verify -Pjmeter
```

The JMeter plan lives at `src/test/jmeter/chemistry-backend.jmx`.

## Frontend connection

Create a frontend `.env.local` with:

```bash
REACT_APP_API_BASE_URL=http://localhost:8080
```

If this variable is missing, the React app keeps using its local chemistry rules so it can still run as a static app.
