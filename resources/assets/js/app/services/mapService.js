app.factory('mapService', function($http, $q) {
    return {
        getMapData: function() {
            var path = '/get-coordinate';
            return getHttp(path);
        },
        getOnSaleFlats: function (section) {
            var path = '/get-onsale-flats/' + section;
            return getHttp(path);
        },
        getSection: function (building, section) {
            var path = '/get-flats-section/' + building + '/' + section;
            return getHttp(path);
        },
        getFloorFlats: function (section, floor) {
            var path = '/get-floor-flats/' + section + '/' + floor;
            return getHttp(path);
        },
        getRoomNumber: function (building,section, floor, room) {
            var path = '/get-room-number/' + building + '/' + section + '/' + floor + '/' + room;
            return getHttp(path);
        },
        getSalesFlats: function(building, section, floor) {
            var path = '/get-sales-flats/' + building + '/' + section + '/' + floor;
            return getHttp(path);
        },
        getAllRooms: function(building, section, floor) {
            var path = '/get-all-rooms/' + building + '/' + section + '/' + floor;
            return getHttp(path);
        }
    };
    function getHttp(path){
        var defer = $q.defer();
        $http.get(path)
            .success(function(data) {
                defer.resolve(data);
            })
            .error(function(error) {
                defer.reject(error);
            });
        return defer.promise;
    }
});