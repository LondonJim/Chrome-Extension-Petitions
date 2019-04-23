class DisplayPetitions {

  constructor () {
    this.promises = []
    this.petitions = []
    this.randomPetition = []
    this.randomPetitionId = 0
  }

  execute = () => {
    this.getPetitions()
    Promise.all(this.promises)
      .then(values => {
        this.returnResults()
        document.getElementById("next-petition")
          .addEventListener("click", this.displayRandomizePetition)
        document.getElementById("view-link")
          .addEventListener("click", this.linkToPetition)
      })
  }

  displayRandomizePetition = () => {
    this.randomPetition = this.petitions[Math.floor(Math.random() * this.petitions.length)]
    this.randomPetitionId = this.randomPetition.id
    document.getElementById("heading")
      .innerText = this.randomPetition.attributes.action
    document.getElementById("petition-count")
      .innerText = this.numberWithCommas(this.randomPetition.attributes.signature_count) + " signatures so far!"
  }

  linkToPetition = () => {
    let url = `https://petition.parliament.uk/petitions/${this.randomPetitionId}`
    chrome.tabs.update({active: true, url: url})
  }

  numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  returnResults = () => {
    this.petitions = this.petitions.flat()
    this.displayRandomizePetition()
  }

  addToPetitions = (jsonResults) => {
    this.petitions.push(jsonResults)
  }

  getPetitions = () => {
    for (let i = 1; i <= 40; i++) {
      let promise = fetch(`https://petition.parliament.uk/petitions.json?page=${i}&state=open`)
              .then(results => { return results.json()})
              .then (jsonResults => {
                  this.addToPetitions(jsonResults.data)
              })
      this.promises.push(promise)
    }
  }

}

display = new DisplayPetitions()
display.execute()
