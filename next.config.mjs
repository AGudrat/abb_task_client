/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
  },
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_SCRAPER_URL: process.env.REACT_APP_SCRAPER_URL,
    REACT_APP_URL: process.env.REACT_APP_URL,
  },
  transpilePackages: ["react-hook-mousetrap"],
  optimizeFonts: true,
};
export default nextConfig;
