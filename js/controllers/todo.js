myApp.controller("todoCtrl", ['$scope', 'todoFactory',
  function($scope, todoFactory) {

    $scope.open = false;
    $scope.formData = {};
    $scope.todoList = [];
    $scope.over = 0;

    $scope.init = function() {
      todoFactory.findAll().then(function() {
        $scope.todoList = todoFactory.data;
        $scope.over = updateCompleted()
      });
    };

    $scope.toggle = function() {
      $scope.open = !$scope.open;
    };

    $scope.toggleCompleted = function(todo) {
      todoFactory.toggleCompleted(todo).then(function(){
        $scope.todoList = todoFactory.data;
        $scope.over = updateCompleted()

      })
      // todoFactory.sync().then(function(){
      // });;
    };

    $scope.remove = function(todo) {
      todoFactory.remove(todo).then(function(){
        $scope.todoList = todoFactory.data;
        $scope.over = updateCompleted()
      });;
    };

    $scope.removeAll = function(todo) {
      todoFactory.removeAll().then(function(){
        $scope.todoList = todoFactory.data;
        $scope.over = updateCompleted()
      });
    };

    $scope.addTodo = function() {
      if ($scope.formData.title) {
        todoFactory.add($scope.formData.title).then(function(){
          $scope.todoList = todoFactory.data;
          $scope.formData.title = "";
        });;
      }
    };

    function updateCompleted() {
      let over = 0;
      for (var i = 0; i < $scope.todoList.length; i++) {
        if ($scope.todoList[i].completed == true)
          over++;
      }
      return over;
    }
  }
]);
