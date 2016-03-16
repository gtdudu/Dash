myApp.factory('todoFactory', function($q) {

  var _todoFactory = {
    data: []
  };

  // chrome.storage.onChanged.addListener(function(changes, namespace) {
  //   for (key in changes) {
  //     var storageChange = changes[key];
  //     console.log('Storage key "%s" in namespace "%s" changed. ' +
  //                 'Old value was "%s", new value is "%s".',
  //                 key,
  //                 namespace,
  //                 storageChange.oldValue,
  //                 storageChange.newValue);
  //   }
  // });
  //

  _todoFactory.sync = function() {
      var deferred = $q.defer();
      // should try to stringify object, maybe that will fix the completed updated that's not properly working for now
      chrome.storage.sync.set({todos: this.data}, function() {
          if (chrome.runtime.lastError) {
            deferred.reject('chrome.runtime error')
          } else {
            deferred.resolve('Successfully synced your todos with chrome storage')
          }
      });

      return deferred.promise;
  }

  _todoFactory.findAll = function() {
    var deferred = $q.defer();

      chrome.storage.sync.get('todos', function(obj) {
        if (chrome.runtime.lastError) {
          deferred.reject('chrome.runtime error')
        }
        if (obj.todos != null) {
            _todoFactory.data = obj.todos;
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
