import styles from '../styles/components/genre-row.module.scss'

const GenreRow = ({ genre, score, position }) => {
  return (
    <article className={styles.genre_row}>
      <span className={styles.position_number}>{position}</span>
      <p className={styles.genre_name}>{genre}</p>
      <span className={styles.score}>{score}</span>
    </article>
  )
}

export default GenreRow
