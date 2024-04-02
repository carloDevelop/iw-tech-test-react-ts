import { render, screen, waitFor, act } from "@testing-library/react";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import { FavouriteItemsContext } from "../context/favouriteItems";
import userEvent from "@testing-library/user-event";
import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
import { MemoryRouter } from "react-router-dom";

describe("PaginatedEstablishmentsTable", () => {
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
  const mockAuthorities = {
    authorities: [
      {
        LocalAuthorityId: 197,
        LocalAuthorityIdCode: "760",
        Name: "Aberdeen City",
        FriendlyName: "aberdeen-city",
        RegionName: "Scotland",
        CreationDate: "2010-08-17T15:30:24.87",
        LastPublishedDate: "2024-03-30T00:36:08.86",
      },
      {
        LocalAuthorityId: 198,
        LocalAuthorityIdCode: "761",
        Name: "Aberdeenshire",
        FriendlyName: "aberdeenshire",
        RegionName: "Scotland",
        CreationDate: "2010-08-17T15:30:24.87",
        LastPublishedDate: "2024-03-28T00:43:56.76",
      },
    ],
  };
  const mockEstablishment = {
    establishments: [
      {
        FHRSID: 1549111,
        LocalAuthorityBusinessID: "201744",
        BusinessName: "Test Establishment",
        BusinessType: "Takeaway/sandwich shop",
        RatingValue: "2",
        RatingDate: "2023-10-12T00:00:00",
      },
    ],
  };
  beforeEach(() => {
    enableFetchMocks();
    fetch.resetMocks();
  });

  it("renders loading spinner initially", async () => {
    fetch
      .mockResponseOnce(JSON.stringify(mockAuthorities))
      .mockResponseOnce(JSON.stringify(mockEstablishment));

    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <PaginatedEstablishmentsTable />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });
    const loadingSpinner = screen.getByRole("status");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders error message on API failure", async () => {
    fetch.mockRejectOnce(new Error("Api error"));
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <PaginatedEstablishmentsTable />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Error: Api error")).toBeInTheDocument();
    });
  });

  it("fetches data and renders establishments table with pagination", async () => {
    fetch
      .mockResponseOnce(JSON.stringify(mockAuthorities))
      .mockResponseOnce(JSON.stringify(mockEstablishment));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <PaginatedEstablishmentsTable />
          </mockContext.Provider>
        </MemoryRouter>
      );
      await waitFor(() => {
        expect(screen.getByText("Test Establishment")).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /[+]/i })
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /[-]/i })).toBeDisabled();
      });
    });
  });

  it("filters establishments by selected authority", async () => {
    fetch
      .mockResponseOnce(JSON.stringify(mockAuthorities))
      .mockResponseOnce(JSON.stringify(mockEstablishment));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <PaginatedEstablishmentsTable />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });
    await waitFor(async () => {
      const authorityDropdown = screen.getByRole("listbox");
      fetch.mockResponseOnce(JSON.stringify({}));
      userEvent.selectOptions(authorityDropdown, "Aberdeenshire");
    });
    await waitFor(() => {
      const table = screen.getByRole("table");
      const tableRows = table.querySelectorAll("td");

      expect(tableRows.length).toBe(0);
    });
  });

  it("navigates to previous and next pages", async () => {
    fetch
      .mockResponseOnce(JSON.stringify(mockAuthorities))
      .mockResponseOnce(JSON.stringify(mockEstablishment));
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <mockContext.Provider>
            <PaginatedEstablishmentsTable />
          </mockContext.Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      fetch
      .mockResponseOnce(JSON.stringify(mockAuthorities))
      .mockResponseOnce(JSON.stringify(mockEstablishment));
      userEvent.click(screen.getByRole("button", { name: /[+]/i }));
     
    });
    await waitFor(() => {
      const table = screen.getByRole("table");
      const tableRows = table.querySelectorAll("td");
      expect(tableRows.length).toBe(0);
    });
    await waitFor(() => {
      userEvent.click(screen.getByRole("button", { name: /[-]/i }));
      fetch
        .mockResponseOnce(JSON.stringify(mockAuthorities))
        .mockResponseOnce(JSON.stringify(mockEstablishment));
    });
    await waitFor(() => {
      expect(screen.getByText("Test Establishment")).toBeInTheDocument();
    });
  });
});
