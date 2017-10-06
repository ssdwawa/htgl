enterpriseApp.controller('editEnterpriseCtr', ['$scope', 'commonService', 'config', '$state',
    'platformService', '$stateParams', 'enterpriseService', '$timeout', '$layer',
    function ($scope, commonService, config, $state, platformService, $stateParams, enterpriseService, $timeout, $layer) {
        'use strict';
        commonService.setCurrentMenuActive('em_1', $scope);
        $scope.formData = {
            logoUrl : '../images/icon1.jpg'
        };
        $scope.invalid = {};
        $scope.requestOver = {
            province : false,
            field : false,
            speTag : false
        };

        $scope.invalidMessage = {
            name : '企业名称不能为空!',
            creditCode : '社会统一信用代码不能为空!',
            industrySector : '请选择行业领域!',
            province : '请选择省份!',
            city : '请选择城市!',
            address : '详细地址不能为空!',
            contactName : '企业联系人不能为空!',
            contactPhone : '联系电话不合法!',
            email : '电子邮箱不合法!',
            introduction : '详细介绍不能为空!'
        };
        $scope.$watch('requestOver', function (newData) {
            if (newData.province && newData.field && newData.speTag) {
                enterpriseService.getEnterpriseInfo(null, 1).then(function (res) {
                    $scope.formData = res;
                    $scope.formData.logoUrl = res.logo;
                    $scope.formData.province = parseInt(res.provinceId);
                    $scope.formData.city = parseInt(res.city);
                    _.each($scope.formData.specialTag, function (item) {
                        _.each($scope.specialTagList, function (tag) {
                            _.each(tag.children, function (child) {
                                if (child.id == item) {
                                    if (tag.isradio === '0') {
                                        tag.checkedVal = item;
                                    } else {
                                        child.checked = true;
                                    }
                                }
                            });
                        })
                    });
                    platformService.getCityList({provinceId : $scope.formData.provinceId}).then(function (res) {
                        $scope.cityList = res;
                        $scope.isShowCitySelector = true;
                    }, function (err) {
                    });
                }, function (err) {
                });
            }
        }, true);

        platformService.getFieldList().then(function (res) {
            $scope.industrySectorList = res;
            $scope.requestOver.field = true;
        }, function (err) {
        });

        platformService.provinceList().then(function (res) {
            $scope.provinceList = res;
            $scope.requestOver.province = true;
        }, function (err) {

        });

        platformService.getTagList().then(function (res) {
            $scope.requestOver.speTag = true;
            _.each(res, function (tag) {
                if (tag.isradio === '0') {
                    tag.checkedVal = '';
                } else {
                    _.each(tag.children, function (child) {
                        child.checked = false;
                    });
                }
            });
            $scope.specialTagList = res;

        }, function (err) {

        });

        $scope.uploadLogo = function () {
            $('#eLogo').click();
        };

        $('#eLogo').bind('change', function () {
            $scope.formData.logoUrl = commonService.getObjectURL($('#eLogo').prop('files')[0]);
            $timeout(function () {
                $scope.$apply();
            }, 0);
        });

        $scope.$watch('formData.province', function (newData, oldData) {
            if (newData) {
                platformService.getCityList({provinceId : newData}).then(function (res) {
                    $scope.cityList = res;
                    $scope.isShowCitySelector = true;
                }, function (err) {

                });
            }
        });

        var submitData = function () {
            var formData = new FormData();
            formData.append('logo', $('#eLogo').prop('files')[0]);
            var checkedTag = [];
            _.each($scope.specialTagList, function (tag) {
                if (tag.isradio === '0') {
                    checkedTag.push(tag.checkedVal);
                } else {
                    _.each(tag.children, function (child) {
                        if (child.checked) {
                            checkedTag.push(child.id + '');
                        }
                    });
                }

            });

            formData.append('specialTag', JSON.stringify(checkedTag));
            for (var key in $scope.formData) {
                formData.append(key, $scope.formData[key]);
            }

            commonService.submitWithFormData(formData, config.interface.E_EM.submitEnterpriseInfo).then(function (resData) {
                if (resData.retCode == '-1') {
                    var index = $layer.open({
                        type : 'alert',
                        layerOption : {
                            title : '请求失败',
                            area : ['200px', 'auto'],
                            content : '<div class="message-content">' + resData.retData || '系统异常请稍后重试' + '</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(index);
                    }, 1500);
                } else {
                    $state.go('enterprise.enterprise_base_info');
                }
            }, function (errData) {

            });
        };

        $scope.confirm = function () {
            if (!$scope.formData.name) {
                $scope.invalid.name = true;
                return;
            } else {
                $scope.invalid.name = false;
            }

            if (!$scope.formData.creditCode) {
                $scope.invalid.creditCode = true;
                return;
            } else {
                $scope.invalid.creditCode = false;
            }

            if (!$scope.formData.industrySector) {
                $scope.invalid.industrySector = true;
                return;
            } else {
                $scope.invalid.industrySector = false;
            }

            if (!$scope.formData.province) {
                $scope.invalid.province = true;
                return;
            } else {
                $scope.invalid.province = false;
            }

            if (!$scope.formData.city) {
                $scope.invalid.city = true;
                return;
            } else {
                $scope.invalid.city = false;
            }

            if (!$scope.formData.address) {
                $scope.invalid.address = true;
                return;
            } else {
                $scope.invalid.address = false;
            }

            /* if (!$scope.formData.contactName) {
             $scope.invalid.contactName = true;
             return;
             } else {
             $scope.invalid.contactName = false;
             }

             if (!commonService.isPhone($scope.formData.contactPhone)) {
             $scope.invalid.contactPhone = true;
             return;
             } else {
             $scope.invalid.contactPhone = false;
             }

             if (!commonService.isEmail($scope.formData.email)) {
             $scope.invalid.email = true;
             return;
             } else {
             $scope.invalid.email = false;
             }*/

            if (!$scope.formData.introduction) {
                $scope.invalid.introduction = true;
                return;
            } else {
                $scope.invalid.introduction = false;
            }

            submitData();
        };
    }]);