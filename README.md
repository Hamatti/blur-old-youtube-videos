# Blur old Youtube recommendations

Youtube's recommendation system is wacky. Sometimes, it brings up old recommendations from years ago and I get excited about them being new. I built this small extension for myself to hide them so I can focus on newer items.

## How does it work?

On Youtube front page, where you see the list of recommendations, if you click the extension icon, it will grayscale and blur all items with timestamp of 1 year or older. It's bit crude but it helps my focus not wandering into them.

![Youtube interface with old videos blurred](screenshot.png)

## How to use?

It's currently an unpacked extension so clone this repository with

```
git clone git@github.com:Hamatti/blur-old-youtube-videos.git
```

then open your Google Chrome, go to [chrome://extensions](chrome://extensions), enable Developer mode from the toggle and select "Load unpacked" and navigate to this folder.
