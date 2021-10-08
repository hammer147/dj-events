import { GetServerSideProps, NextPage } from 'next'
import Layout from '../../components/layout/layout'
import { API_URL } from '../../config'
import { parseCookies } from '../../helpers'
import { IEvent } from '../../typings'
import styles from './dashboard.module.css'
import DashboardEvent from '../../components/dashboard-event'
import { MouseEventHandler } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  events: IEvent[],
  token: string
}

const DashboardPage: NextPage<Props> = ({ events, token }) => {

  const router = useRouter()

  const deleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete')) return
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (!response.ok) return toast.error(data.message)
    router.push('/events/')
  }

  return (
    <Layout title="User Dashboard">
      <ToastContainer />
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
    props: { events, token }
  }
}

export default DashboardPage
