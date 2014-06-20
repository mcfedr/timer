angular.module('timer').controller('settings', function ($scope, $localStorage) {
    $scope.settings = $localStorage.$default({
        length: 3,
        players: 6,
        names: []
    });

    $scope.range = function(n) {
        return new Array(n);
    };
});
