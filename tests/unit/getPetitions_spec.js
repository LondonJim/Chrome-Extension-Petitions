const rewire = require('rewire')
const fetchMock = require('fetch-mock')
fetch = require('node-fetch')

fetchMock.get('*', {petitions: 'data'});

let getPetitions = rewire('../../popup/src/getPetitions.js')

GetPetitions = getPetitions.__get__('GetPetitions')

describe('.GetPetitions', () => {

  describe('#allPetitionPages', () => {

    it('should return a cleansed string', () => {
      getPetitions = new GetPetitions('https://test-url/','')
      expect(getPetitions.allPetitionPages().then).toBeTruthy()
    })

  })
})
