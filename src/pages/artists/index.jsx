import { useEffect, useState } from 'react'
import artistsServices from '../../services/artistsServices'
import ArtistRow from '../../components/ArtistRow'

const ArtistsPage = () => {
  const [topArtists, setTopArtists] = useState([])

  const fetchArtists = async () => {
    try {
      const results = await artistsServices.getTopArtists('long_term')
      setTopArtists(results)
    } catch (error) {
      console.error('Error fetching artists:', error.message)
    }
  }

  useEffect(() => {
    fetchArtists()
  }, [])

  return (
    <div>
      <h1>Artists Page</h1>
      {
        topArtists.map((artist, index) => (
          <ArtistRow
            key={artist.id}
            artist={artist}
            position={index + 1}
          />
        ))
      }
    </div>
  )
}

export default ArtistsPage
