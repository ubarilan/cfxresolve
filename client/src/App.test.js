import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders address or code link', () => {
    render(<App />);
    const linkElement = screen.getByText(/address or code/i);
});
