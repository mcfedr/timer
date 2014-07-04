/*global buzz:false, moment, S */
angular.module('timer').controller('play', function ($scope, settings, $timeout) {
    var timeoutId,
        alarm = new buzz.sound('/sounds/alarm.mp3'),
        reload = new buzz.sound('/sounds/reload.mp3'),
        end,
        soundEnabled;

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
        if (!soundEnabled) {
            soundEnabled = true;
            alarm.play();
            alarm.pause();
        }
        reload.play();
        timer();
    };

    $scope.silence = function() {
        alarm.stop();
    };

    $scope.stop = function() {
        if (timeoutId) {
            $timeout.cancel(timeoutId);
        }
        $scope.remainingTime = 'Stopped';
        $scope.silence();
    };

    function timer() {
        $scope.stop();
        end = moment($scope.settings.endTime);
        timeoutId = $timeout(timerUpdate, 1000);
    }

    function timerUpdate() {
        $scope.$apply(function() {
            if (end.isBefore()) {
                $scope.remainingTime = 'Finished!';
                $scope.settings.endTime = null;
                timeoutId = null;
                if (soundEnabled && settings.sound) {
                    alarm.play();
                }
            }
            else {
                var remaining = moment.duration(end.diff(moment()));
                $scope.remainingTime =
                    S(Math.floor(remaining.as('minutes'))).padLeft(2, '0').s +
                    ':' + S(remaining.get('seconds')).padLeft(2, '0').s;
                timeoutId = $timeout(timerUpdate, 1000);
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
