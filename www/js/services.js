angular.module('starter.services', ['ngStorage'])

/**************************
Favourite Service
**************************/
.factory('favService', ['$localStorage',
function($localStorage) { 
    // Favourites linked to local storage
    $storage = $localStorage.$default({
        favourites: []
    });
    
 return {
    all: function () {
        return $storage.favourites;
    },
     
    isFav: function (id) {
        for (var i = 0; i < $storage.favourites.length; i++) {
            if ($storage.favourites[i] == id) {
                return true;
            }
        }
        return false;
    },
     
    add: function (id) {
        if (!this.isFav(id)) { // Not already in fav
            $storage.favourites.push(id); // Save into local storage
        }
    },
     
    delete: function (id) {
        var index = undefined;
        for (var i = 0; i < $storage.favourites.length; i++) {
            if ($storage.favourites[i] == id)
                index = i;
        }
        if (index != undefined)
            $storage.favourites.splice(index, 1);
    },
 }
}])   

/**********************
Event Service
***********************/
.factory('eventService',['$http', 
         function($http) {
            var eventArray = [];
         
            return {
         
            get: function(id){
                eventArray = [];
                return $http.get('events.json').then(function (response) {
                    eventArray = response.data;
                    for (var i = 0; i < eventArray.lenth; i++){
                        if(eventArray[i].id == id){
                            return eventArray[i]
                        }
                    }
                    return null;
                });
            },
                
            getByCountry: function(country) {
                return $http.get('events.json').then(function (response) {
                    eventArray = response.data;
                    var result = [];
                    for(var i = 0; i < eventArray.length; i++) {
                        if(eventArray[i].country == country) {
                            result.push(eventArray[i]);
                        }
                    }
                    return result;
                });
            },
                
            }
        }])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});