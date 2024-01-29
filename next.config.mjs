/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({

                test: /\.tsx?$/,
                use: './loader.cjs',
                issuerLayer: (issuer) => issuer !== "banner-loader" ? issuer : "",
                exclude: /node_modules/,
        });
        return config;
    },
};

export default nextConfig;