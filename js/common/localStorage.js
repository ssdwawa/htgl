aviationApp.factory('$localStorage', [function () {
    var localStorage = window.localStorage;
    return {
        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear: function () {
            localStorage.clear();
        }
    }
}]);