import React, { ChangeEvent, FormEvent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../../../components/layout/layout'
import { API_URL } from '../../../config'
import { IEvent } from '../../../typings'
import styles from './[id].module.css'
import Modal from '../../../components/modal'
import ImageUpload from '../../../components/image-upload'
import { parseCookies } from '../../../helpers'

type Props = {
  evt: IEvent,
  token: string
}

const EditEventPage: NextPage<Props> = ({ evt, token }) => {
  const [values, setValues] = useState<Partial<IEvent>>({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date.slice(0, 10),
    time: evt.time,
    description: evt.description
  })
  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // validation
    const hasEmptyFields = Object.values(values).some(element => element === '')
    if (hasEmptyFields) return toast.error('please fill in all fields')

    const response = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })

    if (!response.ok) {
      if (response.status === 403) return toast.error('Unauthorized')
      return toast.error('Something Went Wrong')
    }

    const updatedEvent = await response.json() as IEvent
    router.push(`/events/${updatedEvent.slug}`)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const imageUploaded = async () => {
    const response = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await response.json() as IEvent
    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          >
          </textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} alt="image preview" height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>)}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload 
          evtId={evt.id} 
          imageUploaded={imageUploaded} 
          token={token}
        />
      </Modal>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {token} = parseCookies(context)
  const { id } = context.query
  const response = await fetch(`${API_URL}/events/${id}`)
  const evt = await response.json() as IEvent

  return {
    props: {
      evt,
      token
    }
  }
}

export default EditEventPage
