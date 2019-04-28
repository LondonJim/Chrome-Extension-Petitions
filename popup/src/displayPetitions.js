class DisplayPetitions {

  constructor(cleanseString = CleanseString.parse, cosineSimilarity = CosineSimilarity.compareText, getPetitions = new GetPetitions) {
    this.cleanseString = cleanseString
    this.cosineSimilarity = cosineSimilarity
    this.getPetitions = getPetitions
    this.headline = ""
    this.headlines = []
    this.promises = []
    this.petitions = []
    this.petition = []
    this.petitionId = 0
    this.petitionString
  };

  execute = () => {
    this.headlineListener();
    this.getPetitions.allPetitionPages()
      .then(petitions => {
        this.petitions = petitions
        document.getElementById("heading").innerText = "Select option"
        this.getHeadlineMessage()
        this.displayButtons()
      })
  }

  displayButtons = () => {
    document.getElementsByClassName("button-block")[0].style.visibility = "visible"
    document.getElementById("headline-petition")
      .addEventListener("click", this.headlinePetition)
    document.getElementById("start-petition")
      .addEventListener("click", this.linktoStartPetition)
    document.getElementById("random-petition")
      .addEventListener("click", this.randomPetition)
    document.getElementById("view-link")
      .addEventListener("click", this.linkToPetition)
  }

  displayPetition = () => {
    document.getElementById("view-link-message").style.visibility = "visible"
    document.getElementById("heading")
      .innerText = this.petition.attributes.action
    document.getElementById("petition-count").style.visibility = "visible"
    document.getElementById("petition-count")
      .innerText = this.numberWithCommas(this.petition.attributes.signature_count) + " signatures so far!"
  }

  randomPetition = () => {
    this.petition = this.petitions[Math.floor(Math.random() * this.petitions.length)]
    this.petitionId = this.petition.id
    this.displayPetition()
  }

  headlinePetition = () => {
    this.parsePetitions()
    this.cosine()
  }

  parsePetitions = () => {
    this.headlines = []
    for ( let i = 0; i <= this.petitions.length - 1; i++) {
      this.petitionString = this.petitions[i].attributes.action + " " + this.petitions[i].attributes.background + " " + this.petitions[i].attributes.additional_details
      this.petitionString = this.cleanseString(this.petitionString)
      this.headlines.push(this.petitionString)
    }
  }

  cosine = () => {
    if (this.headline === "") {
      this.noRelevantPetition()
      return
    }

    let topPetitionRating = 0
    let topPetitionIndex = 0

    this.headlines.forEach((petition, index) => {
      let parsedHeadline = this.cleanseString(this.headline)
      let rating = this.cosineSimilarity(parsedHeadline.toLowerCase(), petition)
      if (rating > topPetitionRating) {
        topPetitionRating = rating
        topPetitionIndex = index
      }
    })

    if (topPetitionRating === 0) {
      this.noRelevantPetition()
    } else {
      this.petition = this.petitions[topPetitionIndex]
      this.petitionId = this.petition.id
      console.log(this.petitions[topPetitionIndex])
      console.log(topPetitionIndex)
      console.log(this.headline)
      this.displayPetition()
    }
  }

  noRelevantPetition = () => {
    document.getElementById("heading")
      .innerText = "No relevant petition found"
    document.getElementById("view-link-message").style.visibility = "hidden"
    document.getElementById("petition-count").style.visibility = "hidden"
  }

  linkToPetition = () => {
    let url = `https://petition.parliament.uk/petitions/${this.petitionId}`
    chrome.tabs.update({active: true, url: url})
  }

  linktoStartPetition = () => {
    let url = 'https://petition.parliament.uk/petitions/check'
    chrome.tabs.update({active: true, url: url})
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  headlineListener = () => {
    let that = this
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (!!request.headline) {
            that.headline = request.headline
        }
        return true;
      });
  }

  getHeadlineMessage = () => {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
    });
  }
}

display = new DisplayPetitions()
display.execute()
