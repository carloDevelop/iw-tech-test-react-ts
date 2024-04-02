import { render, screen, act } from "@testing-library/react";
import { FavouritedEstablishmentsTable } from "./FavouritedEstablishmentsTable";
import { FavouriteItemsContext } from "../context/favouriteItems";
import { MemoryRouter } from "react-router-dom";
describe("FavouritedEstablishmentsTable ", () => {
  it("renders table when favourite items are present", () => {
    const favouriteItems = [{ id: "1", name: "Test Establishment" }];

    const mockContext = {
      Provider: ({ children }: any) => (
        <FavouriteItemsContext.Provider
          value={{
            favouriteItem: favouriteItems,
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
            <FavouritedEstablishmentsTable />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });

    const tableHeader = screen.getByText("Favourite table");
    const establishmentsTable = screen.getByRole("table");

    expect(tableHeader).toBeInTheDocument();
    expect(establishmentsTable).toBeInTheDocument();
  });

  it("renders empty div when no favourite items", () => {
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
            <FavouritedEstablishmentsTable />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });

    expect(screen.queryByText("Favourite table")).not.toBeInTheDocument();
  });
});
