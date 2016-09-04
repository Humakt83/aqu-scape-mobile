angular.module('aqu-scape').controller('ToolsController', [ '$scope', '$ionicModal', 'plants', function($scope, $ionicModal, plants) {

    $ionicModal.fromTemplateUrl('dimensions.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal
    });

    $scope.leftArrow = function() {
        currentStartingIndex = Math.max(0, --currentStartingIndex);
        $scope.plantsToShow = $scope.plants.slice(currentStartingIndex, currentStartingIndex + numberOfPlantsShown);
    }

    $scope.rightArrow = function() {
        currentStartingIndex = Math.min(Math.max(0, $scope.plants.length - numberOfPlantsShown), ++currentStartingIndex);
        $scope.plantsToShow = $scope.plants.slice(currentStartingIndex, currentStartingIndex + numberOfPlantsShown);
    }

    var widthOfPlant = 22;
    $scope.width = document.getElementById('palette').clientWidth;
    var numberOfPlantsShown = Math.floor($scope.width / widthOfPlant) - 2;
    var currentStartingIndex = 0;

    plants.forEach(function(plant) {
        var minimumGreen = 100;
        var green = Math.max(Math.floor(Math.random() * 255), minimumGreen);
        var red = Math.floor(Math.random() * green);
        var blue = Math.floor(Math.random() * green);        
        plant.style = {"background-color": "rgb(" + red + ", " + green + ", " + blue + ")"};
    });

    $scope.plants = plants;

    $scope.leftArrow();
    
    $scope.newCanvas = function() {
        $scope.modal.show();
    }

    $scope.dimensionsChosen = function() {
        $scope.modal.hide();
    }

}]);
