backApp.controller('positionCountController', ['$scope', 'commonService', 'countService', 'jobService',
    function ($scope, commonService, countService, jobService) {
        'use strict';
        commonService.setCurrentMenuActive('dc_1', $scope);
        var position_chart_option = {
            title : {
                text : '职位统计',
                x : 'center'
            },
            tooltip : {
                trigger : 'axis'
            },
            toolbox : {
                show : false
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name : '职位数量',
                    type : 'bar',
                    data : [],
                    markPoint : {
                        data : [
                            {type : 'max', name : '最大值'},
                            {type : 'min', name : '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        };

        var position_salary_option = {
            title : {
                text : '职位薪资分布',
                subtext : '',
                x: 'center'
            },
            grid : {
                left : '3%',
                right : '7%',
                bottom : '3%',
                containLabel : true
            },
            tooltip : {
                formatter : function (params) {
                    if (params.value.length > 1) {
                        return [params.value[2], ': ', params.value[0], 'k ', '~', params.value[1], 'k,',params.value[3]].join('');
                    }
                }
            },
            toolbox : {
                show : false
            },
            brush : {},
            legend : {
                data : ['Java'],
                left : 'center'
            },
            xAxis : [
                {
                    type : 'value',
                    scale : true,
                    axisLabel : {
                        formatter : '{value} K'
                    },
                    splitLine : {
                        show : false
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale : true,
                    axisLabel : {
                        formatter : '{value} K'
                    },
                    splitLine : {
                        show : false
                    }
                }
            ],
            series : [
                {
                    name : 'java',
                    type : 'scatter',
                    data : []
                }
            ]
        };
        jobService.getJobType({type: '0'}).then(function (resT) {
            if(resT && resT.length>0){
                $scope.jobTypeList = resT;
                jobService.getJobByType({jobType: resT[0].jobTypeId}).then(function (resJ) {
                    $scope.jobList = resJ;
                }, function (err) {
                });
            }
        }, function (err) {
        });

        var position_count_chart, position_salary_chart;
        var initChart = function (chartOption, chart, chartName) {
            if (chart) {
                chart.dispose();
            }
            chart = echarts.init(document.getElementById(chartName));
            chart.setOption(chartOption);
        };
        countService.getPositionCountData().then(function (res) {
            var positionData = JSON.parse(res.positionCountByName);
            if (positionData && positionData.length > 0) {
                position_chart_option.xAxis[0].data = _.pluck(positionData, 'name');
                position_chart_option.series[0].data = _.pluck(positionData, 'count');
            }
            try {
                initChart(position_chart_option, position_count_chart, 'position_count_chart');
            } catch (err) {
                console.debug('init position chart error', err)
            }

            var positionSalaryData = JSON.parse(res.positionsBySalary);
            if (positionSalaryData && positionSalaryData.length > 0) {
                position_salary_option.series[0].data = _.map(positionSalaryData, function (item) {
                    return [parseInt(item.salaryLow),parseInt(item.salaryHigh),item.companyName];
                });

            }

            try {
                initChart(position_salary_option, position_salary_chart, 'position_salary_chart');
            } catch (err) {
                console.debug('init salary chart error', err)
            }
        });

        $scope.$watch('jobType', function (newData, oldData) {
            if (newData) {
                jobService.getJobByType({jobType: newData, type: '1'}).then(function (res) {
                    $scope.jobList = res;
                }, function (err) {});
            }
        });

        $scope.searchData = function () {
            countService.getPositionCountData({jobId: $scope.jobInfoId}).then(function (res) {
                var positionSalaryData = JSON.parse(res.positionsBySalary);
                if (positionSalaryData && positionSalaryData.length > 0) {
                    $scope.isShowSalaryChart = true;

                    position_salary_option.series[0].data = _.map(positionSalaryData, function (item) {
                        return [parseInt(item.salaryLow),parseInt(item.salaryHigh),item.companyName, item.workExperience];
                    });
                    try {
                        initChart(position_salary_option, position_salary_chart, 'position_salary_chart');
                    } catch (err) {
                        console.debug('init salary chart error', err)
                    }
                } else {
                    $scope.isShowSalaryChart = false;
                }
            });
        }
    }]);