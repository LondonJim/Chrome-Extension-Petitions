chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.message === "start") {
          headlineString = document.querySelectorAll('h1')[0].textContent
          if (headlineString.length < 5) {
            headlineString = document.querySelectorAll('h1')[1].textContent
            if (headlineString.length < 5) {
              headlineString = document.querySelectorAll('h2')[0].textContent
            }
          }
          sendHeadline(headlineString)
          console.log(headlineString.length)
        }
        return true;
      }
    )

sendHeadline = (headlineString) => {
  chrome.runtime.sendMessage({headline: headlineString})
}

chrome.runtime.sendMessage({status: "ready"})
