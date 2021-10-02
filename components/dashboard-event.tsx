import styles from './dashboard-event.module.css'
import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { IEvent } from '../typings'

type Props = {
  evt: IEvent
  handleDelete: (id: number) => void
}

const DashboardEvent = ({ evt, handleDelete }: Props) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /><span> Edit Event</span>
        </a>
      </Link>
      <a className={styles.delete} href="#" onClick={() => handleDelete(evt.id)}>
        <FaTimes /> Delete
      </a>
    </div>
  )
}

export default DashboardEvent
