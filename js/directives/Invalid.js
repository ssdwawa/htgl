aviationApp.directive('invalid', [function () {
    return {
        restrict: 'A',
        scope: {
            ngInvalid: '=',
            invalidMessage: '='
        },
        link: function (scope, elem, attrs) {
            scope.$watch('ngInvalid', function (newValue) {
                if (newValue) {
                    $(elem).css('border-color', '#dd514c');
                    $(elem).focus();
                    layer.tips(scope.invalidMessage, $(elem), {
                        tips: [2,'#dd514c'],
                        maxWidth: 200,
                        time: 99999999
                    });
                } else {
                    $(elem).css('border-color', '#ccc');
                    layer.close(layer.index);
                }
            });
        }
    };
}]);
