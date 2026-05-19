import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockOnAuthStateChanged = jest.fn((auth, callback) => {
  callback(null);
  return jest.fn();
});

const mockSignOut = jest.fn();
const mockGetDoc = jest.fn();
const mockDoc = jest.fn();

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: (...args) => mockOnAuthStateChanged(...args),
  signOut: (...args) => mockSignOut(...args),
}));

jest.mock('firebase/firestore', () => ({
  doc: (...args) => mockDoc(...args),
  getDoc: (...args) => mockGetDoc(...args),
}));

jest.mock('./firebase.js', () => ({
  auth: {},
  db: {},
}));

import App from './App.js';

beforeEach(() => {
  mockOnAuthStateChanged.mockImplementation((auth, callback) => {
    callback(null);
    return jest.fn();
  });
  mockGetDoc.mockResolvedValue({
    exists: () => false,
    data: () => ({}),
  });
  mockDoc.mockReturnValue({ path: 'users/user-123' });
});

test('renders chemistry app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn chemistry the fun way/i);
  expect(linkElement).toBeInTheDocument();
});

test('opens and closes the login form', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /log in/i }));
  expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /close login form/i }));
  expect(screen.queryByRole('form', { name: /login form/i })).not.toBeInTheDocument();
});

test('opens the sign up form with labeled fields', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  expect(screen.getByRole('form', { name: /sign up form/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^surname$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
});

test('opens the profile page from the username in navigation', async () => {
  mockOnAuthStateChanged.mockImplementation((auth, callback) => {
    callback({
      uid: 'user-123',
      displayName: 'adalab',
      email: 'ada@example.com',
    });
    return jest.fn();
  });
  mockGetDoc.mockResolvedValue({
    exists: () => true,
    data: () => ({
      firstName: 'Ada',
      lastName: 'Lovelace',
      username: 'adalab',
      email: 'ada@example.com',
    }),
  });

  render(<App />);

  await userEvent.click(screen.getByRole('link', { name: /@adalab/i }));

  expect(await screen.findAllByText(/ada lovelace/i)).toHaveLength(2);
  expect(screen.getByText(/student profile/i)).toBeInTheDocument();
  expect(screen.getByText(/ada@example.com/i)).toBeInTheDocument();
});
