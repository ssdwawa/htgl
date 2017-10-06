aviationApp.controller('enterpriseLibraryController', ['$scope', 'commonService', 'enterpriseService',
    '$state', '$layer', '$timeout',
    function ($scope, commonService, enterpriseService, $state, $layer, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('em_1', $scope);
        $scope.currentPage = 1;
        $scope.tableData = [];
        var loadTableData = function (data) {
            var reqData = $scope.searchName ? _.extend(data, {companyName: $scope.searchName}) : data;
            enterpriseService.getAllEnterprise(reqData).then(function (resData) {
                _.each(resData.dataList, function (item) {
                    if (!item.account) {
                        item.account = '未开通';
                    }
                });
                $scope.tableData = resData.dataList;
                $scope.currentPage = resData.condition.currPage;
                $scope.tatalPage = resData.totlePageNum;
            }, function (errData) {
                $scope.tableData = [];
            });
        };
        loadTableData({currPage: $scope.currentPage});

        $scope.prePage = function () {
            if ($scope.currentPage == 1) {
                return;
            }

            loadTableData({currPage: $scope.currentPage - 1});
        };
        $scope.nextPage = function () {
            if ($scope.currentPage == $scope.tatalPage){
                return;
            }
            loadTableData({currPage: $scope.currentPage + 1});
        };

        $scope.edit = function (row) {
            $state.go('back.add_enterprise', {id: row.id});
        };

        $scope.stopOrStart = function (row, action) {
            enterpriseService.stopOrStart({id: row.id, status: action}).then(function (res) {
                if (res.retCode === '0') {
                    if (res.retCode === '0') {
                        var successIndex = $layer.open({
                            type: 'alert',
                            layerOption: {
                                title: '提示',
                                area: ['200px', 'auto'],
                                content: action === '1' ? '<div class="message-content">企业账户已停用</div>' : '<div class="message-content">企业账户已启用</div>'
                            }
                        });
                        $timeout(function () {
                            $layer.close(successIndex);
                            loadTableData();
                        }, 1500);
                    } else {
                        var errorIndex = $layer.open({
                            type: 'alert',
                            layerOption: {
                                title: '请求失败',
                                area: ['200px', 'auto'],
                                content: '<div class="message-content">'+ res.retData || '系统异常请稍后重试'+'</div>'
                            }
                        });
                        $timeout(function () {
                            $layer.close(errorIndex);
                        }, 1500);
                    }
                }
            }, function () {
            });
        };
        
        $scope.searchCompany = function () {
            if(!$scope.searchName){
                $scope.searchName = '';
            }
            loadTableData({currPage: $scope.currentPage})
        }
    }]);