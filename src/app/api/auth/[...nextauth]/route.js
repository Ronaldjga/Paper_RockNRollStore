import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import { SupabaseAdapter } from "@auth/supabase-adapter";

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
        secret: process.env.SUPABASE_ANON_KEY
    }),
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
