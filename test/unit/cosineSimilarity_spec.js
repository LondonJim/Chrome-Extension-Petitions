let rewire = require('rewire')

let cosineSimilarity = rewire('../../popup/src/cosineSimilarity.js')

CosineSimilarity = cosineSimilarity.__get__('CosineSimilarity')

describe('.CosineSimilarity', () => {

  describe('#compareText', () => {
    it('should return integer 1, exact string match', () => {
      let string_one = "this is a test"
      let string_two = "this is a test"
      expect(CosineSimilarity.compareText(string_one, string_two)).toEqual(1)
    })

    it('should return 0, no strings matchs', () => {
      let string_one = "this is a test"
      let string_two = "I am not equal"
      expect(CosineSimilarity.compareText(string_one, string_two)).toEqual(0)
    })

    it('should return 0.5, half strings match', () => {
      let string_one = "this is a test"
      let string_two = "here is a rest"
      expect(CosineSimilarity.compareText(string_one, string_two)).toEqual(0.5)
    })

    it('should return float, some words match, strings not of equal length', () => {
      let string_one = "this is a test"
      let string_two = "This is definately not a test"
      expect(CosineSimilarity.compareText(string_one, string_two)).toEqual(0.6123724356957946)
    })
  })
})
