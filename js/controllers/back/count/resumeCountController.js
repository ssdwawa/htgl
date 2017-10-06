backApp.controller('resumeCountController', ['$scope', 'commonService', 'countService',
    function ($scope, commonService, countService) {
        'use strict';
        commonService.setCurrentMenuActive('dc_2', $scope);
        var option_bar = {
            title : {
                text : '简历统计',
                x : 'center'
            },
            noDataLoadingOption:{
                text:'暂无数据',
                x:'center',
                y: 'center'
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
                    name : '简历数量',
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
        var option_pie = {
            title : {
                text : '简历学位分布情况',
                x : 'center'
            },
            tooltip : {
                trigger : 'item',
                formatter : '{a} <br/>{b} : {c} ({d}%)'
            },
            legend : {
                orient : 'vertical',
                x : 'right',
                data : []
            },
            toolbox : {
                show : false
            },
            calculable : true,
            series : [
                {
                    name : '学历',
                    type : 'pie',
                    radius : '55%',
                    center : ['50%', '60%'],
                    data : []
                }
            ]
        };

        var resume_count_year_chart, resume_count_degree_chart, resume_count_exp_chart;
        var year_chart_option = angular.copy(option_bar);
        var degree_chart_option = angular.copy(option_pie);
        var exp_chart_option = angular.copy(option_pie);

        var currentDate = new Date();
        $scope.year = currentDate.getFullYear();

        var initYearChart = function (option) {
            if (resume_count_year_chart) {
                resume_count_degree_chart.dispose();
            }
            var resume_count_year_chart = echarts.init(document.getElementById('resume_count_year_chart'));
            resume_count_year_chart.setOption(option);
        };

        var initDegreeChart = function (option) {
            if (resume_count_degree_chart) {
                resume_count_degree_chart.dispose();
            }
            var resume_count_degree_chart = echarts.init(document.getElementById('resume_count_degree_chart'));
            resume_count_degree_chart.setOption(option);
        };

        var initExpChart = function (option) {
            if (resume_count_exp_chart) {
                resume_count_exp_chart.dispose();
            }
            var resume_count_exp_chart = echarts.init(document.getElementById('resume_count_exp_chart'));
            resume_count_exp_chart.setOption(option);
        };

        var showCharts = function () {
            countService.getResumeCountData({year : $scope.year}).then(function (res) {
                var yearData = JSON.parse(res.resumeCountByMonth);
                if(yearData){
                    year_chart_option.xAxis[0].data = _.pluck(yearData, 'time');
                    year_chart_option.series[0].data = _.pluck(yearData, 'count');
                    year_chart_option.title.text = $scope.year + '年简历统计';
                }
                try {
                    initYearChart(year_chart_option);
                } catch (err){
                    console.debug('init year chart error',err)
                }

                var degreeData = JSON.parse(res.resumeCountByDegree);
                if(degreeData){
                    degree_chart_option.legend.data = _.pluck(degreeData, 'degree');
                    degree_chart_option.series[0].data = _.map(degreeData, function (item) {
                        return {name : item.degree, value : item.count}
                    });
                    degree_chart_option.title.text = '简历学位分布情况';

                }
                try {
                    initDegreeChart(degree_chart_option);
                } catch (err){
                    console.debug('init year chart error',err)
                }

                var expData = JSON.parse(res.resumeCountByExperience);
                if(expData){
                    exp_chart_option.legend.data = _.pluck(expData, 'experience');
                    exp_chart_option.series[0].data = _.map(expData, function (item) {
                        return {name : item.experience, value : item.count}
                    });
                    exp_chart_option.title.text = '简历工作经验分布情况';
                }
                try {
                    initExpChart(exp_chart_option);
                } catch (err){
                    console.debug('init year chart error',err)
                }
            });
        };
        showCharts();
        $scope.searchData = function () {
            showCharts();
        }
    }]);