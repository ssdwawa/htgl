backApp.controller('jobApplyRecordController', ['$scope', 'commonService','jobService','$state',
    function ($scope, commonService,jobService,$state) {
        'use strict';
        commonService.setCurrentMenuActive('pm_2', $scope);
        $scope.choseTime = '0';
        $scope.tableData = [];
        $scope.currentPage = 1;
        var loadTableData = function (data) {
            jobService.getJobApplyRecord(_.extend({choseTime: $scope.choseTime}, data)).then(function (res) {
                _.each(res.dataList, function (item) {
                    item.createTime = commonService.dateFormat(item.createTime);
                    item.updateTime = commonService.dateFormat(item.updateTime);
                    item.positionCreateTime = commonService.dateFormat(item.positionCreateTime);
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

        $scope.queryTableData = function () {
            loadTableData({currPage: $scope.currentPage});
        };

        $scope.checkResume = function (row) {
            $state.go('back.check_resume', {comeFrom: 'back.job_apply_record',id:row.resumeId});
        }
    }]);