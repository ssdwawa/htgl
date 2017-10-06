backApp.controller('eResumeController', ['$scope', 'commonService', '$state', '$stateParams', 'jobService', '$layer',
    function ($scope, commonService, $state, $stateParams, jobService, $layer) {
        'use strict';
        commonService.setCurrentMenuActive('pm_2', $scope);

        jobService.getResumeInfo({id: $stateParams.id}, 1).then(function (res) {
            $scope.resumeInfo = res.resumeView;
        }, function (err) {

        });

        $scope.goBack = function () {
            $state.go('enterprise.e_job_apply_record');
        };

        $scope.notice = function () {
            var options = {
                type: 'form',
                layerOption: {
                    title: '面试通知',
                    area: ['600px', '450px'],
                    content: angular.element('#noticeEditor').html()
                },
                formData: null,
                layerOk: function (formData) {
                    formData.id = $stateParams.id;
                    jobService.notice(formData).then(function (res) {
                        if (res.retCode === '0') {
                            $layer.close(index);
                        }
                    }, function (err) {
                    });
                }
            };
            var index = $layer.open(options);
        }
    }]);