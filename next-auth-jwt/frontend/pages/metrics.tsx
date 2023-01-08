import { useContext } from "react"

import { AuthContext } from "../contexts/AuthContext"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <h1>Metrics: {user?.email}</h1>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: [],
})