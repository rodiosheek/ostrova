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
        getOnSaleFlats: function () {
            var defer = $q.defer();

            $http.get('/get-onsale-flats')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        },
        getSection_1: function () {
            var defer = $q.defer();

            $http.get('/get-flats-section-1')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        },
        getSection_2: function () {
            var defer = $q.defer();

            $http.get('/get-flats-section-2')
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
        getRoomNumber: function (section, floor, room) {
            var defer = $q.defer();
            var path = '/get-room-number/' + section + '/' + floor + '/' + room;
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