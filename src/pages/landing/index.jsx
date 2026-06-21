import { useEffect, useState } from 'react'
import LoginWithSpotifyButton from '../../components/LoginWithSpotify'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import styles from '../../styles/pages/landing.module.scss'
import CustomButton from '../../components/CustomButton'

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

  // if (!loggedIn) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         flexDirection: 'column',
  //         gap: '1rem'
  //       }}
  //     >
  //       <h1>Music Stats</h1>
  //       <p>Inicia sesión para poder obtener tus tops de canciones, artitas y generos</p>
  //       <LoginWithSpotifyButton />
  //     </div>
  //   )
  // }

  // return (
  //   <div
  //     style={{
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       flexDirection: 'column',
  //       gap: '1rem'
  //     }}
  //   >
  //     <h1>Music Stats</h1>
  //     <div
  //       style={{
  //         display: 'flex',
  //         alignItems: 'flex-end',
  //         justifyContent: 'center',
  //         gap: '1rem'
  //       }}
  //     >
  //       <Button
  //         onClick={() => navigate('/top-tracks')}
  //         text='Top Tracks'
  //       />
  //       <Button
  //         onClick={() => navigate('/top-artists')}
  //         text='Top Artists'
  //       />
  //       <Button
  //         onClick={() => navigate('/top-genres')}
  //         text='Top Genres'
  //         isDisabled
  //       />
  //     </div>
  //   </div>
  // )

  return (
    <>
      <section className={styles.main}>
        <h2 className={styles.title}>Your Music, <span>Decoded</span></h2>
        <p className={styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In accusantium quia atque laboriosam aut, dolores nam suscipit eveniet quibusdam harum!</p>
        {!loggedIn
          ? (
            <CustomButton>
              Comenzar
            </CustomButton>
            )
          : <LoginWithSpotifyButton />}
      </section>
      <section id='options' className={styles.main2}>
        <h2 className={styles.title}><span>OPTIONS</span></h2>
      </section>
    </>
  )
}

export default LandingPage
