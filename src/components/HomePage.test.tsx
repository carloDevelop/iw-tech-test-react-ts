import { render, screen, act } from "@testing-library/react";
import HomePage from "./HomePage";
import { FavouriteItemsContext } from "../context/favouriteItems";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
describe("HomePage", () => {
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
      {
        FHRSID: 23456,
        LocalAuthorityBusinessID: "201744",
        BusinessName: "Test Establishment 2",
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

  it("renders HomePage component", async () => {
    fetch
      .mockResponseOnce(JSON.stringify(mockAuthorities))
      .mockResponseOnce(JSON.stringify(mockEstablishment));
    const favouriteItem: { [key: string]: string }[] = [];
    const saveFavouriteItem = jest.fn();
    const removeItem = jest.fn();
    const mockContext = {
      favouriteItem,
      saveFavouriteItem,
      removeItem,
    }
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <FavouriteItemsContext.Provider
            value={mockContext}>
            <HomePage />
          </FavouriteItemsContext.Provider>
        </MemoryRouter>
      );
    });
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Food Hygiene Ratings")).toBeInTheDocument();

    const establishmentToSave = mockEstablishment.establishments[0];
    const table = screen.getByRole("table");
    const tableFirstRows = table.querySelectorAll("tr")[1];
    const checkbox = tableFirstRows.querySelector("input");

    await act(async () => {       
      if (checkbox) userEvent.click(checkbox);      
    });
        
    // Assert that saveFavouriteItem is called with correct data
    // await expect(mockContext.saveFavouriteItem).toHaveBeenCalled();
    // expect(mockContext.removeItem).toHaveBeenCalled();
  });
});
