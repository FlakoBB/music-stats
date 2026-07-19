import { useEffect, useState } from 'react'
import LoginWithSpotifyButton from '../../components/LoginWithSpotify'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/pages/landing.module.scss'
import CustomButton from '../../components/CustomButton'
import VINIL from '../../assets/images/vinil.jpg'
import SINGER from '../../assets/images/singer.jpg'
import MIXER from '../../assets/images/mixer.jpg'

const LandingPage = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = window.localStorage.getItem('spotify_access_token')
    if (token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <>
      <section className={styles.main}>
        <h2 className={styles.title}>Your Music, <span>Decoded</span></h2>
        <p className={styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In accusantium quia atque laboriosam aut, dolores nam suscipit eveniet quibusdam harum!</p>
        {loggedIn
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
      {loggedIn && (
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
