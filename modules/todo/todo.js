myApp.controller("todoCtrl", ['$scope', 'storageFactory',
  function($scope, storageFactory) {

    $scope.open = false;
    $scope.formData = {};
    $scope.todoList = [];

    $scope.init = function() {
      storageFactory.findAll().then(function() {
        $scope.todoList = storageFactory.data;
      });
    }

    $scope.toggle = function() {
      $scope.open = !$scope.open;
    }

    $scope.toggleCompleted = function(todo) {
      storageFactory.sync().then(function(){
        $scope.todoList = storageFactory.data;
      });;
    }

    $scope.remove = function(todo) {
      storageFactory.remove(todo).then(function(){
        $scope.todoList = storageFactory.data;
      });;
    }

    $scope.removeAll = function(todo) {
      storageFactory.removeAll().then(function(){
        $scope.todoList = storageFactory.data;
      });
    }

    $scope.addTodo = function() {
      if ($scope.formData.title) {
        storageFactory.add($scope.formData.title).then(function(){
          $scope.todoList = storageFactory.data;
          $scope.formData.title = "";
        });;
      }
    }
  }
]);
