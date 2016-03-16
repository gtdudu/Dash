## Dash
The goal is to get a basic understanding of the chrome extension api by designing a simple dashboard
available on new tab creation, work in progress ( inspiration: momentum dashboard :D ).

## install

* git clone
* go to chrome://extensions/
* click on load unpack extension (if it's not there be sure to have developer mode checked)
* select what you just cloned
* try to enjoy

## roadMap

- [x] basic chrome extension set up
- [x] add simple clock
- [x] rewrite for angularjs
- [x] create todo list
- [x] persist todos in chrome.storage
- [x] add goal of the day
- [ ] add quote of the day
- [ ] add weather display based on location
- [ ] add simple rss feed manager

## issues

Looks like toggleComplete is not working properly.
chrome.storage.onChanged.addListener... shows that you need to toggle two checkbox in a row for the first one to be correctly updated despite the fact that  correct values are sent to the factory.. For now i'm storing objects but maybe i should stringify all that. 
