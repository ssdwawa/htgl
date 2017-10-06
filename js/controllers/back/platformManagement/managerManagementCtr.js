backApp.controller('managerManagementCtr', ['$scope', 'commonService', 'platformService', '$localStorage', '$layer', '$timeout',
    function ($scope, commonService, platformService, $localStorage, $layer, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('pfm_1', $scope);

        $scope.tableData = [];
        var loadTableData = function () {
            platformService.getManagerList().then(function (res) {
                $scope.tableData = res;
            }, function (err) {

            });
        };
        loadTableData();

        $scope.editManager = function (row) {
            var index = $layer.open({
                type: 'form',
                layerOption: {
                    title: '编辑',
                    area: ['600px', 'auto'],
                    content: angular.element('#editAccout').html()
                },
                formData: {
                    account: row.account,
                    name: row.name,
                    phone: row.phone
                },
                layerOk: function (formData) {
                    if(!$.trim(formData.account)){
                        return;
                    }
                    formData.currentId = $localStorage.get('HTRC_LOGIN_USER').id;
                    formData.accountId = row.id;
                    platformService.editManager(formData, 'edit').then(function (res) {
                        if (res == '1') {
                            $layer.close(index);
                            loadTableData();
                        }
                    }, function (err) {
                    });
                }
            });
        };

        $scope.addManager = function () {
            var index = $layer.open({
                type: 'form',
                layerOption: {
                    title: '添加',
                    area: ['600px', 'auto'],
                    content: angular.element('#editAccout').html()
                },
                formData: null,
                layerOk: function (formData) {
                    formData.currentId = $localStorage.get('HTRC_LOGIN_USER').id;
                    formData.accountId = '';
                    platformService.editManager(formData, 'add').then(function (res) {
                        if (res == '1') {
                            $layer.close(index);
                            loadTableData();
                        }
                    }, function (err) {
                    });
                }
            });
        };

        $scope.changeStatus = function (row) {
            var message = row.status === '0' ? '账户已停用' : '账户已启用';
            var options = {
                type: 'alert',
                layerOption: {
                    title: '提示',
                    area: ['200px', 'auto'],
                    content: '<div class="message-content">' + message+ '</div>'
                }
            };
            platformService.changeStatus({
                accountId: row.id,
                status: row.status === '0'? '1':'0' ,
                currentId: $localStorage.get('HTRC_LOGIN_USER').id
            }).then(function (res) {
                var index = $layer.open(options);
                $timeout(function () {
                    $layer.close(index);
                    loadTableData();
                }, 1500);
            }, function (err) {

            });
        };

        $scope.resetManagerPwd = function (row) {
            platformService.resetManagerPwd({
                accountId: row.id,
                currentId: $localStorage.get('HTRC_LOGIN_USER').id
            }).then(function (res) {
                var index = $layer.open({
                    type: 'alert',
                    layerOption: {
                        title: '提示',
                        area: ['200px', 'auto'],
                        content: '<div class="message-content">密码重置成功</div>'
                    }
                });
                $timeout(function () {
                    $layer.close(index);
                    loadTableData();
                }, 1500);
            }, function (err) {

            });
        };
    }]);