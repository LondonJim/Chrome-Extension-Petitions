class DisplayHTML {

  static selectMessage = () => {
    document.getElementById("heading").innerText = "Select option"
  }

  static buttonsOn = () => {
    document.getElementsByClassName("button-block")[0].style.visibility = "visible"
  }

  static petitionOn = (petition) => {
    document.getElementById("view-link-message").style.visibility = "visible"
    document.getElementById("heading")
      .innerText = petition.attributes.action
    document.getElementById("petition-count").style.visibility = "visible"
    document.getElementById("petition-count")
      .innerText = this.numberWithCommas(petition.attributes.signature_count) + " signatures so far!"
  }

  static noRelevantPetition = () => {
    document.getElementById("heading")
      .innerText = "No relevant petition found"
    document.getElementById("view-link-message").style.visibility = "hidden"
    document.getElementById("petition-count").style.visibility = "hidden"
  }

  static numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
