import styles from "../styles/EstablishmentsTableRow.module.css";
import { Link } from "react-router-dom";
import FavouriteCheckbox from "./FavouriteCheckbox";
import { TypeOfTable } from "../constants";
import GenericButton from "./GenericButton";
import { useContext } from "react";
import { FavouriteItemsContext } from "../context/favouriteItems";

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
  typeOfTable: TypeOfTable;
}> = ({ establishment, typeOfTable }) => {
  const favoritedEstablishments = useContext(FavouriteItemsContext);

  const handleOnChange = (
    item: { [key: string]: string } | null | undefined,
    checked: boolean
  ) => {
    checked
      ? favoritedEstablishments?.saveFavouriteItem(item)
      : favoritedEstablishments?.removeItem(item?.FHRSID || "");
  };

  const removeFromFavorite = (id: string | undefined) => {
    favoritedEstablishments?.removeItem(id || "");
  };

  return (
    <tr>
      <td className={styles.tableRow}>
        <Link to={`/detail/${establishment?.FHRSID}`} className={styles.link}>
          {establishment?.BusinessName}
        </Link>
      </td>
      <td className={styles.tableRow}>{establishment?.RatingValue}</td>
      {typeOfTable === TypeOfTable.Favourite ? (
        <td>
          <GenericButton
            classes={[styles.buttonFavouriteTable]}
            text="Remove"
            onClick={() => removeFromFavorite(establishment?.FHRSID)}
          />
        </td>
      ) : (
        <td>
          <FavouriteCheckbox
            isChecked={establishment?.favourite === "1" ? true : false}
            onChange={(value) => handleOnChange(establishment, value)}
          />
        </td>
      )}
    </tr>
  );
};
