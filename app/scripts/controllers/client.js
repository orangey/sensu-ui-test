/**
 * Created by matwilliamson on 03/08/2014.
 */

sensuApp.controller('ClientCtrl', [ '$scope', '$http', function($scope, $http) {

    $scope.predicate = 'name';
    $scope.reverse=false;

    var handleHttpError = function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(headers);
      console.log(config);
    };


    var mapStatus = function (statusNumber) {
      var status = '';
      switch(statusNumber) {
        case undefined:
          break;
        case 0:
          status = "OK"
          break;
        case 1:
          status = "Warning"
          break;
        case 2:
          status = "Critical"
          break;

        default:
          status = "Checks Failing"
          break;
      }
      if (status) {
        status = status + " (" + statusNumber + ")";
      }
      return status;
    };
    $scope.mapStatus = mapStatus;


    var updateClientStatus = function (client) {
      var maxStatus = 0;
      for (var i = 0; i < client.checks.length; i++) {
        if (client.checks[i].last_status > maxStatus) {
          maxStatus = client.checks[i].last_status;
        }
      }
      client.checkMaxStatus = maxStatus;
      //+ ': ' + mapStatus(maxStatus);

      client.isOK = false;
      client.isWarning = false;
      client.isCritical = false;
      client.isUnknown = false;
      switch (maxStatus) {
        case 0:
          client.isOK = true
          break;
        case 1:
          client.isWarning = true
          break;
        case 2:
          client.isCritical = true
          break;
        default:
          client.isUnknown = true
          break;
      }
    };

    //
    // get history for each client
    var updateClientHistory = function (client) {
      console.log("update for " + client.name);
      var historyUrl = 'http://c068amw.int.thomsonreuters.com:4567/clients/' + client.name + '/history';
      $http.get(historyUrl)
        .success(function(data) {
          client.checks = data;
          updateClientStatus(client);
        })
        .error(handleHttpError);
    };
    $scope.updateClientHistory = updateClientHistory;


    //
    // get list of clients
    $http.get('http://c068amw.int.thomsonreuters.com:4567/clients').
      success(function(data, status) {
        $scope.clientList = data;
        for (var i=0; i < $scope.clientList.length; i++) {
          updateClientHistory($scope.clientList[i]);
        }
      }).
      error(handleHttpError);

  }]);