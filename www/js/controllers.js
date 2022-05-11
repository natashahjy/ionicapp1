angular.module('starter.controllers', ['ngStorage'])

.controller('eventSearchCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {

    $scope.countries = ["Hong Kong", "Tokyo", "Paris"];
    $scope.selected = $scope.countries[1];
}])
   
.controller('scheduleCtrl', ['$scope', '$stateParams', 'eventService', 'favService', 
function ($scope, $stateParams, eventService, favService) {

    // Obtain country parameter from RouteProvider
    var country = $stateParams.country;
    
    $scope.refresh = function() {
        $scope.event = []; // empty array
    
    eventService.getByCountry(country).then(function(result) {
        //$scope.event = result;
            for (var i = 0; i < result.length; i++) {
                var event = {}; 
                // JS object
                event.id = result[i].id;
                event.name = result[i].name;
                event.time = result[i].time;
                event.img = result[i].img;
                event.favIcon = favService.isFav(result[i].id) ?
                            "ion-ios-heart" :
                            "ion-ios-heart-outline";
                $scope.events.push(event);
            }
        });
    }
    
    $scope.$on('$ionicView.enter', function(e) {
        $scope.refresh();
    });
                             
    $scope.toggleFav = function(event){
        if(!favService.isFav(event.id)) {
            //Add to fav
            favService.add(event.id);
            event.favIcon = "ion-ios-heart";
        }
        else {
            //Remove from fav
            favService.delete(event);
            event.favIcon = "ion-ios-heart-outline";
        }
    }
}])
 
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, favService, eventService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $scope.refresh = function() {
        var ids = favService.all(); // Retrieves an array of event ids
        $scope.favs = []; // JS array
        for (var i = 0; i < ids.length; i++) { 
            // Async task to retrieve each event by id
            eventService.get(ids[i]).then(function(event) {
                $scope.favs.push(event); // Add to array
            });
        }
    }
    
    $scope.$on('$ionicView.enter', function(e){
        $scope.refresh();
    });
    
    $scope.remove = function(event) {
        favService.delete(event.id);
        var index = undefined;
        for (var i = 0; i < $scope.favs.length; i++) {
            if ($scope.favs[i] == event.id)
                index = i;
        }
        if (index != undefined)
            $scope.favs.splice(index, 1); 
        // Refresh list view
        $scope.refresh();  
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
