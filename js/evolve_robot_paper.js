var fabmo = new FabMoDashboard();

var c3 = document.getElementById('canvas3'); // in your HTML this element appears as <canvas id="mycanvas"></canvas>

//Draw a reference rectangle
var rectangle = new Rectangle(new Point(50, 50), new Point(250, 200));
var path3 = new Path.Rectangle(rectangle);
path3.position = view.center;
path3.selected = true;

//Grid drawing function
//If grid-prexists, it removes it and redraws it
//Grid lines span only the current viewport
//    gridGroup = new Group();

var drawGrid = function (cellSize) {

    var cvs3 = c3.getContext('2d');
    c3.width  = window.innerWidth;
console.log(c3.width, window.innerWidth);
    c3.height = window.innerHeight; //subtract tab area (better method?)
//    cvs3.canvas.height = Math.round(window.innerHeight) - 40; //subtract tab area (better method?)
    view.viewSize.width = window.innerWidth;
    view.viewSize.height = window.innerHeight;
    //this.cellSize = cellSize;
    this.cellSize = c3.height; //hard-coded for handibot
    this.cellSize = Math.round(c3.height / 8); //hard-coded for handibot
    this.gridColor = '#D0D0D0';
    this.gridGroup; //seems needed, don't get why this error
    var self = this;

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}



    var boundingRect = view.bounds;
console.log(this.cellSize, c3.width, toType(c3.width), window.innerWidth);
    var num_rectangles_wide = c3.width / this.cellSize;
    var num_rectangles_tall = c3.height / this.cellSize;
//    var num_rectangles_wide = cvs3.canvas.width / 6;
//    var num_rectangles_tall = cvs3.canvas.height / 8;
    
    this.createGrid = function() {
    gridGroup = new Group();

        for (var i = 0; i <= num_rectangles_wide; i++) {
            var correctedLeftBounds = Math.ceil(boundingRect.left / self.cellSize) * self.cellSize;
            var xPos = correctedLeftBounds + i * self.cellSize;
            var topPoint = new Point(xPos, boundingRect.top);
            var bottomPoint = new Point(xPos, boundingRect.bottom);
            var v_gridLine = new Path.Line(topPoint, bottomPoint);
//console.log(num_rectangles_wide, correctedLeftBounds, self.cellSize, topPoint, bottomPoint, view.zoom);
            v_gridLine.strokeColor = self.gridColor;
            v_gridLine.strokeWidth = 1 / view.zoom;
            self.gridGroup.addChild(v_gridLine);
        }
    
        for (i = 0; i <= num_rectangles_tall; i++) {
            var correctedTopBounds = Math.ceil(boundingRect.top / self.cellSize) * self.cellSize;
            var yPos = correctedTopBounds + i * self.cellSize;
            var leftPoint = new Point(boundingRect.left, yPos);
            var rightPoint = new Point(boundingRect.right, yPos);
            var h_gridLine = new Path.Line(leftPoint, rightPoint);
            h_gridLine.strokeColor = self.gridColor;
            h_gridLine.strokeWidth = 1 / view.zoom;
            self.gridGroup.addChild(h_gridLine);
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

function onResize(event) {
	// Whenever the window is resized, recenter the path:
	boundingRect = view.bounds;
	path3.position = view.center;
	gridGroup.position = view.center;
    //drawGrid(25);
}

drawGrid(121);



// Zoom Scroll
//$('.gui-context').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event){ 
$('#canvas3').on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event){ 
    if (event.originalEvent.wheelDelta >= 0) {
        if(view.zoom>10) return false;
        view.zoom +=0.1;
    }
    else {
        if(view.zoom<1) return false;
        view.zoom -=0.1;
    }
});
