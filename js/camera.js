var video;
var dataURL;

//http://coderthoughts.blogspot.co.uk/2013/03/html5-video-fun.html - thanks :)
function setup() {
    navigator.myGetMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
    navigator.myGetMedia({ video: true }, connect, error);
}

function connect(stream) {
    video = document.getElementById('video');
    video.src = window.URL ? window.URL.createObjectURL(stream) : stream;
    video.play();
}

function error(e) { console.log(e); }

addEventListener('load', setup);

function captureImage() {
    //var canvas = document.createElement('canvas');
    var canvas = document.getElementById('hiddenCanvas');
    var ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //save canvas image as data url
    dataURL = canvas.toDataURL();
}

//Bind a click to a button to capture an image from the video stream
var el = document.getElementById('snap-button');
el.addEventListener('click', captureImage, false);