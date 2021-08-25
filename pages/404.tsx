import { FaExclamationTriangle } from 'react-icons/fa'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/layout/layout'
import styles from './404.module.css'

const NotFoundPage: NextPage = () => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1><FaExclamationTriangle /> 404</h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/"><a>Go Back Home</a></Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
