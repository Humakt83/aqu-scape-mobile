angular.module('aqu-scape').factory('GraphicsService', ['AquariumDimensions', function(AquariumDimensions) {

    scaleWidthToFittingDimensions = function(diameter) {
        var multiplier = paper.view.bounds.height / AquariumDimensions.getWidth();
        console.log('Width: ' + multiplier);
        return diameter * multiplier;
    }

    scaleDepthToFittingDimensions = function(diameter) {
        var multiplier = paper.view.bounds.width / AquariumDimensions.getDepth();
        console.log('Depth: ' + multiplier);
        return diameter * multiplier;
    }

    return {
        drawEllipseFittingCanvasAndDimension: function(point, diameter, color) {
            var rectangle = new paper.Rectangle(point, new paper.Size(scaleDepthToFittingDimensions(diameter), scaleWidthToFittingDimensions(diameter)));
            var ellipse = new paper.Path.Ellipse(rectangle);
            ellipse.fillColor = color;
            return ellipse;
        }
    }

}]);
