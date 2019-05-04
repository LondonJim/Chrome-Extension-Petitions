const chromeID = 'jmpeikanbnofmekalgkadbeakbinkjni'
const extensionURL = `chrome-extension://${chromeID}/popup/petitions.html`

Feature('Popup')

Scenario('After petitions loaded text appears', (I) => {
  I.amOnPage(extensionURL)
  I.retry({ retries: 7, minTimeout: 1000 }).see('Select option')
  I.see('Select option')
  I.see('Random')
  I.see('Start a Petition')
  I.see('Suggest Petition')
})

Scenario("clicking 'Suggest Petition' returns no revelant petitions", (I) => {
  I.amOnPage(extensionURL)
  I.retry({ retries: 7, minTimeout: 1000 }).see('Suggest Petition')
  I.click('Suggest Petition')
  I.see('No relevant petition found')
})

Scenario("clicking 'Start a Petition' opens up petition site", (I) => {
  I.amOnPage(extensionURL)
  I.retry({ retries: 7, minTimeout: 1000 }).see('Start a Petition')
  I.click('Start a Petition')
  I.see('Petitions')
});

Scenario("clicking 'Random' displays additional information", (I) => {
  I.amOnPage(extensionURL)
  I.retry({ retries: 7, minTimeout: 1000 }).see('Random')
  I.click('Random')
  I.see('Not interested? Start your own petition below')
});

Scenario("clicking 'Random' then clicking on 'here' to view it", (I) => {
  I.amOnPage(extensionURL)
  I.retry({ retries: 7, minTimeout: 1000 }).see('Random')
  I.click('Random')
  I.click('here')
  I.see('Petitions')
});

Scenario("clicking 'Random' then 'Suggest a Petition' removes petition info", (I) => {
  I.amOnPage(extensionURL)
  I.retry({ retries: 7, minTimeout: 1000 }).see('Random')
  I.click('Random')
  I.click('Suggest Petition')
  I.dontSee('Not interested? Start your own petition below')
});
