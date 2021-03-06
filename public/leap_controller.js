/*var layer_defs = [];
layer_defs.push({type:'input', out_sx:24, out_sy:24, out_depth:1});
layer_defs.push({type:'conv', sx:5, filters:8, stride:1, pad:2, activation:'relu'});
layer_defs.push({type:'pool', sx:2, stride:2});
layer_defs.push({type:'conv', sx:5, filters:16, stride:1, pad:2, activation:'relu'});
layer_defs.push({type:'pool', sx:3, stride:3});
layer_defs.push({type:'softmax', num_classes:10});

var net = new convnetjs.Net();
net.makeLayers(layer_defs);

var trainer = new convnetjs.SGDTrainer(net, {method:'adadelta', batch_size:20, l2_decay:0.001});
console.log(trainer);
*/

var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");

var fpsDisplay = document.getElementById('leapFPS');
var handCountDisplay = document.getElementById('handCount');
var pointableCountDisplay = document.getElementById('pointableCount');
var fingerCountDisplay = document.getElementById('fingerCount');
var toolCountDisplay = document.getElementById('toolCount');
var gestureCountDisplay = document.getElementById('gestureCount');


/*class LeapMotion {
    constructor() {
        this.controller = new Leap.Controller({
            enableGestures: true,
            frameEventName: 'animationFrame'
        });
        this.controller.recording = true;
    }  
}*/

var controller = new Leap.Controller({
    enableGestures: true,
    frameEventName: "animationFrame"
});
controller.recording = false;

var gesture_points = new Array(5);  // stores the point when a new gesture is being done
for (var c = 0; c < 5; c++) gesture_points[c] = [];

controller.on("frame", function(frame) {
    if (frame.hands.length != 0) {
        if (!controller.recording) ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame.hands.forEach(function(hand) {
            hand.fingers.forEach(function(finger, c) {
                var canvas_coords = leap_to_screen(finger.tipPosition[0],
                                                   finger.tipPosition[1]);
                if (controller.recording) {
                    draw_circle(canvas_coords[0], canvas_coords[1], "red", ctx);
                    gesture_points[c].push(new Point(canvas_coords[0], canvas_coords[1]));
                }
                else draw_circle(canvas_coords[0], canvas_coords[1], "black", ctx);
            });
        });
    }
    
    fpsDisplay.innerText = frame.currentFrameRate;
    handCountDisplay.innerText = frame.hands.length;
    pointableCountDisplay.innerText = frame.pointables.length;
    fingerCountDisplay.innerText = frame.fingers.length;
    toolCountDisplay.innerText = frame.tools.length;
    gestureCountDisplay.innerText = frame.gestures.length;
});

controller.connect();

// some functions
function leap_to_screen(leap_x, leap_y) {
    return [(Math.round(leap_x)+400), (canvas.height-20 - Math.round(leap_y+200))];
}

function clear_gesture_points() {
	for (var c = 0; c < 5; c++) gesture_points[c] = [];
}

function draw_circle(x, y, color, context, filled=false) {	
    context.beginPath();
    context.arc(x, y, 8, 0, 2*Math.PI);
    context.strokeStyle = color;
	if (filled) {
		context.fillStyle = color;
		context.fill();
	}
    context.stroke();
}

function key_pressed(event) {
    if (event.which === 102) {
        console.log("F pressed");
        
        if (controller.recording) {
            for (var c = 0; c < gesture_points[1].length; c++) {
				console.log(gesture_points[1][c].x+" "+gesture_points[1][c].y);
                draw_circle(gesture_points[1][c].x, gesture_points[1][c].y, "green", ctx2, true);
            }
        }
		else {
			clear_gesture_points();
		}
        controller.recording = !controller.recording;
    }
}


