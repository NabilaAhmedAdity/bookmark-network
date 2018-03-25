(function() {
    'use strict';

    angular
        .module('bookmarkNetwork')
        .factory('appFactory', appFactory);

    function appFactory($q) {
        var folders = [];

        function callBackHandler(defer, chromeError) {
            if (chromeError) {
                console.log(chromeError.message);
                defer.regect();
            }
            else {
                defer.resolve(folders);
            }
        }

        function sync() {
            var defer = $q.defer();
            chrome.storage.sync.set({folders: folders}, function() {
                callBackHandler(defer, chrome.runtime.lastError);
            });
            return defer.promise;
        }

        var getFolders = function() {
            var defer = $q.defer();
            chrome.storage.sync.get('folders', function(keys) {
                if (keys.folders != null) {
                    folders = keys.folders;
                }
                callBackHandler(defer, chrome.runtime.lastError);
            });
            return defer.promise;
        }

        var addFolder = function() {
            var newFolder = {
                name: "untitled folder",
                urls: [],
            }
            folders.push(newFolder);
            return sync();
        }

        var rename = function(index, newName) {
            folders[index].name = newName;
            return sync();
        }

        var addBookmark = function(folderIndex, tab) {
            folders[folderIndex].urls.push(tab);
            return sync();
        }

        var deleteBookmark = function(folderIndex, bookmarkIndex) {
            folders[folderIndex].urls.splice(bookmarkIndex, 1);
            return sync();
        }

        var deleteFolder = function(folderIndex) {
            folders.splice(folderIndex, 1);
            return sync();
        }

        return {
            getFolders: getFolders,
            addFolder: addFolder,
            rename: rename,
            addBookmark:addBookmark,
            deleteBookmark: deleteBookmark,
            deleteFolder: deleteFolder
        }
    }
})();