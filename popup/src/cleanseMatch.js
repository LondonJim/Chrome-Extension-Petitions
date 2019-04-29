class CleanseMatch {

  constructor(cleanseString = CleanseString.parse, cosineSimilarity = CosineSimilarity.compareText) {
    this.cleanseString = cleanseString
    this.cosineSimilarity = cosineSimilarity
  }

  execute = (petitions, headline) => {
    let cleansedPetitions = this.parsePetitions(petitions)
    let cleansedHeadline = this.cleanseString(headline)
    return this.matchHeadlinePetition(cleansedPetitions, cleansedHeadline)
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

  matchHeadlinePetition = (cleansedPetitions, cleansedHeadline) => {
    if (cleansedHeadline === "") {
      return false
    }

    let topPetitionRating = 0
    let topPetitionIndex = 0

    cleansedPetitions.forEach((petition, index) => {
      let rating = this.cosineSimilarity(cleansedHeadline, petition)
      if (rating > topPetitionRating) {
        topPetitionRating = rating
        topPetitionIndex = index
      }
    })

    if (topPetitionRating === 0) {
      return false
    } else {
      return topPetitionIndex
    }
  }

}
