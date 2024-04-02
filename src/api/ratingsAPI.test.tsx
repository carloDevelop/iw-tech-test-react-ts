import { enableFetchMocks } from "jest-fetch-mock";
import { 
  getEstablishmentRatings, 
  getEstablishmentDetails,
  getAuthorities,
  filterEstablishmentsByAuthority
} from "./ratingsAPI";
import fetch from "jest-fetch-mock";

enableFetchMocks();

describe("Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the ratings api with the provided page number and returns the data", async () => {
    // Given
    let pageNum = 1;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getEstablishmentRatings(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`
    );
  });

  it("call the ratings api with the provided id and returns the data", async () => {
    const id = "123";
    const expected = { testing: "test detail" };
    fetch.mockResponseOnce(JSON.stringify(expected));
 
    const actual = await getEstablishmentDetails(id);

    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/establishments/${id}`
    );
  });

  it("call the ratings api Authorities and returns the data", async () => {
    const expected = { authorities: "test authority" };
    fetch.mockResponseOnce(JSON.stringify(expected));
 
    const actual = await getAuthorities();

    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Authorities`
    );
  });

  it("call the ratings api with provided pageNumber, authorityId and filters the establisments", async () => {
    const authorityId = 4321;
    const pageNum = 1;
    const expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
 
    const actual = await filterEstablishmentsByAuthority(authorityId, pageNum);

    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments?pageNumber=${pageNum}&pageSize=10&localAuthorityId=${authorityId}`
    );
  });
});
