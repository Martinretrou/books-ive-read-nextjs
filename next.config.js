module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['images.prismic.io', 'firebasestorage.googleapis.com'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/auth',
        permanent: true,
      },
    ];
  },
};
