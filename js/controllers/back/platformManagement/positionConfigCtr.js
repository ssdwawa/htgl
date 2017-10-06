backApp.controller('positionConfigCtr', ['$scope', 'commonService', '$layer', 'platformService',
    '$localStorage', '$timeout',
    function ($scope, commonService, $layer, platformService, $localStorage, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('pfm_7', $scope);

        $scope.tableData = [];
        var loadTableData = function () {
            platformService.getPositionList().then(function (res) {
                $scope.tableData = res;
            }, function (err) {

            });
        };
        loadTableData();

        var editPosition = function (tagType, actionType, row, parentTag) {
            var editName = tagType === '0' ? row.typeName : row.infoName;
            var index = $layer.open({
                type : 'form',
                layerOption : {
                    title : '添加',
                    area : ['600px', 'auto'],
                    content : angular.element('#positionEditor').html()
                },
                formData : actionType === 'add' ? null : {
                        position : editName
                    },
                layerOk : function (formData) {
                    if (!$.trim(formData.position)) {
                        return;
                    }
                    formData.id = actionType === 'add' ? '' : row.id;
                    formData.type = tagType;
                    formData.jobTypeId = parentTag ? parentTag.id : '';
                    if (tagType === '1') {
                        formData.position = formData.position;
                    }
                    platformService.editPosition(formData, actionType).then(function (res) {
                        if (res.retCode === '0') {
                            $layer.close(index);
                            loadTableData();
                        }
                    }, function (err) {
                    });
                }
            });
        };

        var deletePosition = function (tagType, row) {
            platformService.deletePosition({
                id : row.id,
                type : tagType
            }).then(function (res) {
                if (res.retCode === '0') {
                    var index = $layer.open({
                        type : 'alert',
                        layerOption : {
                            title : '提示',
                            area : ['200px', 'auto'],
                            content : '<div class="message-content">删除成功</div>'
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

        var movePosition = function (row, index, action, dataSource, tagType) {
            var formData;
            var currentRow = _.extend({}, row);
            var tempRank;
            if (action === 'up') {
                var upRow = _.extend({}, dataSource[index - 1]);
                var tempRank = upRow.rank;
                upRow.rank = currentRow.rank;
                currentRow.rank = tempRank;
                formData = [
                    {id : upRow.id, rank : upRow.rank, type : tagType},
                    {id : currentRow.id, rank : currentRow.rank, type : tagType}
                ]
            } else {
                var downRow = _.extend({}, dataSource[index + 1]);
                tempRank = downRow.rank;
                downRow.rank = currentRow.rank;
                currentRow.rank = tempRank;
                formData = [
                    {id : downRow.id, rank : downRow.rank, type : tagType},
                    {id : currentRow.id, rank : currentRow.rank, type : tagType}
                ]
            }
            platformService.movePosition(formData).then(function (res) {
                if (res.retCode === '0') {
                    var index = $layer.open({
                        type : 'alert',
                        layerOption : {
                            title : '提示',
                            area : ['200px', 'auto'],
                            content : '<div class="message-content">移动成功</div>'
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
        $scope.edit = function (row) {
            editPosition('0', 'edit', row);
        };
        $scope.editChild = function (row, parent) {
            editPosition('1', 'edit', row, parent);
        };

        $scope.add = function () {
            editPosition('0', 'add', {});
        };

        $scope.addChild = function (row) {
            editPosition('1', 'add', {}, row);
        };

        $scope.delete = function (row) {
            deletePosition('0', row);
        };

        $scope.deleteChild = function (row) {
            deletePosition('1', row);
        };

        $scope.move = function (row, index, action) {
            movePosition(row, index, action, $scope.tableData, '0');
        };

        $scope.moveChild = function (row, index, action, children) {
            movePosition(row, index, action, children, '1');
        };
    }]);