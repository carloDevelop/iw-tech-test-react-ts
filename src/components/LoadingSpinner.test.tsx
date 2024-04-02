import { render, screen } from '@testing-library/react';
import Loading from './LoadingSpinner';

describe("Loading", () => {
  it('renders loading spinner without message', () => {
    render(<Loading />);
  
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).not.toHaveTextContent('Loading...');
  });
  
  it('renders loading spinner with custom message', () => {
    const customMessage = 'Fetching data...';
    render(<Loading message={customMessage} />);
  
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent(customMessage);
  });
})

