/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        DEV_BACKEND_URL: process.env.DEV_BACKEND_URL,
      }
};

export default nextConfig;
