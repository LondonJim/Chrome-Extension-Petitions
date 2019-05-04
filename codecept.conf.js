exports.config = {
  tests: './test/E2E/*_test.js',
  output: './test/E2E/records',
  helpers: {
    Puppeteer: {
      url: '',
      chrome: {
        headless: false,
        args: [`--disable-extensions-except=./`,
               `--load-extension=./`,
               '--user-agent=PuppeteerAgent'
              ]
      },
    },
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'news-to-petition'
}
