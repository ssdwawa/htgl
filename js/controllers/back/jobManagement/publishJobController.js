backApp.controller('publishJobController', ['$scope', 'commonService', 'jobService', '$state', '$layer',
    '$timeout',
    function ($scope, commonService, jobService, $state, $layer, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('pm_1', $scope);
        $scope.tableData = [];
        $scope.currentPage = 1;
        var loadTableData = function (data) {
            jobService.getJobList(data).then(function (res) {
                _.each(res.dataList, function (item) {
                    item.updateTime = commonService.dateFormat(item.updateTime);
                });
                $scope.tableData = res.dataList;
                $scope.currentPage = res.condition.currPage;
                $scope.tatalPage = res.totlePageNum;
            }, function (err) {
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
            if ($scope.currentPage == $scope.tatalPage) {
                return;
            }
            loadTableData({currPage: $scope.currentPage + 1});
        };

        $scope.edit = function (row) {
            $state.go('back.add_job', {id: row.id});
          /*  if (row.status == '1') {
                var index = $layer.open({
                    type: 'alert',
                    layerOption: {
                        title: '提示',
                        area: ['200px', 'auto'],
                        content: '<div class="message-content">职位发布不能编辑!</div>'
                    }
                });
                $timeout(function () {
                    $layer.close(index);
                    loadTableData();
                }, 1500);
            } else {
                $state.go('back.add_job', {id: row.id});
            }*/
        };
        var changeStatus = function (id, action) {
            jobService.changeJobStatus({id: id, status: action}).then(function (res) {
                if (res.retCode === '0') {
                    var index = $layer.open({
                        type: 'alert',
                        layerOption: {
                            title: '提示',
                            area: ['200px', 'auto'],
                            content: action === '1' ?
                                '<div class="message-content">职位发布成功!</div>' : '<div class="message-content">职位撤销成功!</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(index);
                        loadTableData();
                    }, 1500);
                }
            }, function (res) {

            });
        };
        $scope.changeJobStatus = function (row, action) {
            if (action == '0') {
                jobService.isJobApply({id: row.id}).then(function (res) {
                    if (res != '0') {
                        var index =$layer.open({
                            type: 'alert',
                            layerOption: {
                                title: '提示',
                                area: ['200px', 'auto'],
                                content: '<div class="message-content">职位已有人投递不允许撤销!</div>'
                            }
                        });
                        $timeout(function () {
                            $layer.close(index);
                            loadTableData();
                        }, 1500);
                    } else {
                        changeStatus(row.id, action)
                    }
                }, function (err) {
                });
            } else {
                var errorIndex =$layer.open({
                    type: 'form',
                    layerOption: {
                        title: '提示',
                        area: ['600px', 'auto'],
                        content: angular.element('#infoPublishJob').html()
                    },
                    layerOk: function () {
                        $layer.close(errorIndex);
                        changeStatus(row.id, action);
                    }
                });
            }
        };

        $scope.check = function (row) {
            $state.go('back.add_job', {id: row.id});
        }
    }]);