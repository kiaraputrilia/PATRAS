let defaultTime = 0.0012; // large = quick dry
let runnyColors = false;
let backgrd = 0; // 255 white; 0 black
let smallCanvas = false;
let state;
dryTime = defaultTime;
let prevMouseX, prevMouseY;
let sliderDrops, buttonDry, buttonWet, buttonDefault;
let colorPicker;
let colorPicked;
let paint = [];
let tempPaint1 = [];
let tempPaint2 = [];

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight * 0.93);
    background(255);

    // UI Elements
    let colorPicker = select("#colorPicker");
    let sliderDrops = select("#brushSize");
    let buttonDry = select("#dryButton");
    let buttonWet = select("#wetButton");
    let buttonDefault = select("#defaultButton");
    let saveButton = select("#saveButton");

    // Button Actions
    buttonDry.mousePressed(() => changeState("Dry", 1000));
    buttonWet.mousePressed(() => changeState("Wet", 0.0001));
    buttonDefault.mousePressed(() => changeState("Default", defaultTime));
    saveButton.mousePressed(() => saveCanvas('painting', 'png'));

    // Initialize paint arrays
    for (let i = 0; i < width * height * 4; i++) {
        paint.push(backgrd);
        tempPaint1.push(backgrd);
        tempPaint2.push(backgrd);
    }
}

function draw() {
    let colorPicked = select("#colorPicker").value();
    addPaint(colorPicked);
    updatePaint();
    renderPaint();
}

function changeState(state, time) {
    dryTime = time;
    console.log(`State: ${state}`);
}

function addPaint(colorPicked) {
    if (mouseIsPressed && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let distance = dist(prevMouseX, prevMouseY, mouseX, mouseY);
        let numPoints = floor(distance / 1);

        drawLinePoints(prevMouseX, prevMouseY, mouseX, mouseY, numPoints, colorPicked);

        if (mouseX == prevMouseX && mouseY == prevMouseY) {
            renderPoint(mouseX, mouseY, colorPicked);
        }
    }
    prevMouseX = mouseX;
    prevMouseY = mouseY;
}

function drawLinePoints(x1, y1, x2, y2, points, colorPicked) {
    for (let i = 0; i < points; i++) {
        let t = map(i, 0, points, 0.0, 1.0);
        let x = round(lerp(x1, x2, t));
        let y = round(lerp(y1, y2, t));
        renderPoint(x, y, colorPicked);
    }
}

function renderPoint(x, y, colorPicked) {
    let index = (x + y * width) * 4;
    let c = color(colorPicked);
    let newR = (paint[index] + red(c)) / 2;
    let newG = (paint[index + 1] + green(c)) / 2;
    let newB = (paint[index + 2] + blue(c)) / 2;
    let newN = paint[index + 3] + select("#brushSize").value();

    paint.splice(index, 4, newR, newG, newB, newN);
}

function updatePaint() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            if (paint[index + 3] > 4) {
                tempPaint1[index + 3] = paint[index + 3] - 4;

                if (x < width - 1) mixColors(index, index + 4);
                if (x > 0) mixColors(index, index - 4);
                if (y < height - 1) mixColors(index, index + width * 4);
                if (y > 0) mixColors(index, index - width * 4);
            }
            tempPaint1[index + 3] -= dryTime;
            tempPaint1[index + 3] = max(0, tempPaint1[index + 3]);
        }
    }
    paint = runnyColors ? tempPaint1 : tempPaint2;
}

function mixColors(index1, index2) {
    tempPaint1[index2] = (paint[index2] + paint[index1]) / 2;
    tempPaint1[index2 + 1] = (paint[index2 + 1] + paint[index1 + 1]) / 2;
    tempPaint1[index2 + 2] = (paint[index2 + 2] + paint[index1 + 2]) / 2;
    tempPaint1[index2 + 3] = paint[index2 + 3] + 1;
}

function renderPaint() {
    loadPixels();
    for (let i = 0; i < width * height * 4; i++) {
        pixels[i] = paint[i];
    }
    updatePixels();
}
