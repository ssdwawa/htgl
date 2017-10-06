aviationApp.factory('homeService', ['$q', '$http', 'commonService', 'config',
    function ($q, $http, commonService, config) {
        var interface_home = config.interface.HOME;
        return {
            login: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_home.login))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            logout: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_home.logout))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            changePwd: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_home.changePwd))
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