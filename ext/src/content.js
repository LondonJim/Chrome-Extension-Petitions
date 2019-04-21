let petitions
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

fetch('https://petition.parliament.uk/petitions.json?page=1&state=open')
      .then(results => { return results.json()})
      .then(jsonResults => {
        petitions = jsonResults.data
        displayRandomizePetition()
      })

document.getElementById("change-link").addEventListener("click", displayRandomizePetition)
document.getElementById("view-link").addEventListener("click", linkToPetition)
