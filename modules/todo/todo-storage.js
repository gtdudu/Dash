myApp.factory('storageFactory', function($q) {

  var _storageFactory = {
    data: []
  };

  //
  // var promise = asyncGreet('Robin Hood');
  // promise.then(function(greeting) {
  //   alert('Success: ' + greeting);
  // }, function(reason) {
  //   alert('Failed: ' + reason);
  // }, function(update) {
  //   alert('Got notification: ' + update);
  // });


  _storageFactory.sync = function() {
      var deferred = $q.defer();

      chrome.storage.sync.set({todos: this.data}, function() {
          if (chrome.runtime.lastError) {
            deferred.reject('chrome.runtime error')
          } else {
            deferred.resolve('Successfully synced your todos with chrome storage')
          }
      });

      return deferred.promise;
  }

  _storageFactory.findAll = function() {
    var deferred = $q.defer();

      chrome.storage.sync.get('todos', function(obj) {
        if (chrome.runtime.lastError) {
          deferred.reject('chrome.runtime error')
        }
        if (obj.todos != null) {
            _storageFactory.data = obj.todos;
            deferred.resolve('Successfully synced your todos with chrome storage')
        }
    });

    return deferred.promise;
  };

  _storageFactory.add = function(newContent) {
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

  _storageFactory.remove = function(todo) {
    this.data.splice(this.data.indexOf(todo), 1);
    return this.sync();
  };

  _storageFactory.removeAll = function(post) {
    this.data = [];
    return this.sync();
  };

  return _storageFactory;
});
