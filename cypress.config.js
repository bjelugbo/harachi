const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  preprocessor
} = require('@badeball/cypress-cucumber-preprocessor/browserify')
const fs = require('fs')

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config)
  on('file:preprocessor', preprocessor(config))
  on('task', {
    log(message) {
      console.log(message)
      return null
    },
    async prepareReport() {
      fs.mkdirSync('cypress/reports/', { recursive: true })
      await fs.writeFileSync('cypress/reports/cart.json', '[]', { flag: 'w' })
      return null
    }
  })
  return config
}
module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportHeight: 900,
  numTestsKeptInMemory: 0,
  viewportWidth: 1440,
  e2e: {
    baseUrl:'https://app.clickship.com/clickship',
    specPattern: 'cypress/{e2e,integration}/**/*.feature',
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalMemoryManagement: true,
    setupNodeEvents
  },
});
