import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken"

export const authOptions = {
    secret: process.env.NEXTAUTHSECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL,
        secret: process.env.SUPABASE_SECRET
    }),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user) {
                return true
            }
            return false
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url
            else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
            return baseUrl
        },
        async session({ session, token, user }) {
            if (token) {
                session.id = token.id
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id
            }
        
            return token
        },
    },
    pages: {
        signIn: "/login"
    },
    debug: true,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
