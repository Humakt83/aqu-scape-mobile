angular.module('aqu-scape').controller('ToolsController', [ '$scope', '$ionicModal', 'plants', function($scope, $ionicModal, plants) {

    var actionStack = [];
    var currentUndoIndex = 0;

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
            if (actionStack.length > 1) {
                for (; currentUndoIndex < actionStack.length - 1;) {
                    actionStack.pop();
                }
            }    
            console.log(actionStack.length);                
            actionStack.push(circle);
            currentUndoIndex = actionStack.length -1;
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

    plants.$promise.then(function(plantArray) {
        plantArray.forEach(function(plant) {
            var minimumGreen = 100;
            var green = Math.max(Math.floor(Math.random() * 255), minimumGreen);
            var red = Math.floor(Math.random() * green);
            var blue = Math.floor(Math.random() * green);
            plant.color = "rgb(" + red + ", " + green + ", " + blue + ")";
            plant.style = {"background-color": "rgb(" + red + ", " + green + ", " + blue + ")"};
        })
        $scope.plants = plantArray;
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

    $scope.undo = function() {
        if (actionStack.length < 1) return;        
        actionStack[currentUndoIndex].opacity = '0';
        currentUndoIndex = Math.max(0, currentUndoIndex - 1);
    }

    $scope.redo = function() {
        if (actionStack.length < 1 || !actionStack[currentUndoIndex + 1]) return;
        currentUndoIndex = currentUndoIndex + 1;    
        actionStack[currentUndoIndex].opacity = '1';
    }

}]);
