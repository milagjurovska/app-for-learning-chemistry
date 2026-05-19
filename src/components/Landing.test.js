import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Landing from './Landing.js';

test('moves to the next quiz question after a correct answer', async () => {
    render(
        <MemoryRouter>
            <Landing />
        </MemoryRouter>
    );

    expect(screen.getByText(/what does chemistry study/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/the property of matter/i));
    await userEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(/what is matter made up of/i)).toBeInTheDocument();
    expect(screen.getByText(/2 of 5 questions/i)).toBeInTheDocument();
});

test('shows the quiz score after answering all questions', async () => {
    render(
        <MemoryRouter>
            <Landing />
        </MemoryRouter>
    );

    const correctAnswers = [
        /the property of matter/i,
        /^atoms\.$/i,
        /^formed when two atoms share electrons\.$/i,
        /^2$/i,
        /when two or more atoms combine/i,
    ];

    for (const answer of correctAnswers) {
        await userEvent.click(screen.getByText(answer));
        await userEvent.click(screen.getByRole('button', { name: /next/i }));
    }

    expect(screen.getByText(/you scored 5 out of 5/i)).toBeInTheDocument();
});
