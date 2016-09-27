angular.module('aqu-scape').factory('GraphicsService', ['AquariumDimensions', function(AquariumDimensions) {

    scaleWidthToFittingDimensions = function(diameter) {
        var multiplier = paper.view.bounds.height / AquariumDimensions.getWidth();
        return diameter * multiplier;
    }

    scaleDepthToFittingDimensions = function(diameter) {
        var multiplier = paper.view.bounds.width / AquariumDimensions.getDepth();
        return diameter * multiplier;
    }

    return {
        drawEllipseFittingCanvasAndDimension: function(point, diameter, color) {
            var size = new paper.Size(scaleDepthToFittingDimensions(diameter), scaleWidthToFittingDimensions(diameter))
            point.x = point.x - (size.width / 2);
            point.y = point.y - (size.height / 2);
            var rectangle = new paper.Rectangle(point, size);
            var ellipse = new paper.Path.Ellipse(rectangle);
            ellipse.fillColor = color;
            return ellipse;
        }
    }

}]);
