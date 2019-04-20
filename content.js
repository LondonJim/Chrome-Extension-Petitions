let toolbarHeight = 50;

let div = document.createElement("div");
div.id = "myToolbar";

let innerText = document.createElement('p')
div.appendChild(innerText)

innerText.textContent = "Loading Petitions...";

let randomizeButton = document.createElement('button')
div.appendChild(randomizeButton)

randomizeButton.textContent = "Next Random Petition"

let infoButton = document.createElement('button')
div.appendChild(infoButton)

infoButton.textContent = "More Information"

let st = div.style;
st.padding = "5px";
st.display = "block";
st.top = "0px";
st.left = "0px";
st.width = "100%";
st.height = toolbarHeight + "px";
st.background = "#008800";
st.color = "#FFFFFF";
st.fontSize = "24px";
st.fontFamily = "Helvetica Neue"
st.position = "fixed";

document.body.style.webkitTransform = "translateY(" + toolbarHeight + "px)";
document.documentElement.appendChild(div);

let petitions = []
let randomPetition = []
let randomPetitionId = []

randomizePetition = () => {
  randomPetition = petitions[Math.floor(Math.random() * petitions.length)]
  randomPetitionId = randomPetition.id
  innerText.textContent = randomPetition.attributes.action
}

linkToPetition = () => {
  let url = `https://petition.parliament.uk/petitions/${randomPetitionId}`
  window.open(url, '_blank')
}

fetch('https://petition.parliament.uk/petitions.json?page=1&state=open')
      .then(results => { return results.json()})
      .then(jsonResults => {
        petitions = jsonResults.data
        randomizePetition()
      })

randomizeButton.addEventListener("click", randomizePetition)
infoButton.addEventListener("click", linkToPetition)
