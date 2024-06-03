export default {
  require: [
    '@babel/register'
  ],
  extensions: [
    'js'
  ],
  babel: {
    testOptions: {
      presets: [
        '@babel/preset-env'
      ]
    }
  }
};
