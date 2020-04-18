chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var observeDOM = (function () {
    var MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
      if (!obj || !obj.nodeType === 1) return; // validation

      if (MutationObserver) {
        // define a new observer
        var obs = new MutationObserver(function (mutations, observer) {
          callback(mutations);
        });
        // have the observer observe foo for changes in children
        obs.observe(obj, { childList: true, subtree: true });
      } else if (window.addEventListener) {
        obj.addEventListener("DOMNodeInserted", callback, false);
        obj.addEventListener("DOMNodeRemoved", callback, false);
      }
    };
  })();

  if (request.message === "clicked_browser_action") {
    observeDOM(document.getElementsByTagName("body")[0], () => {
      const videoItems = Object.values(
        document.querySelectorAll("#content")
      ).filter((node) => node.classList.contains("ytd-rich-item-renderer"));

      videoItems.forEach((videoNode) => {
        const metaBlock = videoNode.querySelector("#metadata-line");
        const dateBlock = metaBlock?.children[1];

        if (dateBlock?.innerText?.includes("year")) {
          console.log("found one");
          videoNode.style.filter = "grayscale(1) blur(7.4px)";
        }
      });
    });

    const videoItems = Object.values(
      document.querySelectorAll("#content")
    ).filter((node) => node.classList.contains("ytd-rich-item-renderer"));

    videoItems.forEach((videoNode) => {
      const metaBlock = videoNode.querySelector("#metadata-line");
      const dateBlock = metaBlock?.children[1];

      if (dateBlock?.innerText?.includes("year")) {
        console.log("found one");
        videoNode.style.filter = "grayscale(1) blur(7.4px)";
      }
    });
  }
});
