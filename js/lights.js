var canvasObject;
var canvasContext;
//window.addEventListener("load", initLights, false);
function initLights() {
    canvasObject = document.getElementById("randomcolors");
    if (canvasObject.getContext) {
        canvasContext = canvasObject.getContext("2d");
		canvasObject.className = "active";
        setupExample();
    }
}
var lightsArray = new Array();

function setupExample() {
    window.setInterval(drawLightsIntervalHandler, 35);
    window.setInterval(newLightIntervalHandler, 30);
}

function newLightIntervalHandler() {
    var pointX = Math.floor(Math.random() * (canvasObject.width+1));
    var pointY = Math.floor(Math.random() * (canvasObject.height+1));
    var randomHue = Math.random() * 360;
    var light = new ColorLight(pointX, pointY, randomHue);

    lightsArray.push(light);
}

function drawLightsIntervalHandler() {
    drawLights();
    var k = 0;
    for (var i = 0; i < lightsArray.length; i++) {
        lightsArray[k] = lightsArray[i];

        if (lightsArray[k].advance()) {
            k++;
        }
    }

    lightsArray.length = k;
}

function drawLights() {
    canvasContext.fillStyle = "#000000";
    canvasContext.fillRect(0, 0, canvasObject.width, canvasObject.height);

    for (var i = 0; i < lightsArray.length; i++) {
        var light = lightsArray[i];
       	canvasContext.fillStyle = "rgba(" + light.color.r + "," + light.color.g + "," + light.color.b + "," + light.color.alpha + ")";
        canvasContext.beginPath();
        canvasContext.arc(light.centerX, light.centerY, light.radius, 0, 2*Math.PI, false);
        canvasContext.fill();
    }
}

function ColorLight(centerX, centerY, hue) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = 1;
    this.color = new RGBAColor();
    this.color.setFromHSV(hue, .5, .5, .5);
}

ColorLight.prototype.advance = function() {
    this.radius += 4;
    this.color.alpha -= 0.015;

    if (this.color.alpha <= 0) {
        return false;
    }

    return true;
}