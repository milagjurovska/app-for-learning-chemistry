import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainContainer from './MainContainer.js';

test('checks a correct water reaction', async () => {
    render(<MainContainer />);

    await userEvent.click(screen.getByRole('button', { name: /select h/i }));
    await userEvent.click(screen.getByRole('button', { name: /select o/i }));
    expect(screen.getByTestId('selected-elements')).toHaveTextContent('H + O');

    await userEvent.click(screen.getByRole('button', { name: /check reaction/i }));

    expect(await screen.findByRole('status')).toHaveTextContent('Correct! You got H2O!');
    expect(screen.getByTestId('reaction-progress')).toHaveTextContent('1 of 3 reactions completed');
});

test('shows a useful message when only one element is selected', async () => {
    render(<MainContainer />);

    await userEvent.click(screen.getByRole('button', { name: /select na/i }));
    await userEvent.click(screen.getByRole('button', { name: /check reaction/i }));

    expect(await screen.findByRole('status')).toHaveTextContent('Please select two elements.');
    expect(screen.getByTestId('selected-elements')).toHaveTextContent('Na');
});

test('does not count the same correct reaction twice', async () => {
    render(<MainContainer />);

    await userEvent.click(screen.getByRole('button', { name: /select h/i }));
    await userEvent.click(screen.getByRole('button', { name: /select o/i }));
    await userEvent.click(screen.getByRole('button', { name: /check reaction/i }));

    expect(await screen.findByTestId('reaction-progress')).toHaveTextContent('1 of 3 reactions completed');

    await userEvent.click(screen.getByRole('button', { name: /select o/i }));
    await userEvent.click(screen.getByRole('button', { name: /select h/i }));
    await userEvent.click(screen.getByRole('button', { name: /check reaction/i }));

    expect(screen.getByTestId('reaction-progress')).toHaveTextContent('1 of 3 reactions completed');
});

test('rejects an incorrect reaction and clears the selected tube', async () => {
    render(<MainContainer />);

    await userEvent.click(screen.getByRole('button', { name: /select h/i }));
    await userEvent.click(screen.getByRole('button', { name: /select na/i }));
    await userEvent.click(screen.getByRole('button', { name: /check reaction/i }));

    expect(await screen.findByRole('status')).toHaveTextContent('False! Try again.');
    expect(screen.getByTestId('selected-elements')).toHaveTextContent('Empty');
    expect(screen.getByTestId('reaction-progress')).toHaveTextContent('0 of 3 reactions completed');
});

test('shows the final message after all three reactions are completed', async () => {
    render(<MainContainer />);

    await completeReaction('H', 'O');
    await completeReaction('C', 'O');
    await completeReaction('Na', 'Cl');

    expect(screen.getByTestId('reaction-progress')).toHaveTextContent('3 of 3 reactions completed');
    expect(screen.getByText(/you have successfully completed all reactions/i)).toBeInTheDocument();
});

async function completeReaction(first, second) {
    await userEvent.click(screen.getByRole('button', { name: new RegExp(`^select ${first}$`, 'i') }));
    await userEvent.click(screen.getByRole('button', { name: new RegExp(`^select ${second}$`, 'i') }));
    await userEvent.click(screen.getByRole('button', { name: /check reaction/i }));
}
