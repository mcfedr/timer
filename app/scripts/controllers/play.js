/*global buzz:false, moment, S */
angular.module('timer').controller('play', function ($scope, settings, $timeout) {
    var timerTimeout,
        soundEnabled = false,
        alarm = new buzz.sound('/sounds/alarm.mp3');

    $scope.settings = settings;

    $scope.range = function(n) {
        return new Array(n);
    };

    $scope.next = function() {
        $scope.start(($scope.settings.currentPlayer + 1) % $scope.settings.players);
    };

    $scope.start = function(player) {
        $scope.settings.currentPlayer = player;
        $scope.settings.endTime = moment().add('minutes', $scope.settings.length);
        soundEnabled = true;
        timer();
    };

    $scope.silence = function() {
        alarm.stop();
    };

    $scope.stop = function() {
        if (timerTimeout) {
            $timeout.cancel(timerTimeout);
        }
        $scope.remainingTime = 'Stopped';
        $scope.silence();
    };

    function timer() {
        $scope.stop();
        timerTimeout = $timeout(timerUpdate, 10);
    }

    function timerUpdate() {
        var end = moment($scope.settings.endTime);
        if (end.isBefore()) {
            $scope.remainingTime = 'Finished!';
            $scope.settings.endTime = null;
            timerTimeout = null;
            if (soundEnabled && settings.sound) {
                alarm.play();
            }
        }
        else {
            $scope.remainingTime =
                S(Math.floor(moment.duration(end.diff(moment())).as('minutes'))).padLeft(2, '0').s +
                ':' + S(moment.duration(end.diff(moment())).get('seconds')).padLeft(2, '0').s +
                ':' + S(moment.duration(end.diff(moment())).get('milliseconds')).padLeft(3, '0').s;
            timerTimeout = $timeout(timerUpdate, 10);
        }
    }

    if ($scope.settings.endTime) {
        timer();
    }
    else {
        $scope.remainingTime = 'Stopped';
    }
});
