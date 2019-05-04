let rewire = require('rewire')

let mockDocument = rewire('../helpers/mockDocument.js')
let mockChrome = rewire('../helpers/mockChrome.js')
let main = rewire('../../popup/src/main.js')

MockDocument = mockDocument.__get__('MockDocument')
MockChrome = mockChrome.__get__('MockChrome')
Main = main.__get__('Main')

describe('.Main', () => {

  describe('#execute', () => {

    beforeEach(() => {
      document = new MockDocument
      chrome = new MockChrome
    })

    it('should return a cleansed string', () => {
      main = new Main
      expect(main.execute()).toEqual('complete')
    })

  })
})
