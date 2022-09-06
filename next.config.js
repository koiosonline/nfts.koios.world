/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  env: {
    ERC721_CONTRACT_ADDRESS: process.env.ERC721_CONTRACT_ADDRESS,
    ERC1155_CONTRACT_ADDRESS: process.env.ERC1155_CONTRACT_ADDRESS,
  },
};

module.exports = nextConfig;
