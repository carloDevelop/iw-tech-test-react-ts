import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import { TypeOfTable } from "../constants";
import styles from '../styles/EstablishmentsTable.module.css';

export const EstablishmentsTable: React.FC<{
  establishments: { [key: string]: string }[] | null | undefined;
  type: TypeOfTable
}> = ({ establishments, type }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th className={styles.headerStyle}>Business Name</th>
          <th className={styles.headerStyle}>Rating Value</th>
          <th className={styles.headerStyle}>Favourite</th> 
        </tr>
        {establishments &&
          establishments?.map(
            (
              establishment: { [key: string]: string } | null | undefined,
              index: React.Key | null | undefined
            ) => (
              <EstablishmentsTableRow
                key={index}
                establishment={establishment}
                typeOfTable={type}
              />
            )
          )}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
};
