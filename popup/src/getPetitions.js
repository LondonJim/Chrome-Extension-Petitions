class GetPetitions {

  constructor(url = 'https://petition.parliament.uk') {
    this.url = url
    this.promises = []
    this.petitions = []
  }

  allPetitionPages = () => {
    for (let i = 1; i <= 40; i++) {
      let promise = fetch(this.url + `/petitions.json?page=${i}&state=open`)
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
