angular.module('timer').controller('play', function ($scope, $localStorage) {
    $scope.settings = $localStorage;

    $scope.range = function(n) {
        return new Array(n);
    };
});