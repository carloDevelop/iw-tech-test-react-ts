import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from './DropdownFilter';

describe("DropdownFilter ", ()=> {
  interface Option {
    label: string;
    value: string;
  }
  
  const options: Option[] = [
    { label: 'Option 1', value: 'value1' },
    { label: 'Option 2', value: 'value2' },
    { label: 'Option 3', value: 'value3' },
  ];
  
it('renders dropdown with options and selects default value', () => {
  const mockOnChange = jest.fn();
  render(<Dropdown options={options} defaultValue="value2" onChange={mockOnChange} />);

  const select = screen.getByRole('listbox');
  expect(select).toBeInTheDocument();
  expect(select).toHaveValue('value2');
});

it('handles user selection and calls onChange callback', () => {
  const mockOnChange = jest.fn();
  render(<Dropdown options={options} onChange={mockOnChange} />);

  const select = screen.getByRole('listbox');
  userEvent.selectOptions(select, 'value3');

  expect(select).toHaveValue('value3');
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange).toHaveBeenCalledWith('value3');
});

})

