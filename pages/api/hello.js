import { getSession } from "next-auth/react"

const handler = async (req, res) => {
  const session = await getSession({ req })

  // From session we can take the id and then do sth in db by user id
  console.log(session)

  res.status(200).json({ name: "John Doe" })
}

export default handler
