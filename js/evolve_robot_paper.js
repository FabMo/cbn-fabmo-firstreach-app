var fabmo = new FabMoDashboard();

	// // Create a Paper.js Path to draw a line into it:
	// var path = new Path();
	// // Give the stroke a color
	// path.strokeColor = 'black';
	// var start = new Point(100, 100);
	// // Move to start and draw a line from there
	// path.moveTo(start);
	// // Note the plus operator on Point objects.
	// // PaperScript does that for us, and much more!
	// path.lineTo(start + [ 100, -50 ]);
	// console.log("finished");
	
/**
 * 
 * USAGE:
 * 
 * - Mouse scrolling on the canvas will zoom-in/out
 * - On each zoom level we redraw the grid
 * 
 */


//Draw a reference rectangle
var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
var path = new Path.Rectangle(rectangle);
path.position = view.center;
path.selected = true;

//Grid drawing function
//If grid-prexists, it removes it and redraws it
//Grid lines span only the current viewport
var drawGrid = function (cellSize) {
    
    this.cellSize = cellSize;
    this.gridColor = '#D0D0D0';
    this.gridGroup;
    
    var self = this;

    var boundingRect = view.bounds;
    var num_rectangles_wide = view.bounds.width / this.cellSize;
    var num_rectangles_tall = view.bounds.height / this.cellSize;

    
    this.createGrid = function() {
        
        gridGroup = new Group();
        
        for (var i = 0; i <= num_rectangles_wide; i++) {
            var correctedLeftBounds = Math.ceil(boundingRect.left / self.cellSize) * self.cellSize;
            var xPos = correctedLeftBounds + i * self.cellSize;
            var topPoint = new Point(xPos, boundingRect.top);
            var bottomPoint = new Point(xPos, boundingRect.bottom);
            var gridLine = new Path.Line(topPoint, bottomPoint);
            gridLine.strokeColor = self.gridColor;
            gridLine.strokeWidth = 1 / view.zoom;
    
            self.gridGroup.addChild(gridLine);
    
        }
    
        for (var i = 0; i <= num_rectangles_tall; i++) {
            var correctedTopBounds = Math.ceil(boundingRect.top / self.cellSize) * self.cellSize;
            var yPos = correctedTopBounds + i * self.cellSize;
            var leftPoint = new Point(boundingRect.left, yPos);
            var rightPoint = new Point(boundingRect.right, yPos);
            var gridLine = new Path.Line(leftPoint, rightPoint);
            
            gridLine.strokeColor = self.gridColor;
            gridLine.strokeWidth = 1 / view.zoom;
            self.gridGroup.addChild(gridLine);
        }
        gridGroup.sendToBack();
        view.update();
    }
    
    this.removeGrid = function() {
        for (var i = 0; i < gridGroup.children.length-1; i++) {
          gridGroup.children[i].remove();
        }
        gridGroup.remove();
    }
    
    if(typeof gridGroup === 'undefined') {
        this.createGrid();
    } else {
        this.removeGrid();
        this.createGrid();
    }
}

drawGrid(100);


// Zoom Scroll
// We redraw the grid on each zoom-step
//$('.gui-context').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event){ 
$('canvas3').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event){ 
    
    if (event.originalEvent.wheelDelta >= 0) {
        if(view.zoom>10) return false;
        view.zoom +=0.1;
    }
    else {
        if(view.zoom<1) return false;
        view.zoom -=0.1;
    }
    
    drawGrid(100);
    
});
