import styles from '../styles/components/track-row.module.scss'

const TrackRow = ({ track, position }) => {
  return (
    <article className={styles.track_row}>
      <span className={styles.position_number}>{position}</span>
      <figure className={styles.track_cover}>
        <img src={track.album.images[2].url} alt={`Cover of song ${track.name}`} />
      </figure>
      <div>
        <p className={styles.track_name}>{track.name}</p>
        <p className={styles.artist_name}>{track.artists[0].name}</p>
      </div>
    </article>
  )
}

export default TrackRow
