/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },

  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/f/*`,
      },
      {
        protocol: "http", // http도 추가
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https", // https도 추가
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
  rewrites: () => {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },
};

export default nextConfig;
