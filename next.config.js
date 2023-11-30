/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true,
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = nextConfig
