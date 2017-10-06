backApp.controller('addJobController', ['$scope', 'commonService', 'jobService', '$state', '$stateParams',
    'platformService', '$timeout',
    function ($scope, commonService, jobService, $state, $stateParams, platformService, $timeout) {
        'use strict';
        commonService.setCurrentMenuActive('pm_1', $scope);
        var isSelect = false;
        $scope.formData = {};
        $scope.invalid = {};
        $scope.isFormDisabled = false;
        $scope.title ='新建职位';

        $scope.invalidMessage = {
            companyName: '企业名称不能为空!',
            jobType: '请选择职位类别!',
            jobInfoId: '请选择职位!',
            degreeRequiredId: '请选择学历!',
            type: '请选择职位!',
            workExperienceId:'请选择工作经验',
            province: '请选择省份!',
            city: '请选择城市!',
            salary: '薪资格式不正确!',
            jobDescription: '职位描述不能为空!'
        };

        if ($stateParams.id) {
            $scope.title ='编辑职位';
            jobService.getJobInfo({id: $stateParams.id}).then(function (res) {
                $scope.formData = res;
                $scope.formData.jobType = res.jobTypeId;
                $scope.formData.province = parseInt(res.provinceId);
                $scope.formData.city = parseInt(res.city);
                if(res.status == '1'){
                    $scope.isFormDisabled = true;
                }

                if(res.status == '-1'){
                    $scope.title ='查看职位';
                    $scope.isFormDisabled = true;
                    $scope.introductionDisabled = true;
                }

                $timeout(function () {
                    platformService.getCityList({provinceId: $scope.formData.provinceId}).then(function (res) {
                        $scope.cityList = res;
                        $scope.isShowCitySelector = true;
                    }, function (err) {
                    });

                    jobService.getJobByType({jobType: res.jobTypeId, type: '1'}).then(function (res) {
                        $scope.jobList = res;
                    }, function (err) {
                    });
                }, 20);

                isSelect = true;

            }, function (err) {
            });

            jobService.isJobApply({id: $stateParams.id}).then(function (res) {
                if(res != '0'){
                    $scope.isFormDisabled = true;
                }
            },function (err) {
            });
        }

        $scope.$watch('formData.province', function (newData, oldData) {
            if (newData) {
                platformService.getCityList({provinceId: newData}).then(function (res) {
                    $scope.cityList = res;
                    $scope.isShowCitySelector = true;
                }, function (err) {

                });
            }
        });

        platformService.provinceList().then(function (res) {
            $scope.provinceList = res;
        }, function (err) {
        });

        $scope.$watch('formData.jobType', function (newData, oldData) {
            if (newData) {
                jobService.getJobByType({jobType: newData, type: '1'}).then(function (res) {
                    $scope.jobList = res;
                }, function (err) {

                });
            }
        });

        $scope.selectCompany = function (item) {
            $scope.formData.companyName = item.name;
            $scope.isShowCompanyList = false;
            isSelect = true;
        };

        $scope.$watch('formData.companyName', function (newData, oldData) {
            if (newData) {
                if (!isSelect) {
                    jobService.getCompanyListByName({companyName: newData}).then(function (res) {
                        $scope.isShowCompanyList = true;
                        $scope.companyList = res;
                    }, function (err) {

                    });
                } else {
                    isSelect = false;
                }
            } else {
                $scope.isShowCompanyList = false;
            }
        });


        jobService.getJobType({type: '0'}).then(function (res) {
            $scope.jobTypeList = res;
        }, function (err) {
        });

        platformService.getExperienceList().then(function (res) {
            $scope.experienceList = res;
        }, function (err) {

        });

        platformService.getDiplomaList().then(function (res) {
            $scope.diplomaList = res;
        }, function (err) {

        });

        var submitData = function () {
            var action = $stateParams.id ? 'edit' : 'add';
            jobService.submitJob($scope.formData, action).then(function (res) {
                if (res.retCode === '-1') {
                    var index = $layer.open({
                        type: 'alert',
                        layerOption: {
                            title: '请求失败',
                            area: ['200px', 'auto'],
                            content: '<div class="message-content">' + res.retData || '系统异常请稍后重试' + '</div>'
                        }
                    });
                    $timeout(function () {
                        $layer.close(index);
                    }, 1500);
                } else {
                    $state.go('back.publish_job');
                }
            }, function (err) {
            });
        };
        var isSalaryInvalid = function (low, high) {
            var invalid = true;
            if (!commonService.isNumber(low) || !commonService.isNumber(high) || parseFloat(low) >= parseFloat(high)) {
                invalid = false;
            } else {
                invalid = true
            }
            return invalid;
        };
        $scope.submitJob = function () {
            if (!$scope.formData.companyName) {
                $scope.invalid.companyName = true;
                return;
            } else {
                $scope.invalid.companyName = false;
            }

            if (!$scope.formData.jobType) {
                $scope.invalid.jobType = true;
                return;
            } else {
                $scope.invalid.jobType = false;
            }

            if (!$scope.formData.jobInfoId) {
                $scope.invalid.jobInfoId = true;
                return;
            } else {
                $scope.invalid.jobInfoId = false;
            }

            if (!$scope.formData.type) {
                $scope.invalid.type = true;
                return;
            } else {
                $scope.invalid.type = false;
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

            if (!isSalaryInvalid($scope.formData.salaryLow, $scope.formData.salaryHigh)) {
                $scope.invalid.salary = true;
                return;
            } else {
                $scope.invalid.salary = false;
            }

            if (!$scope.formData.workExperienceId) {
                $scope.invalid.workExperienceId = true;
                return;
            } else {
                $scope.invalid.workExperienceId = false;
            }

            if (!$scope.formData.degreeRequiredId) {
                $scope.invalid.degreeRequiredId = true;
                return;
            } else {
                $scope.invalid.degreeRequiredId = false;
            }

            submitData();
        };


        $scope.cancel = function () {
            $state.go('back.publish_job');
        };
    }]);