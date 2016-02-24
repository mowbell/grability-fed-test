describe("Song rate controller", function() {
            // This will contain all our test cases
            var scope, service;

            beforeEach(function() {

                // Create mock service
                service = jasmine.createSpyObj('songService', ['get', 'put']);

                // Mock Angular module
                angular.mock.module('myApp.controllers');

                // Create Song controller and inject mocks
                angular.mock.inject(function($rootScope, $controller) {

                    service.get.andReturn([{
                        id: 1,
                        artist: "Artist",
                        title: "Title",
                        score: 0
                    }]);

                    scope = $rootScope.$new();
                    $controller('songCtrl', {
                        $scope: scope,
                        songService: service
                    });
                });
            });



            it("retrieves songs on load", function() {
                expect(service.get).toHaveBeenCalled();
                expect(scope.songs.length).toEqual(1);
                expect(scope.songs[0].artist).toEqual("Artist");
                expect(scope.songs[0].title).toEqual("Title");
                expect(scope.songs[0].score).toEqual(0);
            });

            it('adds song to list', function() {
                scope.songs = [];
                scope.addSong('Artist 1', 'Title 1');
                expect(scope.songs.length).toEqual(1);
                expect(scope.songs[0].artist).toEqual("Artist 1");
                expect(scope.songs[0].title).toEqual("Title 1");
                expect(scope.songs[0].score).toEqual(0);
            });

            it('stores data while adding', function() {
                scope.songs = [];
                // Manually $apply to trigger $watch
                scope.$apply();
                scope.addSong('Artist 1', 'Title 1');

                // Manually $apply to trigger $watch (and get differences)
                scope.$apply();
                expect(service.put).toHaveBeenCalledWith(scope.songs);
            });
        }
