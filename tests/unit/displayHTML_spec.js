let rewire = require('rewire')

let mockDocument = rewire('../helpers/mockDocument.js')
let displayHTML = rewire('../../popup/src/displayHTML.js')

MockDocument = mockDocument.__get__('MockDocument')
DisplayHTML = displayHTML.__get__('DisplayHTML')

describe('.DisplayHTML', () => {

  beforeEach(() => {
    document = new MockDocument
  })

  describe('#selectMessage', () => {
    it("should set innerText of heading to Select option", () => {
      DisplayHTML.selectMessage()
      expect(document.getElementById().innerText).toEqual("Select option")
    })
  })

  describe('#buttonsOn', () => {
    it("should set innerText of heading to Select option", () => {
      DisplayHTML.buttonsOn()
      expect(document.getElementsByClassName()[0].style.visibility).toEqual("visible")
    })
  })

  describe('#petitionOn', () => {
    it("should set innerText of heading to Select option", () => {
      petition = { 'attributes': { 'action': 'heading', 'signature_count': 999999 }}
      DisplayHTML.petitionOn(petition)
      expect(document.getElementById().style.visibility).toEqual("visible")
      expect(document.getElementById().innerText).toEqual("999,999 signatures so far!")
    })
  })

  describe('#noRelevantPetition', () => {
    it("should set innerText of heading to Select option", () => {
      DisplayHTML.noRelevantPetition()
      expect(document.getElementById().style.visibility).toEqual("hidden")
      expect(document.getElementById().innerText).toEqual("No relevant petition found")
    })
  })
})
