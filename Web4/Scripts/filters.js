'use strict';
angular.module('app.filters', [])
      .filter("unique", function () {
            return function (data, propertyName) {
                if (angular.isArray(data) && angular.isString(propertyName)) {
                    var results = [];
                    var keys = {};
                    for (var i = 0; i < data.length; i++) {
                        var val = data[i][propertyName];
                        if (angular.isUndefined(keys[val])) {
                            keys[val] = true;
                            results.push(val);
                        }
                    }
                    return results;
                } else {
                    return data;
                }
            }
    })
    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('sumUP', function () {
        return function (data, key) {
            if (angular.isUndefined(data) && angular.isUndefined(key))
                return 0;
            var sum = 0;
            angular.forEach(data, function (value) {
                sum = sum + (parseInt(value[key]));
            });
            return sum;
        }
     });