import * as React from "react"
import { useSession } from "next-auth/react"
import styles from "../styles/Home.module.css"

export default function Home() {
  const { data: session } = useSession()

  React.useEffect(() => {
    console.log("Client session: ", session)
  }, [session])

  return (
    <div className={styles.container}>
      <h1>Hello!</h1>
    </div>
  )
}
