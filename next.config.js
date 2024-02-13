/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'localhost',
      '127.0.0.1',
      'asia.ajung.site',
      'asia.ajung.site/api',
      'www.asiaimport.com.br',
      'into-the-program.com',
      'grodbzf5x83i.compat.objectstorage.sa-saopaulo-1.oraclecloud.com',
      'ajung-intelligenz.s3.amazonaws.com',
      'place-hold.it',
      'ajung.com.br',
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
