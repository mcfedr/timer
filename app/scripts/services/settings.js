angular.module('timer').factory('settings', function ($localStorage) {
    return $localStorage.$default({
        length: 3,
        players: 6,
        names: [],
        currentPlayer: 0,
        sound: true
    });
});
