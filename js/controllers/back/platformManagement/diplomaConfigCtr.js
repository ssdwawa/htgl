backApp.controller('diplomaConfigCtr', ['$scope', 'commonService', '$layer', 'platformService',
    '$localStorage', '$timeout',
    function ($scope, commonService, $layer, platformService, $localStorage, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('pfm_3', $scope);
        $scope.tableData = [];
        var loadTableData = function () {
            platformService.getDiplomaList().then(function (res) {
                $scope.tableData = res;
            }, function (err) {

            });
        };
        loadTableData();


        $scope.edit = function (row) {
            var index = $layer.open({
                type: 'form',
                layerOption: {
                    title: '编辑',
                    area: ['600px', 'auto'],
                    content: angular.element('#diplomaEditor').html()
                },
                formData: {
                    degree: row.degree
                },
                layerOk: function (formData) {
                    if (!$.trim(formData.degree)) {
                        return;
                    }
                    formData.diplomaId = row.id;
                    platformService.editDiploma(formData, 'edit').then(function (res) {
                        if (res.retCode == '0') {
                            $layer.close(index);
                            loadTableData();
                        }
                    }, function (err) {
                    });
                }
            });
        };

        $scope.addDiploma = function () {
            var index = $layer.open({
                type: 'form',
                layerOption: {
                    title: '添加',
                    area: ['600px', 'auto'],
                    content: angular.element('#diplomaEditor').html()
                },
                formData: null,
                layerOk: function (formData) {
                    formData.id = '';
                    platformService.editDiploma(formData, 'add').then(function (res) {
                        if (res.retCode === '0') {
                            $layer.close(index);
                            loadTableData();
                        }
                    }, function (err) {
                    });
                }
            });
        };

        $scope.delete = function (row) {
            platformService.deleteDiploma({
                id: row.id
            }).then(function (res) {
                if (res.retCode === '0') {
                    var index = $layer.open({
                        type: 'alert',
                        layerOption: {
                            title: '提示',
                            area: ['200px', 'auto'],
                            content: '<div class="message-content">删除成功</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(index);
                        loadTableData();
                    }, 1500);
                } else {
                    var errorIndex = $layer.open({
                        type : 'alert',
                        layerOption : {
                            title : '提示',
                            area : ['200px', 'auto'],
                            content : '<div class="message-content">' + res.retData + '</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(errorIndex);
                        loadTableData();
                    }, 1500);
                }
            }, function (err) {

            });
        };

        $scope.move = function (row, index, type) {
            var formData;
            var currentRow = _.extend({}, row);
            var tempRank;
            if (type === 'up') {
                var upRow = _.extend({}, $scope.tableData[index - 1]);
                var tempRank = upRow.rank;
                upRow.rank = currentRow.rank;
                currentRow.rank = tempRank;
                formData = [
                    {id: upRow.id, rank: upRow.rank},
                    {id: currentRow.id, rank: currentRow.rank}
                ]
            } else {
                var downRow = _.extend({}, $scope.tableData[index + 1]);
                tempRank = downRow.rank;
                downRow.rank = currentRow.rank;
                currentRow.rank = tempRank;
                formData = [
                    {id: downRow.id, rank: downRow.rank},
                    {id: currentRow.id, rank: currentRow.rank}
                ]
            }
            platformService.moveDiploma(formData).then(function (res) {
                if (res.retCode === '0') {
                    var index = $layer.open({
                        type: 'alert',
                        layerOption: {
                            title: '提示',
                            area: ['200px', 'auto'],
                            content: '<div class="message-content">移动成功</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(index);
                        loadTableData();
                    }, 1500);
                }
            }, function (err) {

            });
        };
    }]);