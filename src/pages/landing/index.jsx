import { useNavigate } from 'react-router-dom'
import LoginWithSpotifyButton from '../../components/LoginWithSpotify'
import { useAuth } from '../../context/AuthContext'
import styles from '../../styles/pages/landing.module.scss'
import CustomButton from '../../components/CustomButton'
import VINIL from '../../assets/images/vinil.jpg'
import SINGER from '../../assets/images/singer.jpg'
import MIXER from '../../assets/images/mixer.jpg'

const LandingPage = () => {
  const { isAuthenticated } = useAuth()

  const navigate = useNavigate()

  return (
    <>
      <section className={styles.main}>
        <h1 className={styles.title}>Descubre tu <span>Soundtrack</span></h1>
        <p className={styles.description}>Sumérgete en tus tops de Spotify y descubre qué canciones, artistas y géneros son parte de tu historia.</p>
        {isAuthenticated
          ? (
            <CustomButton
              size='xl'
              onClick={() => {
                document.getElementById('options')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Comenzar
            </CustomButton>
            )
          : <LoginWithSpotifyButton />}
      </section>
      {isAuthenticated && (
        <section id='options' className={styles.options}>
          {[
            {
              title: 'Canciones Más Escuchadas',
              description: 'Descubre que canciones están entre tus favoritas',
              image: VINIL,
              route: '/top-tracks'
            },
            {
              title: 'Artistas Más Escuchados',
              description: 'Descubre a los artistas que siempre te acompañan',
              image: SINGER,
              route: '/top-artists'
            },
            {
              title: 'Géneros Más Escuchados',
              description: 'Descubre todos los géneros que vibran como tu',
              image: MIXER,
              route: '/top-genres'
            }
          ].map((item, index) => (
            <article
              key={index}
              className={styles.card}
              onClick={() => navigate(item.route)}
            >
              <img
                src={item.image}
              />
              <div className={styles.card_content}>
                <h3 className={styles.card_title}>{item.title}</h3>
                <p className={styles.card_description}>{item.description}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  )
}

export default LandingPage
