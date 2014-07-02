/*global buzz:false, moment, S */
angular.module('timer').controller('play', function ($scope, settings) {
    var requestId,
        soundEnabled = false,
        alarm = new buzz.sound('/sounds/alarm.mp3'),
        end;

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
        if (requestId) {
            window.cancelAnimationFrame(requestId);
        }
        $scope.remainingTime = 'Stopped';
        $scope.silence();
    };

    function timer() {
        $scope.stop();
        end = moment($scope.settings.endTime);
        requestId = window.requestAnimationFrame(timerUpdate);
    }

    function timerUpdate() {
        $scope.$apply(function() {
            if (end.isBefore()) {
                $scope.remainingTime = 'Finished!';
                $scope.settings.endTime = null;
                requestId = null;
                if (soundEnabled && settings.sound) {
                    alarm.play();
                }
            }
            else {
                var remaining = moment.duration(end.diff(moment()));
                $scope.remainingTime =
                    S(Math.floor(remaining.as('minutes'))).padLeft(2, '0').s +
                    ':' + S(remaining.get('seconds')).padLeft(2, '0').s +
                    ':' + S(remaining.get('milliseconds')).padLeft(3, '0').s;
                requestId = window.requestAnimationFrame(timerUpdate);
            }
        });
    }

    if ($scope.settings.endTime) {
        timer();
    }
    else {
        $scope.remainingTime = 'Stopped';
    }
});
