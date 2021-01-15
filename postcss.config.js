if (process.env.NODE_ENV === "production") {
  module.exports = {
    plugins: {
      "postcss-preset-env": {
        browsers: ["> 1%"],
      },
      tailwindcss: {},
      cssnano: {},
    },
  };
  return;
}
module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-preset-env": {
      autoprefixer: {},
    },
  },
};
