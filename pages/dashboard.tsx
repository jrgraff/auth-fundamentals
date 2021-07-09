import { useContext, useEffect } from "react"
import Link from 'next/link'

import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/apiClient"
import { useCan } from "../hooks/useCan"
import { Can } from "../components/Can"

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  const userCanSeeMetrics = useCan({ roles: ['administrator']})

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <button onClick={signOut}>Sign out</button>

      {userCanSeeMetrics && <div>Voce é um administrador</div>}
      
      <Can permissions={['metrics.list']}>
        <Link href="/metrics">
          <a>Métricas</a>
        </Link>
      </Can>
    </>
  )
}
