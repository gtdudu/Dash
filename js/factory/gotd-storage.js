myApp.factory('gotdFactory', function($q) {

  var _gotdFactory = {
    data: []
  };

  _gotdFactory.sync = function() {
    var deferred = $q.defer();
      chrome.storage.sync.set({gotd: JSON.stringify(this.data)}, function() {
          if (chrome.runtime.lastError) {
            deferred.reject('chrome.runtime error')
          } else {
            deferred.resolve('Successfully synced your main goal with chrome storage')
          }
      });
      return deferred.promise;
  }

  _gotdFactory.toggleComplete = function(gotd) {
    let save = gotd;
    gotd.completed = !gotd.completed;
    this.data.splice(this.data.indexOf(gotd), 1);
    this.data.push(save);
    return this.sync();
  }

  _gotdFactory.find = function() {
    var deferred = $q.defer();

      chrome.storage.sync.get('gotd', function(obj) {
        if (chrome.runtime.lastError) {
          deferred.reject('chrome.runtime error');
        }
        if (obj.gotd != null) {
            _gotdFactory.data = JSON.parse(obj.gotd);
            deferred.resolve('Successfully restored your main goal from chrome storage');
        }
    });

    return deferred.promise;
  };

  _gotdFactory.add = function(newContent) {
    let gotd = {
        content: newContent,
        completed: false,
        createdAt: new Date()
    };
    this.data = [];
    this.data.push(gotd);
    return this.sync();
  };

  _gotdFactory.remove = function(gotd) {
    this.data = [];
    return this.sync();
  };

  return _gotdFactory;
});
