chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    const videoItems = Object.values(
      document.querySelectorAll("#content")
    ).filter(node => node.classList.contains("ytd-rich-item-renderer"));

    videoItems.forEach(videoNode => {
      const metaBlock = videoNode.querySelector("#metadata-line");
      const dateBlock = metaBlock?.children[1];

      if (dateBlock?.innerText?.includes("year")) {
        console.log("found one");
        videoNode.style.filter = "grayscale(1) blur(7.4px)";
      }
    });
  }
});
