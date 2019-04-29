class GetPetitions {

  constructor(urlPrefix = 'https://petition.parliament.uk/petitions.json?page=',
              urlSuffix = '&state=open') {
    this.urlPrefix = urlPrefix
    this.urlSuffix = urlSuffix
    this.promises = []
    this.petitions = []
  }

  allPetitionPages = () => {
    for (let i = 1; i <= 40; i++) {
      let promise = fetch(this.urlPrefix + i + this.urlSuffix)
              .then(results => { return results.json()})
              .then (jsonResults => {
                  this.petitions.push(jsonResults.data)
              })
      this.promises.push(promise)
    }
    return this.returnPetitions().then(function(petitions) { return petitions })
  }

  returnPetitions = () => {
    return Promise.all(this.promises)
      .then(values => {
        this.petitions = this.petitions.flat()
        return this.petitions
      })
  }

}
