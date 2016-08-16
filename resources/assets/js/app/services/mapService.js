app.factory('mapService', function($http, $q) {
    return {
        getMapData: function() {
            var defer = $q.defer();

            $http.get('/get-coordinate')
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(error) {
                    defer.reject(error);
                });
            return defer.promise;
        },
        getOnSaleFlats: function (section) {
            var defer = $q.defer();
            var path = '/get-onsale-flats/' + section;
            $http.get(path)
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        },
        getSection: function (building, section) {
            var defer = $q.defer();
            var path = '/get-flats-section/' + building + '/' + section;
            $http.get(path)
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        },
        getFloorFlats: function (section, floor) {
            var defer = $q.defer();
            var path = '/get-floor-flats/' + section + '/' + floor;
            $http.get(path)
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        },
        getRoomNumber: function (building,section, floor, room) {
            var defer = $q.defer();
            var path = '/get-room-number/' + building + '/' + section + '/' + floor + '/' + room;
            $http.get(path)
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        }
    }
});