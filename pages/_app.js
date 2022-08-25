import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return(
  <>
      <nav>
        <div>
          <Link href="/" >
          <a>Julians Kitchen </a>
          </Link>
        </div>
      </nav>
      <main>
      <Component {...pageProps} />
      </main>
  
  </>) 
}

export default MyApp
