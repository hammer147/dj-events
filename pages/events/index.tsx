import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import EventItem from '../../components/events/event-item'
import Layout from '../../components/layout/layout'
import { API_URL } from '../../config'
import { EventType } from '../../typings'

type Props = {
  events: EventType[]
}

const EventsPage: NextPage<Props> = ({ events }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  // this is not recommended
  const response = await fetch(`${API_URL}/api/events`)
  const events = await response.json() as EventType[]

  return {
    props: { events },
    revalidate: 10
  }
}

export default EventsPage
