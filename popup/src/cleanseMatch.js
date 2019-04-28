class CleanseMatch {

  constructor(cleanseString = CleanseString.parse, cosineSimilarity = CosineSimilarity.compareText) {
    this.cleanseString = cleanseString
    this.cosineSimilarity = cosineSimilarity
  }

  execute = (petitions, headline) => {
    let cleansedPetitions = this.parsePetitions(petitions)
    return this.cosine(cleansedPetitions, headline)
  }

  parsePetitions = (petitions) => {
    let petitionString = ""
    let parsedPetitions = []
    for ( let i = 0; i <= petitions.length - 1; i++) {
      petitionString = petitions[i].attributes.action + " " + petitions[i].attributes.background + " " + petitions[i].attributes.additional_details
      petitionString = this.cleanseString(petitionString)
      parsedPetitions.push(petitionString)
    }
    return parsedPetitions
  }

  cosine = (parsedPetitions, headline) => {
    if (headline === "") {
      return false
    }

    let topPetitionRating = 0
    let topPetitionIndex = 0

    parsedPetitions.forEach((petition, index) => {
      let parsedHeadline = this.cleanseString(headline)
      let rating = this.cosineSimilarity(parsedHeadline, petition)
      if (rating > topPetitionRating) {
        topPetitionRating = rating
        topPetitionIndex = index
      }
    })

    if (topPetitionRating === 0) {
      return false
    } else {
      return topPetitionIndex
      // this.petition = this.petitions[topPetitionIndex]
      // this.petitionId = this.petition.id
      // this.displayPetition()
    }
  }

}
