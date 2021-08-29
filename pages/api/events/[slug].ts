import type { NextApiRequest, NextApiResponse } from 'next'
import { EventType } from '../../../typings'

const { events } = require('../../../data/data.json') as { events: EventType[] }

type Data = {
  message: string
} | EventType[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const evt = events.filter(ev => ev.slug === req.query.slug)

  if (req.method === 'GET') {
    res.status(200).json(evt) // arr with 1 element
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
