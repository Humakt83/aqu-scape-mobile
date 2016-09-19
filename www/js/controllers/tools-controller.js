angular.module('aqu-scape').controller('ToolsController', [ '$scope', '$ionicModal', 'plants', function($scope, $ionicModal, plants) {

    initCanvas = function() {
        var canvas = document.getElementById('aquCanvas');
        paper.setup(canvas);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        var tool = new paper.Tool();
        tool.onMouseDown = function(event) {            
            if (!$scope.brush) return;
            var circle = new paper.Path.Circle(event.point, $scope.brush.diameter);
            circle.fillColor = $scope.brush.color;
            paper.view.draw();
        }       
    }

    initCanvas();

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

    plants.query(function(plantArray) {
        plantArray.forEach(function(plant) {
            var minimumGreen = 100;
            var green = Math.max(Math.floor(Math.random() * 255), minimumGreen);
            var red = Math.floor(Math.random() * green);
            var blue = Math.floor(Math.random() * green);
            plant.color = "rgb(" + red + ", " + green + ", " + blue + ")";
            plant.style = {"background-color": "rgb(" + red + ", " + green + ", " + blue + ")"};
        })
    }).$promise.then(function(result) {
        $scope.plants = result;
        $scope.leftArrow();  
    });    
    
    
    $scope.newCanvas = function() {
        $scope.modal.show();
    }

    $scope.dimensionsChosen = function() {
        $scope.modal.hide();
    }

    $scope.setBrush = function(plant) {
        $scope.brush = plant;
    }

}]);
