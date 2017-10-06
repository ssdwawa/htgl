aviationApp.factory('enterpriseService', ['$q', '$http', 'commonService', 'config',
    function ($q, $http, commonService, config) {
        var interface_em = config.interface.EM;
        var interface_e_em = config.interface.E_EM;
        return {
            getAllEnterprise: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_em.getAllEnterprise))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getEnterpriseVip: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_em.getEnterpriseVip))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getEnterpriseInfo: function (data, type) {
                var defer = $q.defer();
                var url = type == 1 ? interface_e_em.getEnterpriseInfo : interface_em.getEnterpriseInfo;
                $http(commonService.getHttpRequestConfig('get', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            stopOrStart: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_em.stopOrStart))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            resetPwd: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_em.resetPwd))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            editVip: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_em.editVip))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getCompanyInfo: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_e_em.getCompanyInfo))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            checkCode: function (data) {
                var reqConfig = commonService.getHttpRequestConfig('get',data,interface_em.checkCode);

                reqConfig.type = reqConfig.method;
                reqConfig.async = false;
                delete reqConfig.method;
                delete reqConfig.data;
                return $.ajax(reqConfig);
            },
            checkName: function (data) {
                var reqConfig = commonService.getHttpRequestConfig('get',data,interface_em.checkName);

                reqConfig.type = reqConfig.method;
                reqConfig.async = false;
                delete reqConfig.method;
                delete reqConfig.data;
                return $.ajax(reqConfig);
            }
        }
    }]);