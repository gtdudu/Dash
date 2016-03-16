myApp.controller("todoCtrl", ['$scope', 'todoFactory',
  function($scope, todoFactory) {

    $scope.open = false;
    $scope.formData = {};
    $scope.todoList = [];

    $scope.init = function() {
      todoFactory.findAll().then(function() {
        $scope.todoList = todoFactory.data;
      });
    }

    $scope.toggle = function() {
      $scope.open = !$scope.open;
    }

    $scope.toggleCompleted = function(todo) {
      todoFactory.toggleCompleted(todo).then(function(){
        $scope.todoList = todoFactory.data;

      })
      // todoFactory.sync().then(function(){
      // });;
    }

    $scope.remove = function(todo) {
      todoFactory.remove(todo).then(function(){
        $scope.todoList = todoFactory.data;
      });;
    }

    $scope.removeAll = function(todo) {
      todoFactory.removeAll().then(function(){
        $scope.todoList = todoFactory.data;
      });
    }

    $scope.addTodo = function() {
      if ($scope.formData.title) {
        todoFactory.add($scope.formData.title).then(function(){
          $scope.todoList = todoFactory.data;
          $scope.formData.title = "";
        });;
      }
    }
  }
]);
