import styles from '../styles/components/artist-row.module.scss'

const ArtistRow = ({ artist, position }) => {
  return (
    <article className={styles.artist_row}>
      <span className={styles.position_number}>{position}</span>
      <figure className={styles.artist_image}>
        <img src={artist.images[2].url} alt={`${artist.name}`} />
      </figure>
      <div>
        <p className={styles.artist_name}>{artist.name}</p>
      </div>
    </article>
  )
}

export default ArtistRow
