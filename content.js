let toolbarHeight = 56;

let div = document.createElement("div");
div.id = "myToolbar";

let innerText = document.createElement('p')
div.appendChild(innerText)

innerText.textContent = "Loading Petitions...";

let randomizeButton = document.createElement('button')
randomizeButton.className = "buttons"
div.appendChild(randomizeButton)

randomizeButton.textContent = "Next Random Petition"

let infoButton = document.createElement('button')
infoButton.className = "buttons"
div.appendChild(infoButton)

infoButton.textContent = "More Information"

console.log(document.getElementsByClassName('buttons'))
let buttons = document.getElementsByClassName('buttons')

let st = div.style;
st.textAlign = "center";
st.padding = "5px";
st.display = "block";
st.top = "0px";
st.left = "0px";
st.width = "100%";
st.height = toolbarHeight + "px";
st.background = "#008800";
st.color = "#FFFFFF";
st.fontSize = "16px";
st.fontFamily = "Helvetica Neue"
st.position = "fixed";

document.body.style.webkitTransform = "translateY(" + toolbarHeight + "px)";
document.documentElement.appendChild(div);

for (var i = 0; i < buttons.length; i++) {
  buttons[i].style.padding = "2px"
  buttons[i].style.fontSize = "13px"
  buttons[i].style.background = "#FFFFFF"
  buttons[i].style.margin = "4px 2px"
  buttons[i].style.borderRadius = "8px"
}

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
