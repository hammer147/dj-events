import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import qs from 'qs'
import EventItem from '../../components/events/event-item'
import Layout from '../../components/layout/layout'
import { API_URL } from '../../config'
import { IEvent } from '../../typings'

type Props = {
  events: IEvent[]
}

const SearchPage: NextPage<Props> = ({ events }) => {

  const router = useRouter()

  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {

  const { term } = context.query // localhost:3000/events/search?term=foo

  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term }
      ]
    }
  })

  const response = await fetch(`${API_URL}/events?${query}`)
  const events = await response.json() as IEvent[]

  return {
    props: { events }
  }
}

export default SearchPage
