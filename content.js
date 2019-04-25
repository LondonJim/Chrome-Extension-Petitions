chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "start" ) {
          headlineString = document.querySelectorAll('h1')[0].textContent
          sendHeadline(headlineString)
        }
        return true;
      }
    )

sendHeadline = (headlineString) => {
  chrome.runtime.sendMessage({headline: headlineString})
}

chrome.runtime.sendMessage({status: "ready"})
