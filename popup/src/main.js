class Main {

  constructor(getPetitions = new GetPetitions,
              cleanseMatch = new CleanseMatch,
              displayHTML = DisplayHTML,
              linksURL = 'https://petition.parliament.uk/petitions/') {
    this.getPetitions = getPetitions
    this.cleanseMatch = cleanseMatch
    this.displayHTML = displayHTML
    this.linksURL = linksURL
    this.headline = ""
    this.petitions = []
    this.petition = []
    this.petitionId = 0
  }

  execute = () => {
    this.headlineListener()
    this.getPetitions.allPetitionPages()
      .then(petitions => {
        this.petitions = petitions
        this.getHeadlineMessage()
        this.displayHTML.selectMessage()
        this.displayHTML.buttonsOn()
        this.setButtonListeners()
      })
    return 'complete'
  }

  setButtonListeners = () => {
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
    this.displayHTML.petitionOn(this.petition)
  }

  randomPetition = () => {
    this.petition = this.petitions[Math.floor(Math.random() * this.petitions.length)]
    this.petitionId = this.petition.id
    this.displayPetition()
  }

  headlinePetition = () => {
    let matchingPetitionIndex = this.cleanseMatch.execute(this.petitions, this.headline)
    if (matchingPetitionIndex) {
      this.petition = this.petitions[matchingPetitionIndex]
      this.petitionId = this.petition.id
      this.displayPetition()
    } else {
      this.displayHTML.noRelevantPetition()
    }
  }

  linkToPetition = () => {
    let url = this.linksURL + this.petitionId
    chrome.tabs.update({active: true, url: url})
  }

  linktoStartPetition = () => {
    let url = this.linksURL + 'check'
    chrome.tabs.update({active: true, url: url})
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
