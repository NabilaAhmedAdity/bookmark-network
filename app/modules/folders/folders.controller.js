(function() {
    'use strict';

    angular
        .module('bookmarkNetwork')
        .controller('folderController',  folderController);

        function folderController($state, appFactory) {
            var vm = this;
            vm.folders = [];
            vm.editIndex = -1;

            appFactory.getFolders().then(function(folders) {
                vm.folders = folders;
            });

            vm.addFolder = function() {
                appFactory.addFolder().then(function(folders) {
                    vm.folders = folders;
                });    
            }

            vm.startEditing = function(index) {
                vm.editIndex = index;
            }

            vm.doneEditing = function() {
                var newName = vm.folders[vm.editIndex].name
                appFactory.rename(vm.editIndex, newName).then(function(folders) {
                    vm.folders = folders;
                });
                vm.editIndex = -1;
            }

            vm.open = function(index) {
                $state.go('insideFolderState', {folderIndex: index, folder: vm.folders[index]});
            }
        }
})();
