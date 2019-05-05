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

    let mockCosineSimilarityFalse = (stringToCleanse) => {
      return 0
    }


    let petitions = [{'attributes': {'action': '00', 'background': '01', 'additional_details': '02'}},
                     {'attributes': {'action': '10', 'background': '11', 'additional_details': '12'}},
                     {'attributes': {'action': '20', 'background': '21', 'additional_details': '22'}},
                     {'attributes': {'action': '30', 'background': '31', 'additional_details': '32'}}]

    it('should return join strings and return a float', () => {
      cleanse = new CleanseMatch(mockCleanseString, mockCosineSimilarity)
      let headline = 'this is a test'
      expect(cleanse.execute(petitions, headline)).toEqual(3)
    })

    it('should return false if no headline present', () => {
      cleanse = new CleanseMatch(mockCleanseString, mockCosineSimilarity)
      let headline = ''
      expect(cleanse.execute(petitions, headline)).toEqual(false)
    })

    it('should return false if match rating is 0', () => {
      cleanse = new CleanseMatch(mockCleanseString, mockCosineSimilarityFalse)
      let headline = 'This is a test'
      expect(cleanse.execute(petitions, headline)).toEqual(false)
    })
  })
})
