(function() {
    'use strict';

    angular
        .module('bookmarkNetwork')
        .controller('bookmarkController', bookmarkController);
    
    function bookmarkController($state, $stateParams, appFactory, $http) {
        var vm = this;
        vm.folderIndex = $stateParams.folderIndex;
        vm.folderName = $stateParams.folder.name;
        vm.bookmarkList = $stateParams.folder.urls;
        vm.docUrl;
        vm.showDeleteWarning = false;
        vm.loading = false;

        vm.goBack = function() {
            $state.go('landingState');
        }

        var exist = function(stab) {
            var flag = false;
            vm.bookmarkList.map(function(eachBookmark){
                flag = (stab.favIconUrl==eachBookmark.favIconUrl && stab.url==eachBookmark.url && stab.title==eachBookmark.title);
            });
            return flag;
        }

        vm.addBookmark = function() {
            chrome.tabs.getSelected(function(tab) {
                var stab = {icon: tab.favIconUrl, title: tab.title, url: tab.url};
                if (!exist(stab)) {
                    appFactory.addBookmark(vm.folderIndex, stab).then(function(folders) {
                        vm.bookmarkList = folders[vm.folderIndex].urls;
                    });
                }
            });
        }

        vm.deleteBookmark = function(bookmarkIndex) {
            appFactory.deleteBookmark(vm.folderIndex, bookmarkIndex).then(function(folders) {
                vm.bookmarkList = folders[vm.folderIndex].urls;
            });
        }

        vm.deleteFolder = function() {
            appFactory.deleteFolder(vm.folderIndex);
            $state.go('landingState');
        }

        vm.shareFolder = function() {
            vm.loading = true;

            var bookmarkUrls = vm.bookmarkList.map(function(b) {
                return b.url;
            });
            var params = {
                folderName: vm.folderName,
                bookmarkUrls: bookmarkUrls
            }

            $http({
                method: 'GET',
                url: 'https://script.google.com/macros/s/AKfycbzZ--wZ74rTfFYPYitm01MEqd2Bndhr0vxLcVBP3r-jMipqalzp/exec',
                data: null,
                params: params,
            }).then(function successCallback(response) {
                vm.docUrl = response.data.docUrl;
            }, function errorCallback(response) {
                console.log(response);
            }).finally(function() {
                vm.loading = false;
            });
        }
    }
})();