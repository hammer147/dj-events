import type { NextApiRequest, NextApiResponse } from 'next'
import { IEvent } from '../../../typings'

const { events } = require('../../../data/data.json') as { events: IEvent[] }

type Data = {
  message: string
} | IEvent[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json(events)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
