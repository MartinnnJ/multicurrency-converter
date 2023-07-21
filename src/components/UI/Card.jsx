import styles from '../../styles/UI/Card.module.scss';

function Card({ children }) {
  return <div className={styles.card}>{children}</div>
}

export default Card;