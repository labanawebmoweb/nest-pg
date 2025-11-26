// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// //   reactCompiler: true,
// // };

// // export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: false, // ❌ must disable
//   experimental: {
//     serverComponentsExternalPackages: ["typeorm", "pg"], // ✔ important
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,

  // Updated according to new Next.js requirement
  serverExternalPackages: ["typeorm", "pg"],
};

export default nextConfig;
