var canvas, ctx, points, canvas_rect, clicked;


function on_load_event() {
	clicked = false;
	canvas = document.getElementById("canvas2");  // canvas2
	ctx = canvas.getContext("2d");
	points = new Array();
	canvas_rect = get_canvas_rect(canvas);
}

function get_canvas_rect(canvas) {
	var w = canvas.width;
	var h = canvas.height;
	var canvas_x = canvas.offsetLeft;
	var canvas_y = canvas.offsetTop;
	while(canvas.offsetParent != null) {
		canvas = canvas.offsetParent;
		canvas_x += canvas.offsetLeft;
		canvas_y += canvas.offsetTop;
	}
	return {x: canvas_x, y: canvas_y, width: w, height: h};
}

function mouse_down_event(x, y, button) {
	if(button <= 1) {
		clicked = true;
		x -= canvas_rect.x - get_scroll_X();
		y -= canvas_rect.y - get_scroll_Y();
		
		points.push(new Point(x, y));
		console.log("begin point: "+points[points.length-1].x+", "+points[points.length-1].y);
		ctx.strokeStyle = "green";
		ctx.fillStyle = "green";
		ctx.fillRect(x, y, 20, 20);
	}
} 

function mouse_move_event(x, y, button) {
	if(clicked) {
		x -= canvas_rect.x - get_scroll_X();
		y -= canvas_rect.y - get_scroll_Y();
		points.push(new Point(x, y));
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, 2*Math.PI);
		ctx.stroke();
		ctx.fill();		
	}
}

function mouse_up_event(x, y, button) {
	if(button <= 1 && clicked) {
		clicked = false;
		x -= canvas_rect.x;
		y -= canvas_rect.y;
		console.log("end point: "+x+", "+y);
	}
}

function get_scroll_X() { return $(window).scrollLeft(); }
function get_scroll_Y() { return $(window).scrollTop(); }
