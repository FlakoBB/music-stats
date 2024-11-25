import axios from 'axios'
import { NextResponse } from 'next/server'

export const GET = async (request) => {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 })
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_CALLBACK_HOST,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )

    const { access_token: accessToken, refresh_token: refreshToken } = response.data

    const responseHeaders = new Headers()
    responseHeaders.append(
      'Set-Cookie',
      `access_token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
    )
    responseHeaders.append(
      'Set-Cookie',
      `refresh_token=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
    )

    return NextResponse.redirect('/', { headers: responseHeaders })
  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response?.data || error.message)
    return NextResponse.json(
      { error: 'Failed to authenticate with Spotify' },
      { status: 500 }
    )
  }
}
