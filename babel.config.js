require('dotenv').config({ path: './.env.development' })
console.log('REACT_APP_BASE_URL: ' + process.env.REACT_APP_BASE_URL)

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [["inline-dotenv", {
          path: '.env.production'
        }]]
      },
      development: {
        plugins: [["inline-dotenv", {
          path: '.env.development'
        }]]
      }
    }
  };
};
