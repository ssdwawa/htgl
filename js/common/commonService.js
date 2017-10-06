aviationApp.factory('commonService', ['$q', '$http', function ($q, $http) {
    return {
        setCurrentMenuActive: function (menu, scope) {
            _.each([
                'is_em_1_active',
                'is_em_2_active',
                'is_pm_1_active',
                'is_pm_2_active',
                'is_pm_3_active',
                'is_pfm_1_active',
                'is_pfm_2_active',
                'is_pfm_3_active',
                'is_pfm_4_active',
                'is_pfm_5_active',
                'is_pfm_6_active',
                'is_pfm_7_active',
                'is_dc_1_active',
                'is_dc_2_active'
            ], function (item) {
                if (item.indexOf(menu) !== -1) {
                    scope.$parent[item] = true;
                } else {
                    scope.$parent[item] = false;
                }
            });

            _.each([
                'is_em_open',
                'is_pm_open',
                'is_pfm_open',
                'is_dc_open'
            ], function (item) {
                if (item.indexOf(menu.split('_')[0]) !== -1) {
                    scope.$parent[item] = true;
                } else {
                    scope.$parent[item] = false;
                }
            });
        },
        getHttpRequestConfig: function (method, data, url) {
            var requestConfig = {};
            requestConfig.method = method;
            if (data) {
                if (method === 'get') {
                    url += '?';
                    for (var key in data) {
                        url += key + '=' + data[key] + '&';
                    }

                    url = url.substring(0, url.length - 1);


                } else if (method === 'post') {
                    requestConfig.data = data;
                }
            }

            requestConfig.url = url;

            return requestConfig;
        },

        submitWithFormData: function (data, url) {
            var defer = $q.defer();
            $http({
                url: url,
                data: data,
                method: 'post',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (result) {
                defer.resolve(result);
            })
                .error(function (error) {
                    defer.reject(error);
                });

            return defer.promise;
        },

        getObjectURL: function (file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        isPhone: function (text) {
            return /^1(3|4|5|7|8)\d{9}$/.test(text) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(text);
        },
        isEmail: function (text) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text);
        },
        isNumber: function (text) {
          return /^[1-9]+\.{0,1}[0-9]{0,2}$/.test(text);
        },
        dateFormat: function (d) {
            var date = new Date(d);
            var year = date.getFullYear() + '';
            var month = date.getMonth() + 1 + '';
            var day = date.getDate() + '';
            var hour = date.getHours() + '';
            var minute = date.getMinutes() + '';
            var second = date.getSeconds() + '';
            month = month.length == 1 ? '0' + month : month;
            day = day.length == 1 ? '0' + day : day;
            hour = hour.length == 1 ? '0' + hour : hour;
            minute = minute.length == 1 ? '0' + minute : minute;
            second = second.length == 1 ? '0' + second : second;
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        }
    }
}]);