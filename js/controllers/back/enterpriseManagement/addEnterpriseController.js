aviationApp.controller('addEnterpriseController', ['$scope', 'commonService', 'config', '$state',
    'platformService', '$stateParams', 'enterpriseService', '$timeout', '$layer',
    function ($scope, commonService, config, $state, platformService, $stateParams, enterpriseService, $timeout, $layer) {
        'use strict';
        commonService.setCurrentMenuActive('em_1', $scope);
        $scope.formData = {
            logoUrl : '../images/icon1.jpg'
        };
        var editName = '';
        var editCode = '';
        $scope.requestOver = {
            province : false,
            field : false,
            speTag : false
        };

        $scope.$watch('requestOver', function (newData) {
            if (newData.province && newData.field && newData.speTag) {
                if ($stateParams.id) {
                    enterpriseService.getEnterpriseInfo({id : $stateParams.id}).then(function (res) {
                        $scope.formData = res;
                        editName = res.name;
                        editCode = res.creditCode;
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
            }
        }, true);

        $scope.invalid = {};

        $scope.invalidMessage = {
            name : '企业名称不能为空!',
            creditCode : '社会统一信用代码不能为空!',
            industrySector : '请选择行业领域!',
            workExperienceId : '请选择工作经验!',
            province : '请选择省份!',
            city : '请选择城市!',
            address:'地址不能为空',
            contactPhone : '联系电话不合法!',
            email : '电子邮箱不合法!',
            introduction : '详细介绍不能为空!'
        };

        /*$scope.checkName = function () {
            var req = false;
            if (editName) {
                if (editName !== $scope.formData.name) {
                    req = true;
                } else {
                    $scope.invalidMessage.name = '企业名称不能为空';
                    $scope.invalid.name = false;
                }
            } else {
                if ($scope.formData.name) {
                    req = true;
                }
            }

            if (req) {
                enterpriseService.checkName({companyName : $scope.formData.name || ''}).done(function (res) {
                    if (res.retCode == '-1') {
                        $scope.invalidMessage.name = res.retData;
                        $scope.invalid.name = true;

                    } else {
                        $scope.invalidMessage.name = '企业名称不能为空';
                        $scope.invalid.name = false;
                    }
                });
            }
        };

        $scope.checkCode = function () {
            var req = false;
            if (editCode) {
                if (editCode !== $scope.formData.creditCode) {
                    req = true;
                } else {
                    $scope.invalid.creditCode = false;
                    $scope.invalidMessage.creditCode = '社会统一信用代码不能为空';
                }
            } else {
                if ($scope.formData.creditCode) {
                    req = true;
                }
            }
            if (req) {
                enterpriseService.checkCode({creditCode : $scope.formData.creditCode || ''}).done(function (res) {
                    if (res.retCode == '-1') {
                        $scope.invalidMessage.creditCode = res.retData;
                        $scope.invalid.creditCode = true;
                    } else {
                        $scope.invalid.creditCode = false;
                        $scope.invalidMessage.creditCode = '社会统一信用代码不能为空';
                    }
                });
            }
        };*/

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
            var url = $stateParams.id ? config.interface.EM.editEnterprise : config.interface.EM.addEnterprise;

            commonService.submitWithFormData(formData, url).then(function (resData) {
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
                    $state.go('back.enterprise_library');
                }
            }, function (errData) {

            });
        };

        $scope.confirm = function () {
            if (!$scope.formData.name) {
                $scope.invalid.name = true;
                return;
            } else {
                var reqName = false;
                if (editName) {
                    if (editName !== $scope.formData.name) {
                        reqName = true;
                    } else {
                        $scope.invalidMessage.name = '企业名称不能为空';
                        $scope.invalid.name = false;
                    }
                } else {
                    if ($scope.formData.name) {
                        reqName = true;
                    }
                }
                if(reqName){
                    var nameBack;
                    enterpriseService.checkName({companyName : $scope.formData.name || ''}).done(function (res) {
                        nameBack = res;
                    });
                    if (nameBack.retCode == '-1') {
                        $scope.invalidMessage.name = nameBack.retData;
                        $scope.invalid.name = true;
                        return;
                    } else {
                        $scope.invalidMessage.name = '企业名称不能为空';
                        $scope.invalid.name = false;
                    }
                } else {
                    $scope.invalidMessage.name = '企业名称不能为空';
                    $scope.invalid.name = false;
                }

            }

            if (!$scope.formData.creditCode) {
                $scope.invalid.creditCode = true;
                return;
            } else {
                var reqCode = false;
                if (editCode) {
                    if (editCode !== $scope.formData.creditCode) {
                        reqCode = true;
                    } else {
                        $scope.invalid.creditCode = false;
                        $scope.invalidMessage.creditCode = '社会统一信用代码不能为空';
                    }
                } else {
                    if ($scope.formData.creditCode) {
                        reqCode = true;
                    }
                }

                if(reqCode) {
                    var creditCodeBack;
                    enterpriseService.checkCode({creditCode : $scope.formData.creditCode || ''}).done(function (res) {
                        creditCodeBack = res;
                    });

                    if (creditCodeBack.retCode == '-1') {
                        $scope.invalidMessage.creditCode = creditCodeBack.retData;
                        $scope.invalid.creditCode = true;
                        return;
                    } else {
                        $scope.invalid.creditCode = false;
                        $scope.invalidMessage.creditCode = '社会统一信用代码不能为空';
                    }
                } else{
                    $scope.invalid.creditCode = false;
                    $scope.invalidMessage.creditCode = '社会统一信用代码不能为空';
                }
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

            /*if (!commonService.isEmail($scope.formData.email)) {
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