myApp.factory('storageFactory', function($q) {

  var _storageFactory = {
    data: []
  };

  _storageFactory.sync = function() {
    chrome.storage.sync.set({todos: this.data}, function() {
        console.log('Successfully synced your todos with chrome storage');
    });
  }

  _storageFactory.findAll = function() {
    return chrome.storage.sync.get('todos', function(obj) {
        if (chrome.runtime.lastError) {
          console.log("Ooops, something went wrong!");
        }
        if (obj.todos != null) {
            _storageFactory.data = obj.todos;
        }
    });
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
    this.sync();
  };

  _storageFactory.remove = function(todo) {
    this.data.splice(this.data.indexOf(todo), 1);
    this.sync();
  };

  _storageFactory.removeAll = function(post) {
    this.data = [];
    this.sync();
  };

  return _storageFactory;
});
