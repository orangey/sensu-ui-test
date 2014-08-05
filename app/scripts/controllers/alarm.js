sensuApp.controller('AlarmCtrl', [ '$scope', '$http', 'sensuData', function($scope, $http, sensuData) {

    $scope.predicate = 'client';
    $scope.reverse = false;


    var refreshAlarms = function(refresh) {
        sensuData
            .asyncGetAlarms(refresh)
            .then(function(data) {
                $scope.alarmList = data;

        });
    };

    $scope.getAlarms = refreshAlarms();


    $scope.mapStatus = function (statusNumber) {
        var status = '';
        switch(statusNumber) {
            case undefined:
                break;
            case 0:
                status = "OK";
                break;
            case 1:
                status = "Warning";
                break;
            case 2:
                status = "Critical";
                break;
            default:
                status = "Checks Failing";
                break;
        }
        if (status) {
            status = status + " (" + statusNumber + ")";
        }
        return status;
    };

  }]);


