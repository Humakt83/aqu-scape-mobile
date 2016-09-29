angular.module('aqu-scape').controller('ToolsController', [ '$scope', '$ionicModal', 'plants', 'GraphicsService', 'AquariumDimensions', 
        function($scope, $ionicModal, plants, GraphicsService, AquariumDimensions) {

    var actionStack = [];
    var currentUndoIndex = 0;

    $scope.width = AquariumDimensions.getWidth();
    $scope.depth = AquariumDimensions.getDepth();

    $scope.selectedItem;

    initCanvas = function() {
        var canvas = document.getElementById('aquCanvas');        
        paper.setup(canvas);
        paper.view.draw();        
        paper.view.onMouseDown = function(event) {            
            if (!$scope.brush) return;
            var ellipse = GraphicsService.drawEllipseFittingCanvasAndDimension(event.point, $scope.brush.diameter, $scope.brush.color);
            ellipse.onMouseDown = function(event) {
                event.preventDefault();
                event.stopPropagation();
                ellipse.strokeColor = 'yellow';
                $scope.selectedItem = ellipse;
            };            
            for (; currentUndoIndex < actionStack.length - 1;) {
                actionStack.pop();
            }    
            actionStack.push(ellipse);
            currentUndoIndex = actionStack.length -1;
            paper.view.draw();
        }
        paper.view.onMouseDrag = function(event) {
            if (!$scope.selectedItem) return;
            $scope.selectedItem.position = event.point;
        }
        paper.view.onMouseUp = function(event) {
            if (!$scope.selectedItem) return;
            $scope.selectedItem.strokeColor = 'black';
            $scope.selectedItem.position = event.point; 
            $scope.selectedItem = undefined;
        }
    }

    initCanvas();

    $ionicModal.fromTemplateUrl('templates/dimensions.html', {
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
    var paletteWidth = document.getElementById('palette').clientWidth;
    var numberOfPlantsShown = Math.floor(paletteWidth / widthOfPlant) - 2;
    var currentStartingIndex = 0;  

    plants.$promise.then(function(plantArray) {
        plantArray.forEach(function(plant) {
            var minimumGreen = 100;
            var green = Math.max(Math.floor(Math.random() * 255), minimumGreen);
            var red = Math.floor(Math.random() * green);
            var blue = Math.floor(Math.random() * green);
            var textColor = '';
            if (green + red + blue > 350) {
                textColor = 'black';
            } else {
                textColor = 'white';
            }
            plant.color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
            plant.backgroundColor = {'background-color': 'rgb(' + red + ', ' + green + ', ' + blue + ')'};
            plant.textColor = {'color': textColor};
        })
        $scope.plants = plantArray;
        $scope.leftArrow();  
    });    
    
    
    $scope.newCanvas = function() {
        $scope.modal.show();
    }

    $scope.dimensionsChosen = function(width, depth) {
        $scope.width = width;
        $scope.depth = depth;
        $scope.clear();
        AquariumDimensions.setDepth($scope.depth);
        AquariumDimensions.setWidth($scope.width);
        $scope.modal.hide();
    }

    $scope.setBrush = function(plant) {
        $scope.brush = plant;
    }

    $scope.undo = function() {
        if (actionStack.length < 1) return;        
        actionStack[currentUndoIndex].opacity = '0';
        currentUndoIndex = Math.max(0, currentUndoIndex - 1);
        paper.view.draw();
    }

    $scope.redo = function() {
        if (actionStack.length < 1 || !actionStack[currentUndoIndex + 1]) return;
        currentUndoIndex = currentUndoIndex + 1;
        actionStack[currentUndoIndex].opacity = '1';
        paper.view.draw();
    }

    $scope.clear = function() {
        actionStack = [];
        currentUndoIndex = 0;
        paper.project.activeLayer.removeChildren();
        paper.view.draw();
    }

    $scope.stoneBrush = function() {
        $scope.brush = {customType: 'stone', textColor: {'color': 'white'}, backgroundColor: {'background-color': 'rgb(150, 150, 150)'}};
    }

    $scope.treeBrush = function() {
        $scope.brush = {customType: 'tree', textColor: { 'color': 'white'}, backgroundColor: {'background-color': 'rgb(170, 80, 80)'}};
    }

}]);
