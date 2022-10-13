/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["koios-titans.ams3.digitaloceanspaces.com"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  env: {
    ERC721_CONTRACT_ADDRESS: process.env.ERC721_CONTRACT_ADDRESS,
    ERC1155_CONTRACT_ADDRESS: process.env.ERC1155_CONTRACT_ADDRESS,
    NETWORK_ENV: process.env.NETWORK_ENV,
  },
};

module.exports = nextConfig;
