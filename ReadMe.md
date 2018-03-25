# bookmark-network

BookmarkNetwork is a chrome extension.

### This extension mainly fulfills two purposes:
1. *User can manage bookmarks in folders:* The New Folder button in the top right corner creates a new folder with the default name untitled folder. The user can change it by double clicking the name. By a single click, the folder opens and their user can add bookmarks by tapping on the star.

2. *The folder is shareable:* If the folder contains at least one bookmark, the share icon appears. By clicking the share icon, a new shareable link to a google doc generates. This doc contains a list of bookmarks in the selected folder.

### Stack
Built the full chrome extension in AngularJS. And to manupulate google doc, had to write code in App Script. Code.gs file contains the code.
