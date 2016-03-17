angular.module("myApp.controllers", [])
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
            $scope.currentItem=item;
        };
    });
