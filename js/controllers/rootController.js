aviationApp.controller('rootController', ['$scope', '$rootScope','$layer',function ($scope, $rootScope, $layer) {
    'use strict';

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        $layer.close();
    });
}]);