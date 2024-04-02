import { render, screen, act } from "@testing-library/react";
import { TypeOfTable } from "../constants";
import { FavouriteItemsContext } from "../context/favouriteItems";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import { MemoryRouter } from "react-router-dom";

describe("EstablishmentsTableRow", () => {
  const mockEstablishment = {
    FHRSID: "12345",
    BusinessName: "Test Establishment",
    RatingValue: "5",
  };
  const mockContext = {
    Provider: ({ children }: any) => (
      <FavouriteItemsContext.Provider
        value={{
          favouriteItem: [],
          saveFavouriteItem: jest.fn(),
          removeItem: jest.fn(),
        }}
      >
        {children}
      </FavouriteItemsContext.Provider>
    ),
  };

  it("renders table row with link and rating for paginated table", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <EstablishmentsTableRow
              establishment={mockEstablishment}
              typeOfTable={TypeOfTable.Paginated}
            />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });

    const link = screen.getByText(mockEstablishment.BusinessName);
    const rating = screen.getByText(mockEstablishment.RatingValue);
    const checkbox = screen.queryByRole("checkbox");
    const removeButton = screen.queryByText("Remove");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/detail/${mockEstablishment.FHRSID}`);
    expect(rating).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(removeButton).not.toBeInTheDocument();
  });

  it("renders table row with link and rating for favourite table", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <EstablishmentsTableRow
              establishment={mockEstablishment}
              typeOfTable={TypeOfTable.Favourite}
            />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });

    const link = screen.getByText(mockEstablishment.BusinessName);
    const rating = screen.getByText(mockEstablishment.RatingValue);
    const checkbox = screen.queryByRole("checkbox");
    const removeButton = screen.queryByText("Remove");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/detail/${mockEstablishment.FHRSID}`);
    expect(rating).toBeInTheDocument();
    expect(checkbox).not.toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });
});
