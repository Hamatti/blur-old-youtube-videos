chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const observeDOM = (function () {
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
      if (!obj || !obj.nodeType === 1) return; // validation

      if (MutationObserver) {
        // define a new observer
        const obs = new MutationObserver(function (mutations, observer) {
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

  /**
   * Find all video items from the page with "year" text in the
   * "N [time span] ago" timestamp and add a inline style to each
   * of those items.
   *
   * Youtube has videos inside elements with id content and out of those,
   * elements with class ytd-rich-item-renderer are actual video thumbnails.
   *
   * If this extension breaks, it's probably due to changes in the HTML so
   * looking at the structure first would be the best way to start debugging.
   */
  const blurVideos = () => {
    const videoItems = Object.values(
      document.querySelectorAll("#content")
    ).filter((node) => node.classList.contains("ytd-rich-item-renderer"));

    videoItems.forEach((videoNode) => {
      const metaBlock = videoNode.querySelector("#metadata-line");
      const dateBlock = metaBlock?.children[1];

      if (dateBlock?.innerText?.includes("year")) {
        videoNode.style.filter = "grayscale(1) blur(7.4px)";
      }
    });
  };

  if (request.message === "clicked_browser_action") {
    observeDOM(document.getElementsByTagName("body")[0], blurVideos);
    blurVideos();
  }
});
