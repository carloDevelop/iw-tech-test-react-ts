import React from 'react';
import styles from '../styles/LoadingSpinner.module.css'

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div role="status" className={styles.loading}>
      <div className={styles.spinner}></div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Loading;