import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/EstablishmentDetailPage.module.css";
import {
  getEstablishmentDetails,
  EstablishmentDetailType,
} from "../api/ratingsAPI";
import LoadingSpinner from "./LoadingSpinner";
import GenericButton from "./GenericButton";

export const EstablishmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [details, setDetails] = useState<EstablishmentDetailType>();

  useEffect(() => {
    getEstablishmentDetails(id)
      .then(
        (result) => {
          setDetails(result);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigateBack = () => {
    navigate("/");
  };
  const formatedDate = (date: string | undefined) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  const displayRating = (values: {} | undefined) => {
    const entries = values ? Object.entries(values) : [];
    return (
      <ul>
        {entries.map((entry) => (
          <li key={entry[0]}>
            <p> {entry[0]}:  {entry[1]}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.detailTable}>
      {loading ? (
        <LoadingSpinner message="Loading..." />
      ) : (
        <div data-testid="detailPage" className={styles.details}>
          <h1> {details?.BusinessName} </h1>
          <p data-testid="fullAddress">
            <b>Address:</b>{` ${details?.AddressLine1} ${details?.AddressLine2}${details?.AddressLine3.toString() === "" ? "," : " "+details?.AddressLine3+","} ${details?.PostCode} ${details?.AddressLine4}`}
          </p>
          <p data-testid="dateOfInspection">
            <b>Date of inspection:</b> {formatedDate(details?.RatingDate)}
          </p>
          <div>
          <p data-testid="rating"><b>Rating:</b>{" "}{details?.RatingValue}</p>
          </div>
          {displayRating(details?.scores)}

          <GenericButton text="Go Back" onClick={navigateBack} />
        </div>
      )}
    </div>
  );
};
