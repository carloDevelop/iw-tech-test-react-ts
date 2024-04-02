import { render, screen } from "@testing-library/react";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";

describe("EstablishmentsTableNavigation ", () => {
  it("renders navigation with buttons", () => {
    const props = {
      pageNum: 1,
      pageCount: 5,
      onPreviousPage: jest.fn(),
      onNextPage: jest.fn(),
    };

    render(<EstablishmentsTableNavigation {...props} />);

    const previousButton = screen.getByText("-");
    const nextButton = screen.getByText("+");
    const pageNumber = screen.getByText("1");

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(pageNumber).toBeInTheDocument();
  });
});
