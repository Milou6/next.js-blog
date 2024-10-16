/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/page/1',
        destination: '/blog',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
