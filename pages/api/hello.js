import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const handler = async (req, res) => {
  const session = await getSession({ req })

  const users = await prisma.user.findMany()

  // From session we can take the id and then do sth in db by user id
  console.log(session)

  res.status(200).json(users)
}

export default handler
