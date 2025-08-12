import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    // Class 142 - Opcional: Publicando a pasta out no GitHub Pages
    // for static export -- maneiras de renderizar o site
    // live server
    // npx serve@latest .
    //-----------------
    //output: 'export',
    //basePath: '/blog-ssg-nextjs',
    //assetPrefix: '/blog-ssg-nextjs/',
    //images: {
    //    unoptimized: true,
    //},
    //-----------------
    //unstable_cache
    //experimental: {
    //    useCache: true,
    //    cacheLife: {
    //        seconds: {
    //            stale: 0,
    //            revalidate: 60,
    //            expire: 10,
    //        },
    //    },
    //},
}

export default nextConfig
