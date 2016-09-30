angular.module('aqu-scape').controller('ToolsController', [ '$scope', '$ionicModal', 'plants', 'GraphicsService', 'AquariumDimensions', 'UndoRedoTool',
        function($scope, $ionicModal, plants, GraphicsService, AquariumDimensions, UndoRedoTool) {  

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
            if($scope.brush.customType) {
                ellipse.customType = true;
                $scope.selectedItem = ellipse;
                ellipse.strokeColor = 'yellow';
            } else {
                var text = new paper.PointText(ellipse.position);
                text.justification = 'center';
                text.fillColor = $scope.brush.textColor.color;
                text.content = $scope.brush.identificationNumber;
                ellipse.text = text;
            }
            ellipse.originalPosition = ellipse.position;         
            UndoRedoTool.clearRedoStack();
            UndoRedoTool.pushToActionStack(ellipse, UndoRedoTool.addAction());
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
                item.text.position = event.point;
            }
        }
        paper.view.onMouseUp = function(event) {
            var item = $scope.selectedItem;
            if (!item || item.strokeColor === 'yellow') return;
            item.strokeColor = 'black';
            if (!item.customType || item.resized) {
                UndoRedoTool.clearRedoStack();            
                var previousPosition = item.originalPosition;
                var newPosition = event.point.x;            
                item.position = event.point;
                UndoRedoTool.pushToActionStack(item, UndoRedoTool.moveAction(), previousPosition, newPosition);
                item.originalPosition = item.position;
            }
            item.resized = true;
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
        GraphicsService.assignColorPropertiesToPlants(plantArray);
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
        $scope.selectedItem = undefined;
    }

    $scope.undo = function() {
        UndoRedoTool.undo();
    }

    $scope.redo = function() {
        UndoRedoTool.redo();
    }

    $scope.clear = function() {
        $scope.selectedItem = undefined;
        UndoRedoTool.reset()
        paper.project.activeLayer.removeChildren();
        paper.view.draw();
    }

    $scope.stoneBrush = function() {
        $scope.selectedItem = undefined;
        $scope.brush = {customType: 'stone', color: 'rgb(150, 150, 150)', textColor: {'color': 'white'}, backgroundColor: {'background-color': 'rgb(150, 150, 150)'}, diameter: 5};
    }

    $scope.treeBrush = function() {
        $scope.selectedItem = undefined;
        $scope.brush = {customType: 'tree', color: 'rgb(170, 80, 80)', textColor: {'color': 'white'}, backgroundColor: {'background-color': 'rgb(170, 80, 80)'}, diameter: 5};
    }

}]);
