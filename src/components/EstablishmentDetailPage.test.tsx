import { render, screen, waitFor, act } from "@testing-library/react";
import { EstablishmentDetailPage } from "./EstablishmentDetailPage";
import { MemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";

describe("EstablishmentDetailPage", () => {
  beforeEach(() => {
    enableFetchMocks();
    fetch.resetMocks();
  });

  it("renders EstablishmentDetailPage and checks loading indicator", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <EstablishmentDetailPage />
        </MemoryRouter>
      );
    })
    
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("renders EstablishmentDetailPage with details", async () => {
    const expected = {
      AddressLine1: "Camden Street",
      AddressLine2: "192-198 Camden",
      AddressLine3: "",
      AddressLine4: "London",
      BusinessName: "Test Establisment",
      PostCode: "123456",
      RatingDate: "2023-10-12T00:00:00",
      RatingValue: "2",
      scores: {
        Hygiene: 15,
        Structural: 10,
        ConfidenceInManagement: 10,
      },
    };
    fetch.mockResponseOnce(JSON.stringify(expected));
    
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/detail/123"]}>
          <EstablishmentDetailPage />
        </MemoryRouter>
      );
      await waitFor(() => expect(screen.getByTestId("detailPage")).toBeInTheDocument());
    })
       
    expect(screen.getByTestId("detailPage")).toMatchSnapshot();
    expect(screen.getByTestId("fullAddress").textContent).toEqual(
      "Address: Camden Street 192-198 Camden, 123456 London"
    );
    expect(screen.getByTestId("dateOfInspection").textContent).toEqual(
      "Date of inspection: 10/12/2023"
    );
    expect(screen.getByTestId("rating").textContent).toEqual("Rating: 2");
  });
});
