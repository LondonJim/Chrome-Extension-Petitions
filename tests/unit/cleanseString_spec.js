let rewire = require('rewire')

let cleanseString = rewire('../../popup/src/cleanseString.js')

CleanseString = cleanseString.__get__('CleanseString')

describe('.CleanseString', () => {

  describe('#parse', () => {

    it('should return a cleansed string', () => {
      let string = 'In jest, he stated that Jonathan was merely seeking the best fashion example he could find.'
      expect(CleanseString.parse(string)).toEqual('jest stated jonathan seeking fashion find')
    })

    it('should return an empty string', () => {
      let string = ''
      expect(CleanseString.parse(string)).toEqual('')
    })

    it('should return a cleansed string from multiple special characters', () => {
      let string = 'THIS IS A TEST! this is another test !@£$%^&&*() ! @ £ $ % ^ & * ( ) # €'
      expect(CleanseString.parse(string)).toEqual('test')
    })

    it('should return a cleansed string with no duplicates', () => {
      let string = 'foo foo foo bar bar bar'
      expect(CleanseString.parse(string)).toEqual('foo bar')
    })
  })
})
