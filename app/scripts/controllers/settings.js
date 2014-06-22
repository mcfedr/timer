angular.module('timer').controller('settings', function ($scope, settings) {
    $scope.settings = settings;

    $scope.range = function(n) {
        return new Array(n);
    };
});
