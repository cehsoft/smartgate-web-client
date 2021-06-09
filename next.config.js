const withLinaria = require("next-linaria");

const camel_to_snake = (str) =>
  str[0].toLowerCase() +
  str
    .slice(1, str.length)
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const isProd = process.env.NODE_ENV === "production";

module.exports = withLinaria({
  linaria: {
    classNameSlug: (hash, title) => `${hash}_${camel_to_snake(title)}`,
  },
  webpack: (config, { isServer }) => {
    // console.log("is server env: ", isServer, "- is prod: ", isProd);

    config.module.rules = [...config.module.rules];
    return config;
  },
  future: {
    webpack5: true,
  },
  // trailingSlash: true,
  // async headers() {
  //   return [
  //     {
  //       source: "/:all*(svg|jpg|png)",
  //       locale: false,
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=3600, must-revalidate",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/vi/",
  //       permanent: false,
  //     },
  //   ];
  // },
});
