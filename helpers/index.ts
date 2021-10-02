import cookie from 'cookie'
import { GetServerSidePropsContext } from 'next'

export const parseCookies = ({ req }: GetServerSidePropsContext) => {
  return cookie.parse(req ? req.headers.cookie || '' : '')
}
