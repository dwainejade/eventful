require('dotenv').config({ path: './.env.development' })
// console.log('SUPABASE_KEY: ' + process.env.SUPABASE_KEY)

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
