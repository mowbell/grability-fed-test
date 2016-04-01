angular.module("myApp", [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngAnimate'
]);;angular.module("myApp.controllers", [])
    .controller("listCtrl", function($scope, $http, $timeout) {
        $scope.news=[];
        $scope.currentItem={};
        var _refreshList=function(){
            $scope.news=[];
            $scope.currentItem={};
            $http.get('news_mock.json').success(function(response) {
                $timeout(function(){
                    $scope.news= response;    
                }, 500);
            }).error(function(error) { console.log(error); });    
        };
        _refreshList();

        $scope.refreshList=_refreshList;
        $scope.itemClick=function(item){
            if($scope.currentItem !== item)
                $scope.currentItem=item;
            else
                $scope.currentItem={};
        };
    });
;angular.module("myApp.directives", []);
/*.directive("rating", function() {
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
*/;angular.module("myApp.filters", []);
/*    .filter("titleize", function() {
        // Write code here
        return function(input) {
            return _.titleize(input);
        };
    });
*/;angular.module("myApp.services", []);
/*.factory("songService", function() {
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
*/;angular.module('templates-dist', ['../app/templates/form.html', '../app/templates/list.html', '../app/templates/rating.html']);

angular.module("../app/templates/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/templates/form.html",
    "<form role=\"form\" ng-submit=\"addSong(newSong.artist, newSong.title)\">\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-sm-5\">\n" +
    "			<label class=\"sr-only\" for=\"artist\">Artist</label>\n" +
    "			<input type=\"text\" class=\"form-control\" name=\"artist\" placeholder=\"Name of the artist, band, ...\" ng-model=\"newSong.artist\" autofocus />\n" +
    "		</div>\n" +
    "		<div class=\"col-sm-5\">\n" +
    "			<label class=\"sr-only\" for=\"song\">Song</label>\n" +
    "			<input type=\"text\" class=\"form-control\" name=\"song\" placeholder=\"Enter the name of the song...\" ng-model=\"newSong.title\" />\n" +
    "		</div>\n" +
    "		<div class=\"col-sm-2\">\n" +
    "			<button type=\"submit\" class=\"btn btn-default form-control\" ng-disabled=\"isEmpty(newSong.title) || isEmpty(newSong.artist)\">Add</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</form>");
}]);

angular.module("../app/templates/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/templates/list.html",
    "<!--<nav class=\"navbar navbar-default\">\n" +
    "	\n" +
    "	<div class=\"navbar-header\">\n" +
    "		<a class=\"navbar-brand\" href=\"#\">\n" +
    "		<i class=\"fa fa-bars fa-6\"></i> </a>\n" +
    "	</div>\n" +
    "	<p class=\"navbar-text\">Signed in as Mark Otto</p>\n" +
    "</nav>\n" +
    "-->\n" +
    "<nav id=\"top-nav-bar\">\n" +
    "	\n" +
    "	\n" +
    "	<div class=\"row vertical-align\">\n" +
    "		<div class=\"col-xs-2\">\n" +
    "			<a id=\"main-btn\" href=\"#\" ng-click=\"refreshList()\">\n" +
    "				<i class=\"fa fa-bars\"></i>\n" +
    "			</a>\n" +
    "		</div>\n" +
    "		<div class=\"col-xs-10\">\n" +
    "			<h3>{{currentItem.title}}</h3>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</nav>\n" +
    "<ul id=\"news-list\" class=\"\">\n" +
    "	<li class=\"news-item\" ng-repeat=\"item in news\" ng-click=\"itemClick(item)\">\n" +
    "		<div class=\"row vertical-align news-item-row\">\n" +
    "			<div class=\"col-xs-2\">\n" +
    "				<div class=\"news-item-circle\"></div>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-10\"><h3 class=\"news-item-title\">{{item.title}}<h3></div>\n" +
    "		</div>\n" +
    "		<div class=\"row news-item-details\" ng-if=\"currentItem==item\">\n" +
    "			<div class=\"col-xs-5 news-item-image\" style=\"background-image:url({{item.image+'?hh='+$index}})\">\n" +
    "				<!--<img ng-src=\"{{item.image+'?hh='+$index}}\" class=\"img-responsive\" alt=\"Responsive image\">-->\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-7 news-item-content\">\n" +
    "				<h4>{{item.title}}</h4>\n" +
    "				<p>{{item.content}}</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</li>\n" +
    "</ul>");
}]);

angular.module("../app/templates/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/templates/rating.html",
    "<div class=\"rating\">\n" +
    "  <a ng-repeat=\"star in stars\" ng-click=\"setRating($index)\" ng-mouseover=\"hover($index)\" ng-mouseleave=\"stopHover()\" ng-class=\"starColor($index)\">\n" +
    "    <i class=\"fa\" ng-class=\"starClass(star, $index)\"></i>\n" +
    "  </a>\n" +
    "</div>");
}]);
