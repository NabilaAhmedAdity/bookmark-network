(function() {
    'use strict';

    angular
        .module('bookmarkNetwork')
        .config(routerConfig);
    
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('landingState', {
                templateUrl: 'app/modules/folders/folders.html',
                controller: 'folderController',
                controllerAs: 'folderCtrl'
            })
            .state('insideFolderState', {
                templateUrl: 'app/modules/bookmarks/bookmarks.html',
                controller: 'bookmarkController',
                controllerAs: 'bookmarkCtrl',
                params: {folderIndex: -1, folder: {}}
            });
    }
})();
