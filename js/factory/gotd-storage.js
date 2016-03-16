myApp.factory('gotdFactory', function($q) {

  var _gotdFactory = {
    data: null
  };

  _gotdFactory.sync = function() {
      var deferred = $q.defer();
      // should try to stringify object, maybe that will fix the completed updated that's not properly working for now
      chrome.storage.sync.set({gotd: this.data}, function() {
          if (chrome.runtime.lastError) {
            deferred.reject('chrome.runtime error')
          } else {
            deferred.resolve('Successfully synced your main goal with chrome storage')
          }
      });

      return deferred.promise;
  }

  _gotdFactory.find = function() {
    var deferred = $q.defer();

      chrome.storage.sync.get('gotd', function(obj) {
        if (chrome.runtime.lastError) {
          deferred.reject('chrome.runtime error')
        }
        if (obj.gotd != null) {
            _gotdFactory.data = obj.gotd;
            deferred.resolve('Successfully restored your main goal from chrome storage')
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
    this.data = gotd;
    return this.sync();
  };

  _gotdFactory.remove = function(gotd) {
    this.data = null;
    return this.sync();
  };

  return _gotdFactory;
});
