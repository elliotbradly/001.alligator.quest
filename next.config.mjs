/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  }, transpilePackages: [
    '@mantine/core',
    '@mantine/hooks',
    '@mantine/notifications',
    '@mantine/dates',
    '@mantine/code-highlight',
    '@mantine/form',
    // Add any other @mantine packages you are using
  ],
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    missingSuspenseWithCSRBailout: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/signed-in',
        destination: 'https://tasus.org/play',
        permanent: true, // or false for temporary redirect
      },
    ];
  },


};

export default nextConfig;
