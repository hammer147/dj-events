import { GetServerSideProps, NextPage } from 'next'
import Layout from '../../components/layout/layout'
import { API_URL } from '../../config'
import { parseCookies } from '../../helpers'
import { IEvent } from '../../typings'
import styles from './dashboard.module.css'
import DashboardEvent from '../../components/dashboard-event'

type Props = {
  events: IEvent[]
}

const DashboardPage: NextPage<Props> = ({ events }) => {

  const deleteEvent = (id: number) => {
    console.log(id)
  }

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map(evt => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {

  const { token } = parseCookies(context)

  const response = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const events = await response.json()

  return {
    props: { events }
  }
}

export default DashboardPage
