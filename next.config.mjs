/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Content is static and UI is client-interactive. Keep lint/build resilient
  // so a preview deploy is never blocked by a stylistic lint rule.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
