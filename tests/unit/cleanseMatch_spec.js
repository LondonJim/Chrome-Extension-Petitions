let rewire = require('rewire')

let cleanseMatch = rewire('../../popup/src/cleanseMatch.js')

CleanseMatch = cleanseMatch.__get__('CleanseMatch')

describe('.CleanseMatch', () => {

  describe('#execute', () => {

    let mockCleanseString = (stringToCleanse) => {
      return stringToCleanse
    }

    let n = 0
    let mockCosineSimilarity = (stringToCleanse) => {
      n++
      return n
    }

    it('should return join strings and return a float', () => {
      cleanse = new CleanseMatch(mockCleanseString, mockCosineSimilarity)
      let petitions = [{'attributes': {'action': '00', 'background': '01', 'additional_details': '02'}},
                       {'attributes': {'action': '10', 'background': '11', 'additional_details': '12'}},
                       {'attributes': {'action': '20', 'background': '21', 'additional_details': '22'}},
                       {'attributes': {'action': '30', 'background': '31', 'additional_details': '32'}}]
      let headline = 'this is a test'
      expect(cleanse.execute(petitions, headline)).toEqual(3)
    })
  })
})
