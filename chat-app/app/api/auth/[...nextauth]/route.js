import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "../../../../lib/mongodb"
import User from "../../../../models/User"
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        await connectToDatabase()
        const user = await User.findOne({ username: credentials.username, role: credentials.role })
        
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id, name: user.username, email: user.email, role: user.role }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/',  // Use the home page as the sign-in page
  },
})

export { handler as GET, handler as POST }