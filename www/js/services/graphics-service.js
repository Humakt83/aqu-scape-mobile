angular.module('aqu-scape').factory('GraphicsService', ['AquariumDimensions', function(AquariumDimensions) {

    scaleWidthToFittingDimensions = function(diameter) {
        var multiplier = paper.view.bounds.height / AquariumDimensions.getWidth();
        return diameter * multiplier;
    }

    scaleDepthToFittingDimensions = function(diameter) {
        var multiplier = paper.view.bounds.width / AquariumDimensions.getDepth();
        return diameter * multiplier;
    }

    getSumOfColor = function(color) {
        return color.red + color.green + color.blue;
    }

    randomColorTiltedGreen = function() {
        var minimumGreen = 100;
        var green = Math.max(Math.floor(Math.random() * 255), minimumGreen);
        var red = Math.floor(Math.random() * green);
        var blue = Math.floor(Math.random() * green);
        return {green: green, red: red, blue: blue};
    }

    colorClashes = function(color, plantArray) {
        plantArray.forEach(function(plantToCompare) {
            if (plantToCompare.randomColor && Math.abs(getSumOfColor(plantToCompare.randomColor) - getSumOfColor(color)) < 30) {
                return true;
            }
        }); 
        return false;
    }

    textColorFittingBackground = function(color) {
        if (getSumOfColor(color) > 350) {
            return 'black';
        } else {
            return 'white';
        }
    }

    return {
        drawEllipseFittingCanvasAndDimension: function(point, diameter, color) {
            var size = new paper.Size(scaleDepthToFittingDimensions(diameter), scaleWidthToFittingDimensions(diameter))
            point.x = point.x - (size.width / 2);
            point.y = point.y - (size.height / 2);
            var rectangle = new paper.Rectangle(point, size);
            var ellipse = new paper.Path.Ellipse(rectangle);
            ellipse.fillColor = color;
            ellipse.strokeColor = 'black';
            return ellipse;
        },
        assignColorPropertiesToPlants: function(plantArray) {
            plantArray.forEach(function(plant) {
                do var color = randomColorTiltedGreen();
                while (colorClashes(color, plantArray));
                var textColor = textColorFittingBackground(color);
                plant.randomColor = color;
                plant.color = 'rgb(' + color.red + ', ' + color.green + ', ' + color.blue + ')';
                plant.backgroundColor = {'background-color': 'rgb(' + color.red + ', ' + color.green + ', ' + color.blue + ')'};
                plant.textColor = {'color': textColor};
            });
        }
    }

}]);
