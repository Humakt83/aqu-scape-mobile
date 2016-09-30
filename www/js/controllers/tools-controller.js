angular.module('aqu-scape').controller('ToolsController', [ '$scope', '$ionicModal', 'plants', 'GraphicsService', 'AquariumDimensions', 
        function($scope, $ionicModal, plants, GraphicsService, AquariumDimensions) {

    var actionStack = [];
    var currentUndoIndex = 0;

    $scope.width = AquariumDimensions.getWidth();
    $scope.depth = AquariumDimensions.getDepth();

    $scope.selectedItem;

    initCanvas = function() {
        removeRedoStack = function() {
            for (; currentUndoIndex < actionStack.length - 1;) {
                actionStack.pop();
            }    
        }
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
            if($scope.brush.customType) {
                ellipse.customType = true;
                $scope.selectedItem = ellipse;
                ellipse.strokeColor = 'yellow';
            }
            ellipse.originalPosition = ellipse.position;     
            removeRedoStack();
            actionStack.push({item: ellipse, action: 'add'});
            currentUndoIndex = actionStack.length -1;
            paper.view.draw();
        }
        paper.view.onMouseDrag = function(event) {
            var item = $scope.selectedItem;
            if (!item) return;
            if (item.customType && !item.resized) {
                if (event.point.y <= item.bounds.topLeft.y || event.point.x <= item.bounds.topLeft.x) item.bounds.topLeft = event.point;
                else item.bounds.bottomRight = event.point;
            } else {
                item.position = event.point;
            }
        }
        paper.view.onMouseUp = function(event) {
            var item = $scope.selectedItem;
            if (!item || item.strokeColor === 'yellow') return;
            item.strokeColor = 'black';
            if (!item.customType || item.resized) {
                removeRedoStack();
                var previousPosition = item.originalPosition;
                var newPosition = event.point.x;            
                item.position = event.point;
                actionStack.push({item: item, action: 'move', previousPosition: previousPosition, newPosition: newPosition});
                currentUndoIndex = actionStack.length -1;
                item.originalPosition = item.position;
            }
            item.resized = true;
            item = undefined;
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
        if (actionStack.length < 1 || currentUndoIndex < 0) return;
        if (actionStack[currentUndoIndex].action === 'move') {
            actionStack[currentUndoIndex].item.position = actionStack[currentUndoIndex].previousPosition;
        } else {
            actionStack[currentUndoIndex].item.opacity = '0';
        }        
        currentUndoIndex -= 1;
        paper.view.draw();
    }

    $scope.redo = function() {
        if (actionStack.length < 1 || !actionStack[currentUndoIndex + 1]) return;
        currentUndoIndex = currentUndoIndex + 1;
        if (actionStack[currentUndoIndex].action === 'move') {
            actionStack[currentUndoIndex].item.position = actionStack[currentUndoIndex].newPosition;
        } else {
            actionStack[currentUndoIndex].item.opacity = '1';
        }
        paper.view.draw();
    }

    $scope.clear = function() {
        actionStack = [];
        currentUndoIndex = 0;
        paper.project.activeLayer.removeChildren();
        paper.view.draw();
    }

    $scope.stoneBrush = function() {
        $scope.brush = {customType: 'stone', color: 'rgb(150, 150, 150)', textColor: {'color': 'white'}, backgroundColor: {'background-color': 'rgb(150, 150, 150)'}, diameter: 5};
    }

    $scope.treeBrush = function() {
        $scope.brush = {customType: 'tree', color: 'rgb(170, 80, 80)', textColor: {'color': 'white'}, backgroundColor: {'background-color': 'rgb(170, 80, 80)'}, diameter: 5};
    }

}]);
