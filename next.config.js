/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_UPLOAD_KEY: process.env.NEXT_PUBLIC_UPLOAD_KEY,
  },
  images: {
    domains: ['upcdn.io'],
  },
}

module.exports = nextConfig
