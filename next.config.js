/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['axios', 'mongoose'],
    }
}
module.exports = nextConfig
