aviationApp.factory('platformService', ['$q', '$http', 'commonService', 'config',
    function ($q, $http, commonService, config) {
        var interface_pf = config.interface.PF;
        return {
            getManagerList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.getManagerList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            editManager: function (data, type) {
                var defer = $q.defer();
                var url = type === 'add' ? interface_pf.addManager : interface_pf.editManager;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            changeStatus: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.changeStatus))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            resetManagerPwd: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.resetManagerPwd))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getDiplomaList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.getDiplomaList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            deleteDiploma: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.deleteDiploma))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            moveDiploma: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.moveDiploma))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            editDiploma: function (data, type) {
                var defer = $q.defer();
                var url = type === 'add' ? interface_pf.addDiploma : interface_pf.editDiploma;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getExperienceList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.getExperienceList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            deleteExperience: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.deleteExperience))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            moveExperience: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.moveExperience))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            editExperience: function (data, type) {
                var defer = $q.defer();
                var url = type === 'add' ? interface_pf.addExperience : interface_pf.editExperience;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getFieldList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.getFieldList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            deleteField: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.deleteField))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            moveField: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.moveField))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            editField: function (data, type) {
                var defer = $q.defer();
                var url = type === 'add' ? interface_pf.addField : interface_pf.editField;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getTagList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.getTagList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            deleteTag: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.deleteTag))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            moveTag: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.moveTag))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            editTag: function (data, type) {
                var defer = $q.defer();
                var url = type === 'add' ? interface_pf.addTag : interface_pf.editTag;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getPositionList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.getPositionList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            deletePosition: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.deletePosition))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            movePosition: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('post', data, interface_pf.movePosition))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            editPosition: function (data, type) {
                var defer = $q.defer();
                var url = type === 'add' ? interface_pf.addPosition : interface_pf.editPosition;
                $http(commonService.getHttpRequestConfig('post', data, url))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            provinceList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.provinceList))
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            },
            getCityList: function (data) {
                var defer = $q.defer();
                $http(commonService.getHttpRequestConfig('get', data, interface_pf.getCityList))
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