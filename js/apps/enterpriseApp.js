'use strict';
var enterpriseApp = angular.module('enterpriseApp', ['ui.router']);
enterpriseApp.config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('enterprise', {
                abstract: true,
                url: '',
                templateUrl: 'enterprise/enterprise.html',
                controller: 'enterpriseController'
            })
            .state('enterprise.enterprise_base_info', {
                url: '/enterprise_base_info',
                templateUrl: 'enterprise/enterpriseManagement/enterprise.enterpriseBaseInfo.html',
                controller: 'enterpriseBaseInfoCtr'
            })
            .state('enterprise.e_job_apply_record', {
                url: '/e_publish_job',
                templateUrl: 'enterprise/jobManagement/enterprise.jobApplyRecord.html',
                controller: 'eJobApplyRecordController'
            })
            .state('enterprise.e_publish_job', {
                url: '/e_job_apply_record',
                templateUrl: 'enterprise/jobManagement/enterprise.publishJob.html',
                controller: 'ePublishJobController'
            })
            .state('enterprise.e_add_job', {
                url: '/e_add_job/:id',
                templateUrl: 'enterprise/jobManagement/enterprise.addJob.html',
                controller: 'eAddJobCtr'
            })
            .state('enterprise.edit_enterprise', {
                url: '/e_edit_enterprise',
                templateUrl: 'enterprise/enterpriseManagement/enterprise.editEnterprise.html',
                controller: 'editEnterpriseCtr'
            })
            .state('enterprise.check_resume', {
                url: '/check_resume/:id',
                templateUrl: 'enterprise/jobManagement/enterprise.resume.html',
                controller: 'eResumeController'
            })
    }]);