'use strict';

angular.module('app').controller('appController', function ($scope) {
    var vm = this;
    vm.folders = [];
    vm.editIndex = -1;
    vm.folderIsOpen = -1;

    vm.editName = function (index) {
        vm.editIndex = index;
    }

    vm.doneEditing = function (folder) {
        vm.editIndex = -1;
    };

    vm.sync = function() {
        chrome.storage.sync.set({folders: vm.folders});
    }

    vm.addFolder = function () {
        var newFolder = {
            name: "untitled folder",
            urls: []
        }

        vm.folders.push(newFolder);
        vm.sync();
    }

    vm.saveName = function(name) {
        if (name.length > 0) {
            vm.sync();
        }
    }

    vm.removeFolder = function(index) {
        vm.folders.splice(index, 1);
        vm.sync();
    }

    vm.openFolder = function(index) {
        vm.folderIsOpen = index;
        vm.urls = vm.folders[index].urls;
    }

    vm.addUrl = function() {
        chrome.tabs.getSelected(function(tab) {
            console.log(tab)
            vm.folders[vm.folderIsOpen].urls.push(tab);
            $scope.$apply();
            // vm.sync();
        })
    }
    

    chrome.storage.sync.get('folders', function(keys) {
        if (keys.folders != null) {
            vm.folders = keys.folders;
            $scope.$apply();
        }
    });
});
