angular.module("myApp.controllers", []).controller("songCtrl", function($scope, songService) {
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

_.mixin(s.exports()); //Lo-Dash integration https://github.com/epeli/underscore.string
