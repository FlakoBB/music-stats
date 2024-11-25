'use client'

const LoginPage = () => {
  const loginSpotify = () => {
    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_CALLBACK_HOST
    })

    const authorizationUrl = `https://accounts.spotify.com/authorize?${queryParams}`

    window.location.replace(authorizationUrl)
  }

  return (
    <div>
      <h1>Bienvenid@</h1>
      <p>Inicia sesión con tu cuenta de Spotify para ver tus estadisticas.</p>
      <ul>
        <li>Canciones más escuchdas</li>
        <li>Artistas más escuchados</li>
        <li>Generos más escuchados</li>
        <li>y más...</li>
      </ul>
      <button onClick={loginSpotify}>Iniciar Sesión</button>
    </div>
  )
}
export default LoginPage
