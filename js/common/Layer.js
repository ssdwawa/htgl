aviationApp.factory('$layer', [function () {
    return {
        open: function (options) {
            layer.open(_.extend({},{
                type: 1,
                shadeClose: false
            }, options.layerOption));

            if(options.type === 'form'){
                var layerForm = $('.layui-layer').find('form');

                var formControls = layerForm.find('.form-data');

                if(options.formData){
                    for(var key in options.formData){
                        _.each(formControls, function (control) {
                            var $_control = $(control);
                            if($_control.attr('name') === key){
                                $_control.val(options.formData[key])
                            }
                        });
                    }
                }

                layerForm.find('#submit').bind('click', function () {
                    var formData = {};
                    _.each(formControls, function (control) {
                        var $_control = $(control);
                        formData[$_control.attr('name')] = $_control.val();
                    });
                    options.layerOk(formData);
                });

                layerForm.find('#cancel').bind('click', function () {
                    layer.close(layer.index);
                });
            }

            return layer.index;
        },
        close: function (index) {
            if(index){
                layer.close(index);
            } else {
                layer.close(layer.index);
            }
        }
    }
}]);