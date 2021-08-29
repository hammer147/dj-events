import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import EventItem from '../components/events/event-item'
import Layout from '../components/layout/layout'
import { API_URL } from '../config'
import { EventType } from '../typings'
import Link from 'next/link'

type Props = {
  events: EventType[]
}

const HomePage: NextPage<Props> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  // this is not recommended
  const response = await fetch(`${API_URL}/api/events`)
  const events = await response.json() as EventType[]

  return {
    props: { events: events.slice(0, 3) },
    revalidate: 10
  }
}

export default HomePage
