enterpriseApp.controller('enterpriseBaseInfoCtr', ['$scope', 'commonService', 'enterpriseService', '$state',
    '$localStorage',
    function ($scope, commonService, enterpriseService, $state, $localStorage) {
        'use strict';
        commonService.setCurrentMenuActive('em_1', $scope);

        var enterpriseInfo = $localStorage.get('HTRC_LOGIN_ENTERPRISE');

        $scope.enterInfo = {};
        enterpriseService.getCompanyInfo({id: enterpriseInfo.id}, 'enterprise').then(function (resData) {
            $scope.enterInfo = resData;
            $('#enterpriseIntroduction').html('<p>' + resData.introduction.replace(/\n/g,'<br/>') + '</p>');
        }, function (errData) {

        });

        $scope.go2Edit = function () {
            $state.go('enterprise.edit_enterprise');
        }
    }]);