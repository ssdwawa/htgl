aviationApp.factory('countService', ['$q', '$http', 'commonService', 'config',
    function ($q, $http, commonService, config) {
        var interface_dc = config.interface.DC;
        return {
            getResumeCountData : function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_dc.getResumeCountData))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getPositionCountData : function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_dc.getPositionCountData))
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