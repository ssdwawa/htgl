aviationApp.controller('loginController', ['$scope', 'homeService', '$state', '$localStorage',
    '$layer', '$timeout',
    function ($scope, homeService, $state, $localStorage, $layer, $timeout) {
        'use strict';
        $scope.formData = {};
        $scope.invalid = {};
        $scope.invalidMessage = {
            account: '用户名不能为空!',
            pwd: '密码不能为空!'
        };

        $scope.login = function () {
            if (!$scope.formData.account) {
                $scope.invalid.account = true;
                return;
            } else {
                $scope.invalid.account = false;
            }

            if (!$scope.formData.pwd) {
                $scope.invalid.pwd = true;
                return;
            } else {
                $scope.invalid.pwd = false;
            }

            homeService.login($scope.formData).then(function (res) {
                if (res.retCode === '0') {
                    if (JSON.parse(res.retData).functionGroup === 1) {
                        $localStorage.set('HTRC_LOGIN_USER', JSON.parse(res.retData));
                        $state.go('back.enterprise_library');
                    } else {
                        $localStorage.set('HTRC_LOGIN_ENTERPRISE', JSON.parse(res.retData));
                        $state.go('enterprise.enterprise_base_info');
                    }
                } else {
                    var index = $layer.open({
                        type: 'alert',
                        layerOption: {
                            title: '登录失败',
                            area: ['200px', 'auto'],
                            content: '<div class="message-content">' + res.retData || '系统异常请稍后重试' + '</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(index);
                    }, 1500);
                }
            }, function (err) {

            });
        }
    }]);