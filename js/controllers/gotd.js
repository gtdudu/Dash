myApp.controller("gotdCtrl", ['$scope', 'gotdFactory',
  function($scope, gotdFactory) {

    $scope.gotd = {};
    $scope.mainGoal = null;

    $scope.init = function() {
      gotdFactory.find().then(function() {
        $scope.mainGoal = gotdFactory.data;
      });
    }

    $scope.toggleCompleted = function(gotd) {
      gotdFactory.sync().then(function(){
       $scope.mainGoal = gotdFactory.data;
      });;
    }

    $scope.remove = function(gotd) {
      gotdFactory.remove(gotd).then(function(){
        $scope.mainGoal = gotdFactory.data;
      });;
    }

    $scope.addGoal = function() {
      if ($scope.gotd.content) {
        gotdFactory.add($scope.gotd.content).then(function(){
          $scope.mainGoal = gotdFactory.data;
          $scope.gotd.content = "";
        });;
      }
    }
  }
]);
