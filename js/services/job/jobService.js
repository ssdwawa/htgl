aviationApp.factory('jobService', ['$q', '$http', 'commonService', 'config',
    function ($q, $http, commonService, config) {
        var interface_jm = config.interface.JM;
        var interface_e_jm = config.interface.E_JM;
        return {

            getJobApplyRecord: function (data, type) {
                var defer = $q.defer();
                var url = type == 1 ? interface_e_jm.getJobApplyRecord : interface_jm.getJobApplyRecord;
                $http(commonService.getHttpRequestConfig('get', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getJobList: function (data, type) {
                var defer = $q.defer();
                var url = type == 1 ? interface_e_jm.getJobList : interface_jm.getJobList;
                $http(commonService.getHttpRequestConfig('get', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            submitJob: function (data, action, type) {
                var defer = $q.defer();
                var urlConfig = type == 1 ? interface_e_jm : interface_jm;
                var url = action === 'add' ? urlConfig.addJob : urlConfig.editJob;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            changeJobStatus: function (data, type) {
                var defer = $q.defer();
                var url = type == 1 ? interface_e_jm.changeJobStatus : interface_jm.changeJobStatus;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getJobType: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_jm.getJobType))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getJobByType: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_jm.getJobByType))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getCVList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_jm.getCVList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getResumeInfo: function (data, type) {
                var defer = $q.defer();
                var url = type == 1 ? interface_e_jm.checkResume : interface_jm.getResumeInfo;
                $http(commonService.getHttpRequestConfig('get', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getCompanyListByName: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_jm.getCompanyListByName))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getJobInfo: function (data, type) {
                var defer = $q.defer();
                var url = type == 1 ? interface_e_jm.getJobInfo : interface_jm.getJobInfo;
                $http(commonService.getHttpRequestConfig('get', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            isJobApply: function (data, type) {
                var defer = $q.defer();
                var url = type == 1 ? interface_e_jm.isJobApply : interface_jm.isJobApply;
                $http(commonService.getHttpRequestConfig('get', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            notice: function (data) {
                var defer = $q.defer();

                $http(commonService.getHttpRequestConfig('post', data, interface_jm.notice))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            }
        }
    }]);