import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { API_URL } from '../config'
import styles from './image-upload.module.css'

type Props = {
  evtId: number
  imageUploaded: () => Promise<void>
  token: string
}

const ImageUpload = ({ evtId, imageUploaded, token }: Props) => {

  const [image, setImage] = useState<File | null>(null)

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault()
    if (!image) return

    // https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload-files-related-to-an-entry
    const formData = new FormData()
    formData.append('files',image)
    formData.append('ref', 'events')
    formData.append('refId', evtId.toString())
    formData.append('field','image')

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (response.ok) {
      imageUploaded()
    }

  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.target.files?.length ?
    setImage(e.target.files[0]) :
    setImage(null)
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" className="btn" value="Upload" />
      </form>
    </div>
  )
}

export default ImageUpload
