chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.message === "start") {
          headlineString = getHeaderTag()
          sendHeadline(headlineString)
        }
        return true;
      }
    )

getHeaderTag = () => {
  let headlineString = document.querySelectorAll('h1')[0].textContent
  if (headlineString.length < 5) {
    headlineString = document.querySelectorAll('h1')[1].textContent
    if (headlineString.length < 5) {
      headlineString = document.querySelectorAll('h2')[0].textContent
    }
  }
  return headlineString
}

sendHeadline = (headlineString) => {
  chrome.runtime.sendMessage({headline: headlineString})
}
