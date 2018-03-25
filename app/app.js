(function() {
    'use strict';

    angular
        .module("bookmarkNetwork", ['ui.router'])
        .run(runBlock);
    
        function runBlock($state) {
            $state.go('landingState');
        }
})();
