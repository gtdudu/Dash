myApp.controller("clockCtrl", ['$scope', '$timeout',
  function($scope, $timeout) {

    $scope.time = '';
    $scope.setClock = function() {

      var today = new Date();
      var h = today.getHours();
      var m = checkTime(today.getMinutes());
      // var s = checkTime(today.getSeconds());
      // + ":" + s;

      $scope.time = h + ":" + m
      $timeout(function () {
            $scope.setClock()
        }, 500);

    }

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
  }
]);
