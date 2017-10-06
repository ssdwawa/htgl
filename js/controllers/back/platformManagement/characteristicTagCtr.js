backApp.controller('characteristicTagCtr', ['$scope', 'commonService', '$layer',
    'platformService', '$localStorage', '$timeout',
    function ($scope, commonService, $layer, platformService, $localStorage, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('pfm_6', $scope);

        $scope.tableData = [];
        var loadTableData = function () {
            platformService.getTagList().then(function (res) {
                $scope.tableData = res;
            }, function (err) {

            });
        };
        loadTableData();

        var editTag = function (tagType, actionType, row, parentTag) {
            var layerContent = tagType === '0' ?
                angular.element('#tagEditor').html() : angular.element('#childEditor').html()
            var layerFormData = actionType === 'edit' ?
                {tagName: tagType === '0' ? row.tagName : row.infoName, isRadio: row.isradio || ''} : null;
            var options = {
                type: 'form',
                layerOption: {
                    title: '添加',
                    area: ['600px', 'auto'],
                    content: layerContent
                },
                formData: layerFormData,
                layerOk: function (formData) {
                    if(tagType === '0'){
                        if(!$.trim(formData.tagName) || !$.trim(formData.isRadio)){
                            return;
                        }
                    }else {
                        if(!$.trim(formData.tagName)){
                            return;
                        }
                    }

                    formData.id = actionType === 'add' ? '' : row.id;
                    formData.type = tagType;
                    formData.tagId = parentTag ? parentTag.id : '';
                    if (tagType === '1') {
                        formData.infoName = formData.tagName;
                    }
                    platformService.editTag(formData, actionType).then(function (res) {
                        if (res.retCode === '0') {
                            $layer.close(tagEditorIndex);
                            loadTableData();
                        }
                    }, function (err) {
                    });
                }
            };
            var tagEditorIndex = $layer.open(options);
        };

        var deleteTag = function (tagType, row) {
            platformService.deleteTag({
                id: row.id,
                type: tagType
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

        var moveTag = function (row, index, action, dataSource, tagType) {
            var formData;
            var currentRow = _.extend({}, row);
            var tempRank;
            if (action === 'up') {
                var upRow = _.extend({}, dataSource[index - 1]);
                var tempRank = upRow.rank;
                upRow.rank = currentRow.rank;
                currentRow.rank = tempRank;
                formData = [
                    {id: upRow.id, rank: upRow.rank,type: tagType},
                    {id: currentRow.id, rank: currentRow.rank,type: tagType}
                ]
            } else {
                var downRow = _.extend({}, dataSource[index + 1]);
                tempRank = downRow.rank;
                downRow.rank = currentRow.rank;
                currentRow.rank = tempRank;
                formData = [
                    {id: downRow.id, rank: downRow.rank, type: tagType},
                    {id: currentRow.id, rank: currentRow.rank, type: tagType}
                ]
            }
            platformService.moveTag(formData).then(function (res) {
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
        $scope.edit = function (row) {
            editTag('0', 'edit', row);
        };
        $scope.editChild = function (row, parent) {
            editTag('1', 'edit', row, parent);
        };

        $scope.add = function () {
            editTag('0', 'add', {});
        };

        $scope.addChild = function (row) {
            editTag('1', 'add', {}, row);
        };

        $scope.delete = function (row) {
            deleteTag('0', row);
        };

        $scope.deleteChild = function (row) {
            deleteTag('1', row);
        };

        $scope.move = function (row, index, action) {
            moveTag(row, index, action, $scope.tableData, '0');
        };

        $scope.moveChild = function (row, index, action, children) {
            moveTag(row, index, action, children, '1');
        };
    }]);