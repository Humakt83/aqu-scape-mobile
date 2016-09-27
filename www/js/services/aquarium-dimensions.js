angular.module('aqu-scape').factory('AquariumDimensions', [function() {

    var depth = 60; var width = 100;

    return {
        getWidth: function() {
            return width;
        },
        setWidth: function(w) {
            width = w;
        },
        getDepth: function() {
            return depth;
        },
        setDepth: function(d) {
            depth = d;
        }
    }

}]);
