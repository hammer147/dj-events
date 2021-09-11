import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { MouseEventHandler } from 'react'
import { API_URL } from '../../config'
import { IEvent } from '../../typings'
import Layout from '../../components/layout/layout'
import styles from './[slug].module.css'

type Props = {
  evt: IEvent
}

const EventPage: NextPage<Props> = ({ evt }) => {

  const router = useRouter()

  const deleteEvent: MouseEventHandler<HTMLAnchorElement> = async e => {
    if (!confirm('Are you sure you want to delete')) return
    const response = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    if (!response.ok) return toast.error(data.message)
    router.push('/events/')
  }

  return (
    <Layout>
      <div className={styles.event}>

        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>{new Date(evt.date).toLocaleDateString('en-GB')} at {evt.time}</span>

        <h1>{evt.name}</h1>

        <ToastContainer />

        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.medium.url} alt={evt.name} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>

        <h3>Description</h3>
        <p>{evt.description}</p>

        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>
            {'<'} Go Back
          </a>
        </Link>

      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params!

  const response = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await response.json() as IEvent[]

  return {
    props: { evt: events[0] },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch(`${API_URL}/events`)
  const events = await response.json() as IEvent[]

  const paths = events.map(evt => ({ params: { slug: evt.slug } }))

  return {
    paths,
    fallback: false
  }
}

export default EventPage
