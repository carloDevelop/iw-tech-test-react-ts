import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenericButton from './GenericButton';

describe("GenericButton", () => {

  it('renders button with text and handles click event', () => {
    const mockOnClick = jest.fn();
    render(<GenericButton text="Click Me" onClick={mockOnClick} />);
  
    const button = screen.getByRole('button', { name: /Click Me/i });
    expect(button).toBeInTheDocument();
  
    userEvent.click(button);
  
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders button with custom classes', () => {
    const customClasses = ['custom-class1', 'custom-class2'];
    render(<GenericButton text="Custom Button" classes={customClasses} />);
  
    const button = screen.getByRole('button', { name: /Custom Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button custom-class1 custom-class2');
  
  });
  
})
