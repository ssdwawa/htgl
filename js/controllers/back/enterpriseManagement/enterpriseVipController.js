aviationApp.controller('enterpriseVipController', ['$scope', 'commonService', 'enterpriseService',
    '$layer', '$timeout',
    function ($scope, commonService, enterpriseService, $layer, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('em_2', $scope);

        $scope.currentPage = 1;
        $scope.tableData = [];
        var reloadTable = function (data) {
            data = _.extend(data, {status: '0'});
            var reqData = $scope.searchName ? _.extend(data, {companyName: $scope.searchName}) : data;
            enterpriseService.getEnterpriseVip(reqData).then(function (resData) {
                $scope.tableData = resData.dataList;
                $scope.currentPage = resData.condition.currPage;
                $scope.tatalPage = resData.totlePageNum;
                // $scope.tableData = mockData;
            }, function (errData) {
                $scope.tableData = [];
            });
        };
        reloadTable({currPage: $scope.currentPage});

        $scope.prePage = function () {
            if ($scope.currentPage == 1) {
                return;
            }

            reloadTable({currPage: $scope.currentPage - 1});
        };
        $scope.nextPage = function () {
            if ($scope.currentPage == $scope.tatalPage) {
                return;
            }
            reloadTable({currPage: $scope.currentPage + 1});
        };

        $scope.resetPwd = function (row) {
            enterpriseService.resetPwd({id: row.id, account: row.account}).then(function (res) {
                if (res.retCode === '0') {
                    var index = $layer.open({
                        type: 'alert',
                        layerOption: {
                            title: '提示',
                            area: ['200px', 'auto'],
                            content: '<div class="message-content">密码重置成功!</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(index);
                        //reloadTable();
                    }, 1500);
                }
            });
        };

        $scope.editVip = function (row) {
            var vipEditorIndex = $layer.open({
                type: 'form',
                layerOption: {
                    title: '编辑',
                    area: ['600px', 'auto'],
                    content: angular.element('#vipEditor').html()
                },
                formData: {
                    account: row.account || ''
                },
                layerOk: function (formData) {
                    if(!$.trim(formData.account)){
                        return;
                    }
                    formData.id = row.id;
                    enterpriseService.editVip(formData).then(function (res) {
                        if (res.retCode == '0') {
                            $layer.close(vipEditorIndex);
                            reloadTable({currPage: $scope.currentPage});
                        } else {
                            var vipEditorResultIndex = $layer.open({
                                type: 'alert',
                                layerOption: {
                                    title: '请求失败',
                                    area: ['200px', 'auto'],
                                    content: '<div class="message-content">' + res.retData || '系统异常请稍后重试' + '</div>'
                                }
                            });
                            $timeout(function () {
                                $layer.close(vipEditorResultIndex);
                            }, 1500);
                        }
                    }, function (err) {
                    });
                }
            });
        };

        $scope.searchCompany = function () {
            if (!$scope.searchName) {
                $scope.searchName = '';
            }
            reloadTable({currPage: $scope.currentPage})
        }
    }]);