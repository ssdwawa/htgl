enterpriseApp.controller('enterpriseController', ['$scope', 'commonService', 'enterpriseService', '$state',
    '$localStorage', '$layer', 'homeService', '$timeout',
    function ($scope, commonService, enterpriseService, $state, $localStorage, $layer, homeService, $timeout) {
        'use strict';
        var enterpriseInfo = $localStorage.get('HTRC_LOGIN_ENTERPRISE') || {};

        $scope.enterInfo = {};
        enterpriseService.getEnterpriseInfo({id: enterpriseInfo.id}, 1).then(function (resData) {
            $scope.enterInfo = resData;
            $scope.username = resData.name
        }, function (errData) {

        });

        $scope.logout = function () {
            homeService.logout().then(function (res) {
                $layer.close();
                $localStorage.clear();
                $state.go('home.login');
            }, function (err) {

            });
        };

        $scope.changePwd = function () {
            var index = $layer.open({
                type: 'form',
                layerOption: {
                    title: '修改密码',
                    area: ['600px', 'auto'],
                    content: angular.element('#passwordEditor').html()
                },
                formData: null,
                layerOk: function (formData) {
                    formData.id = '';
                    homeService.changePwd(formData).then(function (res) {
                        if (res.retCode === '0') {
                            $layer.close(index);

                            $timeout(function () {
                                var successIndex = $layer.open({
                                    type: 'alert',
                                    layerOption: {
                                        title: '提示',
                                        area: ['200px', 'auto'],
                                        content: '<div class="message-content">密码修改成功!</div>'
                                    }
                                });
                                $timeout(function () {
                                    $layer.close(successIndex);
                                }, 1500);
                            }, 300);
                        } else {
                            $timeout(function () {
                                var errorIndex = $layer.open({
                                    type: 'alert',
                                    layerOption: {
                                        title: '修改失败',
                                        area: ['200px', 'auto'],
                                        content: '<div class="message-content">' + res.retData || '系统异常请稍后重试' + '</div>'
                                    }
                                });
                                $timeout(function () {
                                    $layer.close(errorIndex);
                                }, 1500);
                            }, 300);
                        }
                    }, function (err) {
                    });
                }
            });
        };

        $scope.expandMenu = function (menu) {
            _.each([
                'is_em_open',
                'is_pm_open',
                'is_pfm_open'
            ], function (item) {
                if (item == menu) {
                    $scope[item] = true;
                } else {
                    $scope[item] = false;
                }
            });
        }
    }]);