/** @type {import('next').NextConfig} */
const nextConfig = {}

require('dotenv').config();
module.exports = {
    images: {
        domains: ['hwarjdvqhksvkfciiene.supabase.co'],
    },
    env: {
        customKey: 'my-value',
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
}