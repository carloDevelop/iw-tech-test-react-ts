import { render, screen, act } from "@testing-library/react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { TypeOfTable } from "../constants";
import { FavouriteItemsContext } from "../context/favouriteItems";
import { MemoryRouter } from "react-router-dom";

describe("EstablishmentsTable", () => {
  const establishments = [
    { BusinessName: "Business 1", RatingValue: "4", favourite: "1" },
    { BusinessName: "Business 2", RatingValue: "3", favourite: "0" },
  ];
  it("renders table with establishments", () => {
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

    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <EstablishmentsTable
              establishments={establishments}
              type={TypeOfTable.Paginated}
            />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });

    const table = screen.getByRole("table");
    const tableRows = table.querySelectorAll("tr");

    expect(tableRows.length).toBe(3);
    expect(screen.getByText("Business Name")).toBeInTheDocument();
    expect(screen.getByText("Rating Value")).toBeInTheDocument();
    expect(screen.getByText("Favourite")).toBeInTheDocument();

    expect(screen.getByText("Business 1")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
