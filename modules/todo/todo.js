myApp.controller("todoCtrl", ['$scope', 'storageFactory',
  function($scope, storageFactory) {

    $scope.open = false;
    $scope.formData = {};
    $scope.storageFactory = storageFactory;

    $scope.init = function() {
      storageFactory.findAll();
    }

    $scope.toggle = function() {
      $scope.open = !$scope.open;
    }

    $scope.toggleCompleted = function(todo) {
      storageFactory.sync();
    }

    $scope.remove = function(todo) {
      storageFactory.remove(todo)
    }

    $scope.removeAll = function(todo) {
      storageFactory.removeAll()
    }

    $scope.addTodo = function() {
      if ($scope.formData.title) {
        storageFactory.add($scope.formData.title);
        $scope.formData.title = "";
        console.log(storageFactory);
      }
    }
  }
]);
