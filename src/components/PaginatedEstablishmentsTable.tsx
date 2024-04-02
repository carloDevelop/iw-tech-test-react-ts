import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import {
  getAuthorities,
  getEstablishmentRatings,
  filterEstablishmentsByAuthority,
} from "../api/ratingsAPI";
import LoadingSpinner from "./LoadingSpinner";
import Dropdown from "./DropdownFilter";
import styles from "../styles/PaginatedEstablishmentsTable.module.css";
import { TypeOfTable } from "../constants";
import { useContext } from "react";
import { FavouriteItemsContext } from "../context/favouriteItems";

interface Option {
  label: string;
  value: string;
}
const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {
  const favoritedEstablishments = useContext(FavouriteItemsContext);
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [authoritiesDropdownOptions, setAuthoritiesDropdownOptions] = useState<
    Option[]
  >([{ label: "All", value: "all" }]);
  useEffect(() => {
    getAuthorities().then(
      (result) => {
        handleAuthoritiesOptions(result?.authorities);
      },
      (error) => {
        setError(error);
      }
    );
    callApiEstablishmentsRatings(pageNum);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const favouritedId = favoritedEstablishments?.favouriteItem?.map(
      (element) => element.FHRSID
    );
    handleEstablisments(favouritedId);
  }, [favoritedEstablishments]);

  const handleEstablisments = (favouritedId: string[] | undefined) => {
    const newEstablisments: { [key: string]: string }[] = [...establishments];
    for (const establishment of newEstablisments) {
      if (favouritedId?.includes(establishment.FHRSID)) {
        establishment.favourite = "1";
      } else {
        establishment.favourite = "0";
      }
    }
    setEstablishments(newEstablisments);
  };
  const handleAuthoritiesOptions = (
    authoritiesList: { [key: string]: string }[]
  ) => {
    const filteredOptions = authoritiesDropdownOptions;
    authoritiesList.forEach((authority) => {
      filteredOptions.push({
        label: authority.Name,
        value: authority.LocalAuthorityId,
      });
    });
    setAuthoritiesDropdownOptions(filteredOptions);
  };

  async function handlePreviousPage() {
    setLoading(true);
    pageNum > 1 && setPageNum(pageNum - 1);
    if (currentFilter === "all") {
      callApiEstablishmentsRatings(pageNum);
    } else {
      callApiFilterEstablishments(currentFilter, pageNum);
    }
  }
  async function handleNextPage() {
    setLoading(true);
    pageNum < pageCount && setPageNum(pageNum + 1);
    if (currentFilter === "all") {
      callApiEstablishmentsRatings(pageNum);
    } else {
      callApiFilterEstablishments(currentFilter, pageNum);
    }
  }
  const handleChangeFilterAuthorities = (value: string) => {
    setLoading(true);
    setCurrentFilter(value);
    value === "all"
      ? callApiEstablishmentsRatings(pageNum)
      : callApiFilterEstablishments(value, pageNum);
  };

  const callApiEstablishmentsRatings = async (pageNum: number) => {
    getEstablishmentRatings(pageNum)
      .then(
        (result) => {
          setEstablishments(result.establishments);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const callApiFilterEstablishments = async (id: string, pageNum: number) => {
    filterEstablishmentsByAuthority(Number.parseInt(id), pageNum)
      .then(
        (result) => {
          setEstablishments(result?.establishments);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        <div className={styles.filterAuthorities}>
          <span>Filter by authorities</span>
          <Dropdown
            options={authoritiesDropdownOptions}
            onChange={handleChangeFilterAuthorities}
          />
        </div>
        {loading ? (
          <LoadingSpinner message="Loading..." />
        ) : (
          <div>
            <EstablishmentsTable
              type={TypeOfTable.Paginated}
              establishments={establishments}
            />
            <EstablishmentsTableNavigation
              pageNum={pageNum}
              pageCount={pageCount}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </div>
        )}
      </div>
    );
  }
};
