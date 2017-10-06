backApp.controller('cityConfigCtr', ['$scope', 'commonService',
    function ($scope, commonService) {
        'use strict';
        commonService.setCurrentMenuActive('pfm_2', $scope);
    }]);