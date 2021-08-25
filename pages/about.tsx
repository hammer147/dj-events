import { NextPage } from 'next'
import Layout from '../components/layout/layout'

const AboutPage: NextPage = () => {
  return (
    <Layout title="About DJ Events">
      <h1>About</h1>
      <p>This is an app to find the latest DJ and other musical events</p>
      <p>Version: 1.0.0</p>
    </Layout>
  )
}

export default AboutPage
