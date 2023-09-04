import styles from './preloader.module.css';

function Loading(): JSX.Element {
  return (
    <div className={styles.preloader} data-testid="loading">
      <div className={styles.preloader__row}></div>
    </div>
  );
}

export default Loading;
