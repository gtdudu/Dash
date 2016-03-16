myApp.controller("gotdCtrl", ['$scope', 'gotdFactory',
  function($scope, gotdFactory) {

    $scope.gotd = {};
    $scope.mainGoal = null;

    $scope.init = function() {
      gotdFactory.find().then(function() {
        $scope.mainGoal = gotdFactory.data[0];
      });
    }

    $scope.toggleCompleted = function(gotd) {
      gotdFactory.toggleComplete(gotd).then(function(){
       $scope.mainGoal = gotdFactory.data[0];
      });;
    }

    $scope.remove = function(gotd) {
      gotdFactory.remove(gotd).then(function(){
        $scope.mainGoal = gotdFactory.data[0];
      });;
    }

    $scope.addGoal = function() {
      if ($scope.gotd.content) {
        gotdFactory.add($scope.gotd.content).then(function(){
          $scope.mainGoal = gotdFactory.data[0];
          $scope.gotd.content = "";
        });;
      }
    }
  }
]);
