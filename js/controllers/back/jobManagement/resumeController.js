backApp.controller('resumeController', ['$scope', 'commonService', '$state', '$stateParams', 'jobService',
    function ($scope, commonService, $state, $stateParams, jobService) {
        'use strict';
        if($stateParams.comeFrom === 'back.job_apply_record'){
            commonService.setCurrentMenuActive('pm_2', $scope);
        } else {
            commonService.setCurrentMenuActive('pm_3', $scope);
        }


        jobService.getResumeInfo({resumeId: $stateParams.id}).then(function (res) {
            $scope.resumeInfo = res;
        }, function (err) {

        });
        $scope.goBack = function () {
            $state.go($stateParams.comeFrom);
        }
    }]);