import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken"

export const authOptions = {
    secret: process.env.NEXTAUTHSECRET,
    site: process.env.NEXTAUTHSITE,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
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
            } else {
                return false
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url
            else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
            return baseUrl
        },
        async session({ session, user }) {
            const signingSecret = process.env.SUPABASE_JWT_SECRET
            if (signingSecret) {
              const payload = {
                aud: "authenticated",
                iat: Math.floor(Date.now() / 1000) - 30,
                exp: Math.floor(new Date(session.expires).getTime() / 1000),
                sub: user.id,
                email: user.email,
                role: "authenticated",
              }
              session.supabaseAccessToken = jwt.sign(payload, signingSecret)
            }
            return session
        },
        async jwt({ token, user}) {
            if (user) {
                token.id = user.id
            }
        
            return token
        },
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    debug: true,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
