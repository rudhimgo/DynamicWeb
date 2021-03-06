
'use strict';

(function() {

  var socket = io();
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  var sizes = document.getElementsByClassName('size');
  var context = canvas.getContext('2d');

  var current = {
    color: 'black'
    //size: five
  };
  var drawing = false;


//checking where the mouse is and calling the mouse functions
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

//listening for the click on the colors and calling the color update function every time 
  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }


//listening for the click on size and calling the size update function
//console log to find out whether or not the click is working
   for (var i = 0; i < sizes.length; i++){
    sizes[i].addEventListener('click', onSizeUpdate, false);
    console.log("you clicked a size!");
  }

//calling socket.io to make it collaborative
  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();


//the drawLine function is what actually draws the line
// the color variable is used to update what color is used based on what was clicked
  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.stroke();
    context.closePath();

//console logging lineWidth to see if the variable is recieving a value that is clicked
    console.log(lineWidth);

//putting the same lines that were drawn on one screen onto the other window using socket.io
    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

//--------------------------------------------MOUSE FUNCTIONS---------------------------------

//when the mouse button is pressed down, make the x and y of the mouse correspond to the current variables
//making it so that you can have a line being drawn
  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX;
    current.y = e.clientY;
  }

//when the mouse button is unpressed, have the line that was drawn stay there
//calling the drawLine function for all the details attached to the current variables
  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, current.size, true);
  }

//when the mouse moves while pressed down, define all the current variables as what it currently is
//calling the drawLine function for all the details attached to the current variables
  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, current.size, true);
    current.x = e.clientX;
    current.y = e.clientY;
  }

//function that updates the color and splits the div name to return the actual color
  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

//function that updates the size and is getting the size from the class names of the div in the HTML
  function onSizeUpdate(e){
    current.size = e.getElementsByClassName.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

//keep the drawing in the canvas area
  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the canvas fill the window
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})();