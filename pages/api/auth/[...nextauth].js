import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default NextAuth({
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
            testOne: "testOne",
            testTwo: "testTwo",
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
        token.user = user
      }

      return token
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = token.user
      }

      return session
    },
  },
  jwt: {
    secret: "test",
    encryption: true,
  },
  session: {
    jwt: true,
    maxAge: 6000,
    strategy: "jwt",
  },
  debug: true,
})
