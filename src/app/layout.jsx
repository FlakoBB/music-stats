import { Jost } from 'next/font/google'
import '../styles/globals.css'

const jost = Jost({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'Music Stats',
  description: 'Estadisticas personalizadas de la musica que escuchas en Spotify'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={`${jost.className}`}>
        {children}
      </body>
    </html>
  )
}
