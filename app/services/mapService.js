app.factory('mapService', function($http, $q) {
    return {
        getMapData: function() {
            var defer = $q.defer();

            $http.get('views/map/test_bd.json')
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(error) {
                    defer.reject(error);
                });
            return defer.promise;
        }
    }
});