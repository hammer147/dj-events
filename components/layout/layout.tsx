import { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './header'
import Footer from './footer'
import Showcase from './showcase'
import styles from './layout.module.css'

type Props = {
  title?: string
  description?: string
  keywords?: string
  children: ReactNode
}

const Layout = (props: Props) => {
  const {
    title = 'DJ Events | Find the hottest parties',
    description = 'Find the latest DJ and other musical events',
    keywords = 'music, dj, edm, events',
    children
  } = props

  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
