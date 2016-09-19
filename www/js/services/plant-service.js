angular.module('aqu-scape').factory('PlantService', ['$resource', function($resource) {

    return $resource('http://localhost:8888/plants/lite');

}]);
