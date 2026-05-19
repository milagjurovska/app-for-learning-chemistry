import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login.js';

const mockSignInWithEmailAndPassword = jest.fn();

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
}));

jest.mock('../firebase.js', () => ({
    auth: { name: 'mock-auth' },
}));

beforeEach(() => {
    mockSignInWithEmailAndPassword.mockReset();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('logs in with email and password and calls success callback', async () => {
    const onSuccess = jest.fn();
    mockSignInWithEmailAndPassword.mockResolvedValue({ user: { email: 'student@example.com' } });

    render(<Login onSuccess={onSuccess} />);

    await userEvent.type(screen.getByLabelText(/^email$/i), 'student@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'Secret123');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
        expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
            { name: 'mock-auth' },
            'student@example.com',
            'Secret123'
        );
    });
    expect(onSuccess).toHaveBeenCalledTimes(1);
});

test('shows invalid credentials message for wrong password', async () => {
    mockSignInWithEmailAndPassword.mockRejectedValue({ code: 'auth/wrong-password' });

    render(<Login onSuccess={jest.fn()} />);

    await userEvent.type(screen.getByLabelText(/^email$/i), 'student@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'badpass');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Invalid email or password. Please try again.');
    });
});
