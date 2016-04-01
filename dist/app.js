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
        $scope.lastTitle="";
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
            if($scope.currentItem !== item){
                $scope.currentItem=item;
                $scope.lastTitle=$scope.currentItem.title;
            }
            else
                $scope.currentItem={};

        };
    });
;angular.module("myApp.directives", []);
;angular.module("myApp.filters", []);
;angular.module("myApp.services", []);;angular.module('templates-dist', ['../app/templates/form.html', '../app/templates/list.html']);

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
    "			<h3 ng-show=\"currentItem.title\" class=\"current-item-title\">{{lastTitle}}</h3>\n" +
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
    "				<h5>{{item.title}}</h5>\n" +
    "				<p>{{item.content}}</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</li>\n" +
    "</ul>");
}]);
