let promises = []
let petitions = []
let randomPetition
let randomPetitionId

displayRandomizePetition = () => {
  randomPetition = petitions[Math.floor(Math.random() * petitions.length)]
  randomPetitionId = randomPetition.id
  document.getElementById("heading").innerText = randomPetition.attributes.action
  document.getElementById("petition-count").innerText = numberWithCommas(randomPetition.attributes.signature_count) + " signatures so far!"
}

linkToPetition = () => {
  let url = `https://petition.parliament.uk/petitions/${randomPetitionId}`
  chrome.tabs.update({active: true, url: url})
}

numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

returnResults = () => {
  petitions = petitions.flat()
  displayRandomizePetition()
}

addToPetitions = (jsonResults) => {
  petitions.push(jsonResults)
}

getPetitions = () => {
  for (let i = 1; i <= 40; i++) {
    let promise = fetch(`https://petition.parliament.uk/petitions.json?page=${i}&state=open`)
            .then(results => { return results.json()})
            .then (jsonResults => {
                addToPetitions(jsonResults.data)
            })
    promises.push(promise)
  }
}

execute = () => {
  getPetitions()
  Promise.all(promises)
    .then(values => {
      returnResults()
      document.getElementById("change-link").addEventListener("click", displayRandomizePetition)
      document.getElementById("view-link").addEventListener("click", linkToPetition)
    })
}

execute()
