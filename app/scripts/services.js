'use strict'

sensuApp.factory('sensuData', ['$http', function($http) {

    var promiseAlarm;
    var handleHttpError = function (data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    };

    console.log("getting alert data");
    return {
        asyncGetAlarms: function(refresh) {
            if (!promiseAlarm || refresh) {
                promiseAlarm = $http.get('http://c068amw.int.thomsonreuters.com:4567/events')
                    .error(handleHttpError)
                    .then(function (response) {
                        return response.data;
                    });
            }
            return promiseAlarm;
        }
    };

}]);