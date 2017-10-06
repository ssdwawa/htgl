backApp.controller('cvListController', ['$scope', 'commonService', 'jobService', '$state',
    function ($scope, commonService, jobService,$state) {
        'use strict';
        commonService.setCurrentMenuActive('pm_3', $scope);

        $scope.tableData = [];
        $scope.currentPage = 1;
        var loadTableData = function (data) {
            jobService.getCVList(data).then(function (res) {
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
            if ($scope.currentPage == $scope.tatalPage){
                return;
            }
            loadTableData({currPage: $scope.currentPage + 1});
        };

        $scope.checkResume = function (row) {
            $state.go('back.check_resume', {id:row.id, comeFrom: 'back.CV_list'});
        }
    }]);