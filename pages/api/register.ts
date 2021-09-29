import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../config'
import { User } from '../../typings'

type Data = {
  user?: User
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body

    const strapiResponse = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })

    const data = await strapiResponse.json()

    if (strapiResponse.ok) {
      // set cookie
      res.setHeader('Set-Cookie', cookie.serialize(
        'token', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/'
      }))
      res.status(200).json({ user: data.user })
    } else {
      res.status(data.statusCode).json({ message: data.message[0].messages[0].message })
    }

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
