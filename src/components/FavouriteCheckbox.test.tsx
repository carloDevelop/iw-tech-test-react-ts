import { render, screen, fireEvent } from "@testing-library/react";
import FavouriteCheckbox from "./FavouriteCheckbox";

describe("FavouriteCheckbox", () => {
  const mockOnChange = jest.fn();
  it("renders checkbox and reflects initial checked state", () => {
    render(<FavouriteCheckbox isChecked={true} onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it("renders checkbox and reflects unchecked state", () => {
    render(<FavouriteCheckbox isChecked={false} onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("handles checkbox change and calls onChange callback", () => {
    render(<FavouriteCheckbox isChecked={false} onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
