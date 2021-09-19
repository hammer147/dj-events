import type { GetServerSideProps, NextPage } from 'next'
import EventItem from '../../components/events/event-item'
import Layout from '../../components/layout/layout'
import Pagination from '../../components/pagination'
import { API_URL, PER_PAGE } from '../../config'
import { IEvent } from '../../typings'

type Props = {
  events: IEvent[]
  page: number
  total: number
}

const EventsPage: NextPage<Props> = ({ events, page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE)
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} lastPage={lastPage} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { page = '1' } = context.query

  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalResponse = await fetch(
    `${API_URL}/events/count`
  )
  const total = await totalResponse.json()

  // Fetch events
  const eventsResponse = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventsResponse.json() as IEvent[]

  return {
    props: { events, page: +page, total }
  }
}

export default EventsPage
