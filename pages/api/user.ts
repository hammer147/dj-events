import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../config'
import { User } from '../../typings'

type Data = {
  user?: User
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    const { token } = cookie.parse(req.headers.cookie)

    const strapiResponse = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    const user = await strapiResponse.json()

    if (strapiResponse.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User forbidden' })
    }

  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
