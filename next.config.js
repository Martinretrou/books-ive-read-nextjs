module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['images.prismic.io'],
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
