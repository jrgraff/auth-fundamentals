import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { destroyCookie, parseCookies } from "nookies"
import decode from 'jwt-decode'

import { AuthTokenError } from "../errors/AuthTokenError"
import { validatePermissions } from "./validateUserPermissions"

type WithSSRAuthOptions = {
  permissions?: string[],
  roles?: string[],
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext) => {
    const cookie = parseCookies(ctx)
    const token = cookie['nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if (options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token);
      const { permissions, roles } = options

      const userHasValidPermissions = validatePermissions({
        user,
        permissions, 
        roles
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token')
        destroyCookie(ctx, 'nextauth.refreshToken')
    
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}