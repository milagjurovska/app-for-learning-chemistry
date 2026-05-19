import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockCreateUserWithEmailAndPassword = jest.fn();
const mockUpdateProfile = jest.fn();
const mockDoc = jest.fn();
const mockSetDoc = jest.fn();

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: (...args) => mockCreateUserWithEmailAndPassword(...args),
    updateProfile: (...args) => mockUpdateProfile(...args),
}));

jest.mock('firebase/firestore', () => ({
    doc: (...args) => mockDoc(...args),
    setDoc: (...args) => mockSetDoc(...args),
}));

jest.mock('../firebase.js', () => ({
    auth: { name: 'mock-auth' },
    db: { name: 'mock-db' },
}));

import SignUp from './SignUp.js';

beforeEach(() => {
    mockCreateUserWithEmailAndPassword.mockReset();
    mockUpdateProfile.mockReset();
    mockDoc.mockReset();
    mockSetDoc.mockReset();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('blocks passwords without a number before calling Firebase', async () => {
    render(<SignUp onSuccess={jest.fn()} />);

    await fillSignUpForm('Password');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(window.alert).toHaveBeenCalledWith('Password must contain at least one number.');
    expect(mockCreateUserWithEmailAndPassword).not.toHaveBeenCalled();
});

test('creates a user profile in Firebase and Firestore', async () => {
    const onSuccess = jest.fn();
    const user = { uid: 'user-123' };
    const userDoc = { path: 'users/user-123' };
    mockCreateUserWithEmailAndPassword.mockResolvedValue({ user });
    mockUpdateProfile.mockResolvedValue();
    mockDoc.mockReturnValue(userDoc);
    mockSetDoc.mockResolvedValue();

    render(<SignUp onSuccess={onSuccess} />);

    await fillSignUpForm('Password1');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
        expect(mockSetDoc).toHaveBeenCalledWith(userDoc, {
            firstName: 'Ada',
            lastName: 'Lovelace',
            username: 'adalab',
            email: 'ada@example.com',
        });
    });
    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        { name: 'mock-auth' },
        'ada@example.com',
        'Password1'
    );
    expect(mockUpdateProfile).toHaveBeenCalledWith(user, { displayName: 'adalab' });
    expect(mockDoc).toHaveBeenCalledWith({ name: 'mock-db' }, 'users', 'user-123');
    expect(onSuccess).toHaveBeenCalledTimes(1);
});

async function fillSignUpForm(password) {
    await userEvent.type(screen.getByLabelText(/^name$/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/^surname$/i), 'Lovelace');
    await userEvent.type(screen.getByLabelText(/^username$/i), 'AdaLab');
    await userEvent.type(screen.getByLabelText(/^email$/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), password);
}
