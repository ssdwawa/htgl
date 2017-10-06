backApp.controller('backController', ['$scope', '$localStorage', 'homeService', '$timeout', '$layer', '$state',
    function ($scope, $localStorage, homeService, $timeout, $layer, $state) {
        'use strict';
        $scope.userInfo = $localStorage.get('HTRC_LOGIN_USER');
        $scope.expandMenu = function (menu) {
            _.each([
                'is_em_open',
                'is_pm_open',
                'is_pfm_open',
                'is_dc_open'
            ], function (item) {
                if (item == menu) {
                    $scope[item] = true;
                } else {
                    $scope[item] = false;
                }
            });
        };

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
                                var resultSuccess = $layer.open({
                                    type: 'alert',
                                    layerOption: {
                                        title: '提示',
                                        area: ['200px', 'auto'],
                                        content: '<div class="message-content">密码修改成功!</div>'
                                    }
                                });
                                $timeout(function () {
                                    $layer.close(resultSuccess);
                                }, 1500);
                            }, 300);
                        } else {
                            $timeout(function () {
                                var resultFail = $layer.open({
                                    type: 'alert',
                                    layerOption: {
                                        title: '修改失败',
                                        area: ['200px', 'auto'],
                                        content: '<div class="message-content">' + res.retData || '系统异常请稍后重试' + '</div>'
                                    }
                                });
                                $timeout(function () {
                                    $layer.close(resultFail);
                                }, 1500);
                            }, 300);
                        }
                    }, function (err) {
                    });
                }
            });
        };
    }]);