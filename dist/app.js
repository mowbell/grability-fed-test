angular.module("myApp", [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
]);;angular.module("myApp.controllers", []).controller("songCtrl", function($scope, songService) {
    // Write your code here

    /*$scope.songs = [ ];
    $scope.songs = [{
        artist: "Nightwish",
        title: "Ghost Loves Score"
    }, {
        artist: "Evanescence",
        title: "Everybody's Fool"
    }, {
        artist: "Within Temptation",
        title: "Ice Queen"
    }];*/
    $scope.songs = songService.get();
    $scope.newSong = {};
    $scope.addSong = function( /** String */ artist, /** String */ title) {
        $scope.songs.push({
            artist: artist,
            title: title,
            score: 0
        });
        $scope.newSong.title = "";
        $scope.newSong.artist = "";
    };
    $scope.isEmpty = function( /** String */ str) {
        return _.isBlank(str);
    };

    $scope.$watch('songs', function(newValue, oldValue) {
        // Write your code here
        if (newValue !== oldValue) {
            songService.put($scope.songs);
        }
    }, true);

    $scope.deleteSong = function( /** Song */ song) {
        var idx = $scope.songs.indexOf(song);
        if (idx >= 0) {
            $scope.songs.splice(idx, 1);
        }
    };
});

_.mixin(_.string.exports());
;angular.module("myApp.directives", []).directive("rating", function() {
    // Write code here
    var directive = {};
    directive.restrict = 'AE';

    directive.scope = {
        score: '=score',
        max: '=max'
    };

    directive.templateUrl = "app/templates/rating.html";
    directive.link = function(scope, elements, attr) {

        scope.updateStars = function() {
            var idx = 0;
            scope.stars = [];
            for (idx = 0; idx < scope.max; idx += 1) {
                scope.stars.push({
                    full: scope.score > idx
                });
            }
        };

        scope.starClass = function(star, idx) {
            var starClass = 'fa-star-o';
            if (star.full || idx <= scope.hoverIdx) {
                starClass = 'fa-star';
            }
            return starClass;
        };


        scope.$watch('score', function(newValue, oldValue) {
            if (newValue !== null && newValue !== undefined) {
                scope.updateStars();
            }
        });

        scope.setRating = function(idx) {
            scope.score = idx + 1;
            scope.stopHover();
        };

        scope.hover = function(idx) {
            scope.hoverIdx = idx;
        };

        scope.stopHover = function() {
            scope.hoverIdx = -1;
        };

        scope.starColor = function(idx) {
            var starClass = 'rating-normal';
            if (idx <= scope.hoverIdx) {
                starClass = 'rating-highlight';
            }
            return starClass;
        };

    };
    return directive;
});
;angular.module("myApp.filters", [])
    .filter("titleize", function() {
        // Write code here
        return function(input) {
            return _.titleize(input);
        };
    });
;angular.module("myApp.services", []).factory("songService", function() {
    // Write code here

    var STORAGE_ID = 'myApp.songs',
        factory = {};

    factory.get = function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    };

    factory.put = function(songs) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(songs));
    };

    return factory;
});
;angular.module('templates-dist', ['../app/templates/rating.html']);

angular.module("../app/templates/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/templates/rating.html",
    "<div class=\"rating\">\n" +
    "  <a ng-repeat=\"star in stars\" ng-click=\"setRating($index)\" ng-mouseover=\"hover($index)\" ng-mouseleave=\"stopHover()\" ng-class=\"starColor($index)\">\n" +
    "    <i class=\"fa\" ng-class=\"starClass(star, $index)\"></i>\n" +
    "  </a>\n" +
    "</div>");
}]);
