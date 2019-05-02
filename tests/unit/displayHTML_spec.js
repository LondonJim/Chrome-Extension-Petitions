let rewire = require('rewire')

let displayHTML = rewire('../../popup/src/displayHTML.js')

DisplayHTML = displayHTML.__get__('DisplayHTML')

describe('.DisplayHTML', () => {
  class MockDocument {
    constructor() {
      this.innerText = this
      this.style = this
      this.visibility
    }

    getElementById() {
      return this;
    }

    getElementsByClassName() {
      return [this]
    }
  }

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
