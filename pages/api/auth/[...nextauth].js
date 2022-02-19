import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
const prisma = new PrismaClient()

export default NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@test.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*************",
        },
      },
      authorize: async (credentials) => {
        // database look up
        const userByEmail = await prisma.user.findFirst({
          where: { email: credentials.email },
        })

        if (credentials.password === userByEmail.password) {
          return {
            id: userByEmail.id,
            name: userByEmail.name,
            email: userByEmail.email,
          }
        }

        // login failed
        return null
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }

      return session
    },
  },
  secret: "fhaisfahisdfas",
  jwt: {
    secret: "test",
    encryption: true,
  },
  session: {
    jwt: true,
    maxAge: 60,
  },
})
