/** @type {import('next').NextConfig} */
const nextConfig = {}

require('dotenv').config();
module.exports = {
    images: {
        domains: ['hwarjdvqhksvkfciiene.supabase.co'],
    },
    env: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
        NEXTAUTHSECRET: process.env.NEXTAUTHSECRET
    },
}