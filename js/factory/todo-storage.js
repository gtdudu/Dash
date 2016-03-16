myApp.factory('todoFactory', function($q) {

  var _todoFactory = {
    data: []
  };

  _todoFactory.sync = function() {
      var deferred = $q.defer();
      chrome.storage.sync.set({todos: JSON.stringify(this.data)}, function() {
          if (chrome.runtime.lastError) {
            deferred.reject('chrome.runtime error')
          } else {
            deferred.resolve('Successfully synced your todos with chrome storage')
          }
      });
      return deferred.promise;
  }

  _todoFactory.toggleCompleted = function(todo){
    let save = todo;
    todo.completed = !todo.completed;
    this.data.splice(this.data.indexOf(todo), 1);
    this.data.push(save);
    return this.sync();
  }

  _todoFactory.findAll = function() {
    var deferred = $q.defer();

      chrome.storage.sync.get('todos', function(obj) {
        if (chrome.runtime.lastError) {
          deferred.reject('chrome.runtime error')
        }
        if (obj.todos != null) {
            _todoFactory.data = JSON.parse(obj.todos);
            deferred.resolve('Successfully synced your todos with chrome storage')
        }
    });

    return deferred.promise;
  };

  _todoFactory.add = function(newContent) {
    let id = this.data.length + 1;
    let todo = {
        id: id,
        content: newContent,
        completed: false,
        createdAt: new Date()
    };
    this.data.push(todo);
    return this.sync();
  };

  _todoFactory.remove = function(todo) {
    this.data.splice(this.data.indexOf(todo), 1);
    return this.sync();
  };

  _todoFactory.removeAll = function(post) {
    this.data = [];
    return this.sync();
  };

  return _todoFactory;
});
