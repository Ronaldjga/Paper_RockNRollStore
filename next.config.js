/** @type {import('next').NextConfig} */
const nextConfig = {}

require('dotenv').config();
module.exports = {
    images: {
        domains: ['hwarjdvqhksvkfciiene.supabase.co', 'avatars.githubusercontent.com'],
    },
    env: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        SUPABASE_SECRET: process.env.SUPABASE_SECRET,
        SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        NEXTAUTHSECRET: process.env.NEXTAUTHSECRET,
        NEXTAUTHSITE: process.env.NEXTAUTHSITE
    },
}