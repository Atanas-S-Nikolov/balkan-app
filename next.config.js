/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, 
          { key: "Access-Control-Allow-Methods", value: process.env.CORS_ALLOWED_METHODS },
          { key: "Referrer-Policy", value: process.env.CORS_REFERRER_POLICY },
        ]
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
    }
    return config
  }
}

module.exports = nextConfig
