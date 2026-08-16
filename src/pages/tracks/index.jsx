import { useEffect, useRef, useState } from 'react'
import tracksServices from '../../services/tracksServices'
import TrackRow from '../../components/TrackRow'
import styles from '../../styles/pages/top-tracks.module.scss'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useAuth } from '../../context/AuthContext'
import { toJpeg } from 'html-to-image'

const TIME_RANGES = {
  SHORT: {
    id: 'short_term',
    label: 'Últimos 4 semanas'
  },
  MEDIUM: {
    id: 'medium_term',
    label: 'Últimos 6 meses'
  },
  LONG: {
    id: 'long_term',
    label: 'Todo el tiempo'
  }
}

const TracksPage = () => {
  const { user } = useAuth()
  const [tracks, setTracks] = useState([])
  const [timeRange, setTimeRange] = useState(TIME_RANGES.SHORT.id)
  const [newPlaylistData, setNewPlaylistData] = useState({
    title: '',
    description: ''
  })
  const [openModal, setOpenModal] = useState(false)
  const [formStatus, setFormStatus] = useState({
    isCreating: false,
    isCreated: false
  })

  const playlistCoverRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPlaylistData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const fetchTracks = async () => {
    const data = await tracksServices.getTopTracks(timeRange)
    setTracks(data || [])
  }

  useEffect(() => {
    fetchTracks()
  }, [timeRange])

  const generatePlaylistCover = async () => {
    const element = playlistCoverRef.current

    if (!element) {
      throw new Error('No se encontró el elemento de la portada')
    }

    const dataUrl = await toJpeg(element, {
      pixelRatio: 4,
      cacheBust: true,
      backgroundColor: '#a0a0a0'
    })

    const base64Image = dataUrl.split(',')[1]

    return base64Image
  }
  const savePlaylist = async (e) => {
    e.preventDefault()
    try {
      const base64Image = await generatePlaylistCover()

      setFormStatus({ isCreating: true, isCreated: false })
      const userID = user.id

      const newPlaylist = await tracksServices.cretePlaylist(userID, newPlaylistData.title, newPlaylistData.description)
      const playlistID = newPlaylist.id

      await tracksServices.addTracksToPlaylist(playlistID, tracks.map(track => track.uri))

      await tracksServices.addPlaylistCover(
        playlistID,
        base64Image
      )
      setFormStatus({ isCreating: true, isCreated: true })
    } catch (err) {
      setFormStatus({ isCreating: false, isCreated: false })
      // TODO: Manejar el error de manera más elegante, como mostrar un mensaje al usuario
      console.error('Error al obtener datos del usuario:', err.response?.data || err.message)
    }
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Top Tracks</h1>
          <p className={styles.description}>Tus canciones mas escuchadas</p>
        </div>
        <div className={styles.options}>
          {Object.values(TIME_RANGES).map((range) => (
            <button
              key={range.id}
              type='button'
              onClick={() => setTimeRange(range.id)}
              className={`${styles.op} ${range.id === timeRange ? styles.op_selected : ''}`}
              variant={range.id === timeRange ? 'default' : 'outline'}
            >
              {range.label}
            </button>
          ))}
        </div>
      </header>
      <section className={styles.content}>
        <div className={styles.list}>
          {tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              position={index + 1}
            />
          ))}
          <div className={styles.mobile_button}>
            <CustomButton
              onClick={() => setOpenModal(true)}
            >
              Crear Playlist
            </CustomButton>
          </div>
        </div>
        <div
          className={`${styles.create_playlist_form_container} ${openModal ? styles.modal_open : ''}`}
          onClick={() => setOpenModal(false)}
        >
          {
            formStatus.isCreating
              ? (
                <article className={styles.playlist_form_status}>
                  {
                    formStatus.isCreated
                      ? (
                        <>
                          <div className={styles.success_icon}>
                            <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M20.707 6.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 1.414 -1.414l4.293 4.293l9.293 -9.293a1 1 0 0 1 1.414 0' />
                            </svg>
                          </div>
                          <p>Playlist creada con éxito!</p>
                        </>
                        )
                      : (
                        <>
                          <div className={styles.spinner} />
                          <p>Creando playlist...</p>
                        </>
                        )
                  }
                </article>
                )
              : (
                <form
                  onSubmit={savePlaylist}
                  className={styles.create_playlist_form}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>Crear Playlist</h2>
                  <div className={styles.form_fields}>
                    <div ref={playlistCoverRef} className={styles.playlist_cover}>
                      <span>
                        {newPlaylistData.title !== ''
                          ? newPlaylistData.title
                          : 'Top Tracks'}
                      </span>
                    </div>
                    <FormField
                      label='Nombre'
                      name='title'
                      value={newPlaylistData.title}
                      onChange={handleChange}
                    />
                    <FormField
                      label='Descripción'
                      name='description'
                      isTextarea
                      value={newPlaylistData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <CustomButton type='submit'>
                    Crear Playlist
                  </CustomButton>
                </form>
                )
          }
        </div>
      </section>
    </section>
  )
}

export default TracksPage
