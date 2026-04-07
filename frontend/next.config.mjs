/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/about/teams/injunction",
        destination: "/about/teams/applications",
        permanent: true,
      },
      {
        source: "/about/teams/inheritance",
        destination: "/about/teams/family-relations",
        permanent: true,
      },
      {
        source: "/about/teams/adultery-suit",
        destination: "/about/teams/divorce-general",
        permanent: true,
      },
      // Media pages migration: /reviews/* → /media/*
      {
        source: "/reviews/youtube",
        destination: "/media/channel",
        permanent: true,
      },
      {
        source: "/reviews/webtoon",
        destination: "/media/channel",
        permanent: true,
      },
      {
        source: "/reviews/shorts",
        destination: "/media/channel",
        permanent: true,
      },
      {
        source: "/reviews/column",
        destination: "/media/column",
        permanent: true,
      },
      {
        source: "/about/no1",
        destination: "/about/greeting",
        permanent: true,
      },
      {
        source: "/media/webtoon",
        destination: "/media/channel",
        permanent: true,
      },
      {
        source: "/media/youtube",
        destination: "/media/channel",
        permanent: true,
      },
      {
        source: "/media/shorts",
        destination: "/media/channel",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
