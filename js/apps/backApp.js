'use strict';
var backApp = angular.module('backApp', ['ui.router']);
backApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('back', {
            abstract: true,
            url: '',
            templateUrl: 'back/back.html',
            controller: 'backController'
        })
        .state('back.enterprise_library', {
            url: '/enterprise_library',
            templateUrl: 'back/enterpriseManagement/back.enterpriseLibrary.html',
            controller: 'enterpriseLibraryController'
        })
        .state('back.add_enterprise', {
            url: '/add_enterprise/:id',
            templateUrl: 'back/enterpriseManagement/back.addEnterprise.html',
            controller: 'addEnterpriseController'
        })
        .state('back.enterprise_vip', {
            url: '/enterprise_vip',
            templateUrl: 'back/enterpriseManagement/back.enterpriseVip.html',
            controller: 'enterpriseVipController'
        })
        .state('back.publish_job', {
            url: '/publish_job',
            templateUrl: 'back/jobManagement/back.publishJob.html',
            controller: 'publishJobController'
        })
        .state('back.job_apply_record', {
            url: '/job_apply_record',
            templateUrl: 'back/jobManagement/back.jobApplyRecord.html',
            controller: 'jobApplyRecordController'
        })
        .state('back.CV_list', {
            url: '/CV_list',
            templateUrl: 'back/jobManagement/back.cvList.html',
            controller: 'cvListController'
        })
        .state('back.add_job', {
            url: '/add_job/:id',
            templateUrl: 'back/jobManagement/back.addJob.html',
            controller: 'addJobController'
        })
        .state('back.characteristic_tag', {
            url: '/characteristic_tag',
            templateUrl: 'back/platformManagement/back.characteristicTag.html',
            controller: 'characteristicTagCtr'
        })
        .state('back.city_config', {
            url: '/city_config',
            templateUrl: 'back/platformManagement/back.cityConfig.html',
            controller: 'cityConfigCtr'
        })
        .state('back.diploma_config', {
            url: '/diploma_config',
            templateUrl: 'back/platformManagement/back.diplomaConfig.html',
            controller: 'diplomaConfigCtr'
        })
        .state('back.experience', {
            url: '/experience',
            templateUrl: 'back/platformManagement/back.experience.html',
            controller: 'experienceCtr'
        })
        .state('back.field', {
            url: '/field',
            templateUrl: 'back/platformManagement/back.field.html',
            controller: 'fieldCtr'
        })
        .state('back.manager_management', {
            url: '/manager_management',
            templateUrl: 'back/platformManagement/back.managerManagement.html',
            controller: 'managerManagementCtr'
        })
        .state('back.position_config', {
            url: '/position_config',
            templateUrl: 'back/platformManagement/back.positionConfig.html',
            controller: 'positionConfigCtr'
        })
        .state('back.check_resume', {
            url: '/check_resume/:comeFrom/:id',
            templateUrl: 'back/jobManagement/back.resume.html',
            controller: 'resumeController'
        })
        .state('back.position_count', {
            url: '/position_count',
            templateUrl: 'back/count/back.positionCount.html',
            controller: 'positionCountController'
        })
        .state('back.resume_count', {
            url: '/resume_count',
            templateUrl: 'back/count/back.resumeCount.html',
            controller: 'resumeCountController'
        })
}]);