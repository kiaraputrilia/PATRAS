let defaultTime = 0.0001; // Set to a low value for a wet brush
let runnyColors = false;
let backgrd = 255; // Background color for the canvas
let dryTime = defaultTime; // Keep wet by default
let prevMouseX, prevMouseY;
let sliderDrops;
let colorPicker;
let colorPicked;
let paint = [];
let tempPaint1 = [];
let tempPaint2 = [];
let bgImage;

function preload() {
  // Load the appropriate background image based on the device screen size
  if (windowWidth < 768) {
    // Load the phone background image
    bgImage = loadImage('phone_background.png');
  } else {
    // Load the laptop background image
    bgImage = loadImage('laptop_background.png');
  }
}

function setup() {
  // Set canvas height to 90% of the window height
  let canvasHeight = round(windowHeight * 0.9);
  let canvasWidth = round(windowWidth);
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(1);

  // Create and style the "Save My Painting" button
  saveButton = createButton("SAVE MY PAINTING");
  styleButton(saveButton, '1vw', '1vw', '0.5vw', false);
  saveButton.mousePressed(saveCompositeImage);

  // Create and style the color picker
  colorPicker = createColorPicker('#FFEA00');
  styleButton(colorPicker, '1vw', '1vw', '0.5vw', true); // Using the same style function but with shorter width
  colorPicker.input(() => updateColorPicker(colorPicker));

  // Create and style the slider
  sliderDrops = createSlider(5, 200, 50); // Increased the maximum value
  styleSlider(sliderDrops, false);

  // Create and style the marquee
  createMarquee();

  // Position elements
  positionElements();

  window.addEventListener('resize', () => {
    resizeCanvas(round(windowWidth), round(windowHeight * 0.9));
    positionElements();
  });

  // fill the arrays with white color
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      paint.push(backgrd, backgrd, backgrd, 0);
    }
  }
  tempPaint1 = paint; 
  tempPaint2 = paint;
}

function styleButton(button, fontSize, paddingLR, paddingTB, isColorPicker) {
  button.style('font-size', fontSize);
  button.style('padding', paddingTB);
  button.style('padding-left', paddingLR);
  button.style('padding-right', paddingLR);
  button.style('border', '2px solid black');
  button.style('border-radius', '20vw');
  button.style('font-family', 'Suiss Regular, sans-serif');
  button.style('background-color', '#FFEA00');
  button.style('margin', '1vw');
  button.style('text-transform', 'uppercase'); // Make text uppercase
  if (!isColorPicker) {
    button.style('white-space', 'nowrap'); // Ensure text is on one line for laptop
  }
  button.mouseOver(() => button.style('background-color', 'white'));
  button.mouseOut(() => button.style('background-color', '#FFEA00'));
}

function createMarquee() {
  let marqueeContainer = createDiv();
  marqueeContainer.class('marquee');
  let marqueeContent = createSpan();
  marqueeContent.html('<a href="https://www.spotify.com" target="_blank">Listen now on all streaming services</a>');
  marqueeContainer.child(marqueeContent);
  document.body.appendChild(marqueeContainer.elt);
}

function updateColorPicker(picker) {
  picker.style('background-color', picker.value());
}

function styleSlider(slider, isPhone) {
  if (isPhone) {
    slider.style('font-size', '3vw');
    slider.style('padding', '1vw');
    slider.style('border', '2px solid black');
    slider.style('background-color', '#FFEA00');
    slider.style('margin', '1vw');
    slider.style('width', '30vw'); // Shorter width for phone screens
  } else {
    slider.style('font-size', '1.5vw');
    slider.style('padding', '0.5vw');
    slider.style('border', '2px solid black');
    slider.style('background-color', '#FFEA00');
    slider.style('margin', '1vw');
  }
}

function positionElements() {
  let bottomY = windowHeight * 0.9 + 10;

  if (windowWidth < 768) { // Adjust sizes for phone screens
    colorPicker.position(20, bottomY); // Left side
    sliderDrops.position(windowWidth / 2 - 100, bottomY); // Middle
    saveButton.html("SAVE MY<br>PAINTING"); // Text on two lines for phone
    saveButton.position(windowWidth - 120, bottomY); // Right side
    styleButton(saveButton, '4vw', '4vw', '2vw', false); // Larger size for phone screens
    styleButton(colorPicker, '4vw', '4vw', '2vw', true);
    styleSlider(sliderDrops, true); // Shorter slider for phone screens
  } else { // Sizes for laptop screens
    colorPicker.position(50, bottomY); // Left side
    sliderDrops.position(windowWidth / 2 - 100, bottomY); // Middle
    saveButton.html("SAVE MY PAINTING"); // Text on one line for laptop
    saveButton.position(windowWidth - 250, bottomY); // Right side
    styleButton(saveButton, '1vw', '1vw', '0.5vw', false);
    styleSlider(sliderDrops, false);
  }
}

function draw() {
  background(255, 234, 0); // Clear the canvas with a background color

  paintDrop = sliderDrops.value();
  colorPicked = colorPicker.color();
  addPaint();
  update();
  render();

  // Draw the background image on top of the canvas content
  drawBackgroundImage();
}

// Function to draw the background image on top of the canvas content
function drawBackgroundImage() {
  let imgAspect = bgImage.width / bgImage.height;
  let canvasAspect = width / height;
  let drawWidth, drawHeight;

  if (canvasAspect > imgAspect) {
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    drawHeight = height;
    drawWidth = height * imgAspect;
  }

  let x = (width - drawWidth) / 2;
  let y = (height - drawHeight) / 2;

  image(bgImage, x, y, drawWidth, drawHeight);
}

// add paint when clicking - start with dragging
function addPaint() {
  if (
    mouseIsPressed &&
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    let distance = dist(prevMouseX, prevMouseY, mouseX, mouseY);
    let numPoints = floor(distance / 0.5); // Increase the number of points for smoother lines

    drawLinePoints(prevMouseX, prevMouseY, mouseX, mouseY, numPoints);

    // add paint when clicking in one place
    if (mouseX == prevMouseX && mouseY == prevMouseY) {
      renderPoints(mouseX, mouseY);
    }
  }
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  // preventing a wrap around error when dragging off canvas and back on
  if (mouseIsPressed && mouseX < 0) {
    prevMouseX = 0;
  }
  if (mouseIsPressed && mouseX > width - 1) {
    prevMouseX = width - 1;
  }
  if (mouseIsPressed && mouseY < 0) {
    prevMouseY = 0;
  }
  if (mouseIsPressed && mouseY > height - 1) {
    prevMouseY = height - 1;
  }
}

// calculate points when dragging
// This function from George Profenza on stackoverflow https://stackoverflow.com/questions/63959181/how-do-you-draw-a-line-in-a-pixel-array
function drawLinePoints(x1, y1, x2, y2, points) {
  for (let i = 0; i < points; i++) {
    let t = map(i, 0, points, 0.0, 1.0);
    let x = round(lerp(x1, x2, t));
    let y = round(lerp(y1, y2, t));
    renderPoints(x, y);
  }
}

// replace array points when drawing
function renderPoints(x, y) {
  let arrayPos = (x + y * width) * 4;
  let newR = (paint[arrayPos + 0] + colorPicked.levels[0]) / 2;
  let newG = (paint[arrayPos + 1] + colorPicked.levels[1]) / 2;
  let newB = (paint[arrayPos + 2] + colorPicked.levels[2]) / 2;
  let newN = paint[arrayPos + 3] + paintDrop;
  paint.splice(arrayPos, 4, newR, newG, newB, newN); // replace the current pixel color with the newly calculated color
}

// if there's a lot of color in one place, spread it around

function update() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let arrayPos = (x + y * width) * 4;
      if (paint[arrayPos + 3] > 4) {
        tempPaint1[arrayPos + 3] = paint[arrayPos + 3] - 4;

        // mix pixel to right
        if (x < width - 1) {
          tempPaint1[arrayPos + 4] =
            (paint[arrayPos + 4] + paint[arrayPos]) / 2;
          tempPaint1[arrayPos + 5] =
            (paint[arrayPos + 5] + paint[arrayPos + 1]) / 2;
          tempPaint1[arrayPos + 6] =
            (paint[arrayPos + 6] + paint[arrayPos + 2]) / 2;
          tempPaint1[arrayPos + 7] = paint[arrayPos + 7] + 1;
        }

        // mix pixel to left
        if (x > 0) {
          tempPaint1[arrayPos - 4] =
            (paint[arrayPos - 4] + paint[arrayPos]) / 2;
          tempPaint1[arrayPos - 3] =
            (paint[arrayPos - 3] + paint[arrayPos + 1]) / 2;
          tempPaint1[arrayPos - 2] =
            (paint[arrayPos - 2] + paint[arrayPos + 2]) / 2;
          tempPaint1[arrayPos - 1] = paint[arrayPos - 1] + 1;
        }

        // mix pixel below
        tempPaint1[arrayPos + width * 4] =
          (paint[arrayPos + width * 4] + paint[arrayPos]) / 2;
        tempPaint1[arrayPos + width * 4 + 1] =
          (paint[arrayPos + width * 4 + 1] + paint[arrayPos + 1]) / 2;
        tempPaint1[arrayPos + width * 4 + 2] =
          (paint[arrayPos + width * 4 + 2] + paint[arrayPos + 2]) / 2;
        tempPaint1[arrayPos + width * 4 + 3] =
          paint[arrayPos + width * 4 + 3] + 1;

        // mix pixel above
        tempPaint1[arrayPos - width * 4] =
          (paint[arrayPos - width * 4] + paint[arrayPos]) / 2;
        tempPaint1[arrayPos - width * 4 + 1] =
          (paint[arrayPos - width * 4 + 1] + paint[arrayPos + 1]) / 2;
        tempPaint1[arrayPos - width * 4 + 2] =
          (paint[arrayPos - width * 4 + 2] + paint[arrayPos + 2]) / 2;
        tempPaint1[arrayPos - width * 4 + 3] =
          paint[arrayPos - width * 4 + 3] + 1;
      }

      // gradually dry paint
      tempPaint1[arrayPos + 3] = paint[arrayPos + 3] - defaultTime;
      if (tempPaint1[arrayPos + 3] < 0) {
        tempPaint1[arrayPos + 3] = 0;
      }
    }
  }
  
  if (runnyColors == true){
    paint = tempPaint1;
  }
    else {
  for (let x = width; x > 0; x--) {
    for (let y = height; y > 0; y--) {
      let arrayPos = (x + y * width) * 4;
      if (paint[arrayPos + 3] > 4) {
        tempPaint2[arrayPos + 3] = paint[arrayPos + 3] - 4;

        // mix pixel to right
        if (x < width - 1) {
          tempPaint2[arrayPos + 4] =
            (paint[arrayPos + 4] + paint[arrayPos]) / 2;
          tempPaint2[arrayPos + 5] =
            (paint[arrayPos + 5] + paint[arrayPos + 1]) / 2;
          tempPaint2[arrayPos + 6] =
            (paint[arrayPos + 6] + paint[arrayPos + 2]) / 2;
          tempPaint2[arrayPos + 7] = paint[arrayPos + 7] + 1;
        }

        // mix pixel to left
        if (x > 0) {
          tempPaint2[arrayPos - 4] =
            (paint[arrayPos - 4] + paint[arrayPos]) / 2;
          tempPaint2[arrayPos - 3] =
            (paint[arrayPos - 3] + paint[arrayPos + 1]) / 2;
          tempPaint2[arrayPos - 2] =
            (paint[arrayPos - 2] + paint[arrayPos + 2]) / 2;
          tempPaint2[arrayPos - 1] = paint[arrayPos - 1] + 1;
        }

        // mix pixel below
        tempPaint2[arrayPos + width * 4] =
          (paint[arrayPos + width * 4] + paint[arrayPos]) / 2;
        tempPaint2[arrayPos + width * 4 + 1] =
          (paint[arrayPos + width * 4 + 1] + paint[arrayPos + 1]) / 2;
        tempPaint2[arrayPos + width * 4 + 2] =
          (paint[arrayPos + width * 4 + 2] + paint[arrayPos + 2]) / 2;
        tempPaint2[arrayPos + width * 4 + 3] =
          paint[arrayPos + width * 4 + 3] + 1;

        // mix pixel above
        tempPaint2[arrayPos - width * 4] =
          (paint[arrayPos - width * 4] + paint[arrayPos]) / 2;
        tempPaint2[arrayPos - width * 4 + 1] =
          (paint[arrayPos - width * 4 + 1] + paint[arrayPos + 1]) / 2;
        tempPaint2[arrayPos - width * 4 + 2] =
          (paint[arrayPos - width * 4 + 2] + paint[arrayPos + 2]) / 2;
        tempPaint2[arrayPos - width * 4 + 3] =
          paint[arrayPos - width * 4 + 3] + 1;
      }

      // gradually dry paint
      tempPaint2[arrayPos + 3] = paint[arrayPos + 3] - defaultTime;
      if (tempPaint2[arrayPos + 3] < 0) {
        tempPaint2[arrayPos + 3] = 0;
      }
    }
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let arrayPos = (x + y * width) * 4;
      paint[arrayPos] = (tempPaint1[arrayPos] + tempPaint2[arrayPos]) / 2;
    }
  }
}
}

// render all pixels
function render() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let pix = (x + y * width) * 4;
      let arrayPos = (x + y * width) * 4;
      pixels[pix] = paint[arrayPos];
      pixels[pix + 1] = paint[arrayPos + 1];
      pixels[pix + 2] = paint[arrayPos + 2];
    }
  }
  updatePixels();
}

function saveCompositeImage() {
  // Create a new graphics buffer to composite the canvas and the image
  let composite = createGraphics(width, height);
  
  // Draw the canvas content onto the composite buffer
  composite.image(get(), 0, 0, width, height);
  
  // Draw the background image on top of the canvas content
  drawBackgroundImageOnBuffer(composite);
  
  // Save the composite buffer as an image
  composite.save("myPainting.jpg");
}

// Function to draw the background image on a given graphics buffer
function drawBackgroundImageOnBuffer(buffer) {
  let imgAspect = bgImage.width / bgImage.height;
  let canvasAspect = buffer.width / buffer.height;
  let drawWidth, drawHeight;

  if (canvasAspect > imgAspect) {
    drawWidth = buffer.width;
    drawHeight = buffer.width / imgAspect;
  } else {
    drawHeight = buffer.height;
    drawWidth = buffer.height * imgAspect;
  }

  let x = (buffer.width - drawWidth) / 2;
  let y = (buffer.height - drawHeight) / 2;

  buffer.image(bgImage, x, y, drawWidth, drawHeight);
}








// let defaultTime = 0.0001; // Set to a low value for a wet brush
// let runnyColors = false;
// let backgrd = 255; // Background color for the canvas
// let dryTime = defaultTime; // Keep wet by default
// let prevMouseX, prevMouseY;
// let sliderDrops;
// let colorPicker;
// let colorPicked;
// let paint = [];
// let tempPaint1 = [];
// let tempPaint2 = [];
// let bgImage;

// function preload() {
//   // Load the appropriate background image based on the device screen size
//   if (windowWidth < 768) {
//     // Load the phone background image
//     bgImage = loadImage('phone_background.png');
//   } else {
//     // Load the laptop background image
//     bgImage = loadImage('laptop_background.png');
//   }
// }

// function setup() {
//   // Set canvas height to 90% of the window height
//   let canvasHeight = round(windowHeight * 0.9);
//   let canvasWidth = round(windowWidth);
//   createCanvas(canvasWidth, canvasHeight);
//   pixelDensity(1);
//   background(bgImage);

//   // Create and style the "Save My Painting" button
//   saveButton = createButton("Save My Painting");
//   styleButton(saveButton, '1vw', '1vw', '0.5vw', false);
//   saveButton.mousePressed(() => save("myCanvas.jpg"));

//   // Create and style the color picker
//   colorPicker = createColorPicker('#FFEA00');
//   styleButton(colorPicker, '1vw', '1vw', '0.5vw', true); // Using the same style function but with shorter width
//   colorPicker.input(() => updateColorPicker(colorPicker));

//   // Create and style the slider
//   sliderDrops = createSlider(5, 200, 50); // Increased the maximum value
//   styleSlider(sliderDrops, false);

//   // Position elements
//   positionElements();

//   window.addEventListener('resize', () => {
//     resizeCanvas(round(windowWidth), round(windowHeight * 0.9));
//     positionElements();
//   });

//   // fill the arrays with white color
//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       paint.push(backgrd, backgrd, backgrd, 0);
//     }
//   }
//   tempPaint1 = paint; 
//   tempPaint2 = paint;
// }

// function styleButton(button, fontSize, paddingLR, paddingTB, isColorPicker) {
//   button.style('font-size', fontSize);
//   button.style('padding', paddingTB);
//   button.style('padding-left', paddingLR);
//   button.style('padding-right', paddingLR);
//   button.style('border', '2px solid black');
//   button.style('border-radius', '20vw');
//   button.style('font-family', 'Suiss Regular, sans-serif');
//   button.style('background-color', '#FFEA00');
//   button.style('margin', '1vw');
//   if (!isColorPicker) {
//     button.style('white-space', 'nowrap'); // Ensure text is on one line for laptop
//   }
//   button.mouseOver(() => button.style('background-color', 'white'));
//   button.mouseOut(() => button.style('background-color', '#FFEA00'));
// }

// function updateColorPicker(picker) {
//   picker.style('background-color', picker.value());
// }

// function styleSlider(slider, isPhone) {
//   if (isPhone) {
//     slider.style('font-size', '3vw');
//     slider.style('padding', '1vw');
//     slider.style('border', '2px solid black');
//     slider.style('background-color', '#FFEA00');
//     slider.style('margin', '1vw');
//     slider.style('width', '30vw'); // Shorter width for phone screens
//   } else {
//     slider.style('font-size', '1.5vw');
//     slider.style('padding', '0.5vw');
//     slider.style('border', '2px solid black');
//     slider.style('background-color', '#FFEA00');
//     slider.style('margin', '1vw');
//   }
// }

// function positionElements() {
//   let bottomY = windowHeight * 0.9 + 10;

//   if (windowWidth < 768) { // Adjust sizes for phone screens
//     colorPicker.position(20, bottomY); // Left side
//     sliderDrops.position(windowWidth / 2 - 100, bottomY); // Middle
//     saveButton.html("Save my<br>painting"); // Text on two lines for phone
//     saveButton.position(windowWidth - 120, bottomY); // Right side
//     styleButton(saveButton, '4vw', '4vw', '2vw', false); // Larger size for phone screens
//     styleButton(colorPicker, '4vw', '4vw', '2vw', true);
//     styleSlider(sliderDrops, true); // Shorter slider for phone screens
//   } else { // Sizes for laptop screens
//     colorPicker.position(50, bottomY); // Left side
//     sliderDrops.position(windowWidth / 2 - 100, bottomY); // Middle
//     saveButton.html("Save My Painting"); // Text on one line for laptop
//     saveButton.position(windowWidth - 250, bottomY); // Right side
//     styleButton(saveButton, '1vw', '1vw', '0.5vw', false);
//     styleSlider(sliderDrops, false);
//   }
// }

// function draw() {
//   // Draw the background image
//   background(bgImage);

//   paintDrop = sliderDrops.value();
//   colorPicked = colorPicker.color();
//   addPaint();
//   update();
//   render();
// }

// // add paint when clicking - start with dragging
// function addPaint() {
//   if (
//     mouseIsPressed &&
//     mouseX >= 0 &&
//     mouseX <= width &&
//     mouseY >= 0 &&
//     mouseY <= height
//   ) {
//     let distance = dist(prevMouseX, prevMouseY, mouseX, mouseY);
//     let numPoints = floor(distance / 0.5); // Increase the number of points for smoother lines

//     drawLinePoints(prevMouseX, prevMouseY, mouseX, mouseY, numPoints);

//     // add paint when clicking in one place
//     if (mouseX == prevMouseX && mouseY == prevMouseY) {
//       renderPoints(mouseX, mouseY);
//     }
//   }
//   prevMouseX = mouseX;
//   prevMouseY = mouseY;
//   // preventing a wrap around error when dragging off canvas and back on
//   if (mouseIsPressed && mouseX < 0) {
//     prevMouseX = 0;
//   }
//   if (mouseIsPressed && mouseX > width - 1) {
//     prevMouseX = width - 1;
//   }
//   if (mouseIsPressed && mouseY < 0) {
//     prevMouseY = 0;
//   }
//   if (mouseIsPressed && mouseY > height - 1) {
//     prevMouseY = height - 1;
//   }
// }

// // calculate points when dragging
// // This function from George Profenza on stackoverflow https://stackoverflow.com/questions/63959181/how-do-you-draw-a-line-in-a-pixel-array
// function drawLinePoints(x1, y1, x2, y2, points) {
//   for (let i = 0; i < points; i++) {
//     let t = map(i, 0, points, 0.0, 1.0);
//     let x = round(lerp(x1, x2, t));
//     let y = round(lerp(y1, y2, t));
//     renderPoints(x, y);
//   }
// }

// // replace array points when drawing
// function renderPoints(x, y) {
//   let arrayPos = (x + y * width) * 4;
//   let newR = (paint[arrayPos + 0] + colorPicked.levels[0]) / 2;
//   let newG = (paint[arrayPos + 1] + colorPicked.levels[1]) / 2;
//   let newB = (paint[arrayPos + 2] + colorPicked.levels[2]) / 2;
//   let newN = paint[arrayPos + 3] + paintDrop;
//   paint.splice(arrayPos, 4, newR, newG, newB, newN); // replace the current pixel color with the newly calculated color
// }

// // if there's a lot of color in one place, spread it around

// function update() {
//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       let arrayPos = (x + y * width) * 4;
//       if (paint[arrayPos + 3] > 4) {
//         tempPaint1[arrayPos + 3] = paint[arrayPos + 3] - 4;

//         // mix pixel to right
//         if (x < width - 1) {
//           tempPaint1[arrayPos + 4] =
//             (paint[arrayPos + 4] + paint[arrayPos]) / 2;
//           tempPaint1[arrayPos + 5] =
//             (paint[arrayPos + 5] + paint[arrayPos + 1]) / 2;
//           tempPaint1[arrayPos + 6] =
//             (paint[arrayPos + 6] + paint[arrayPos + 2]) / 2;
//           tempPaint1[arrayPos + 7] = paint[arrayPos + 7] + 1;
//         }

//         // mix pixel to left
//         if (x > 0) {
//           tempPaint1[arrayPos - 4] =
//             (paint[arrayPos - 4] + paint[arrayPos]) / 2;
//           tempPaint1[arrayPos - 3] =
//             (paint[arrayPos - 3] + paint[arrayPos + 1]) / 2;
//           tempPaint1[arrayPos - 2] =
//             (paint[arrayPos - 2] + paint[arrayPos + 2]) / 2;
//           tempPaint1[arrayPos - 1] = paint[arrayPos - 1] + 1;
//         }

//         // mix pixel below
//         tempPaint1[arrayPos + width * 4] =
//           (paint[arrayPos + width * 4] + paint[arrayPos]) / 2;
//         tempPaint1[arrayPos + width * 4 + 1] =
//           (paint[arrayPos + width * 4 + 1] + paint[arrayPos + 1]) / 2;
//         tempPaint1[arrayPos + width * 4 + 2] =
//           (paint[arrayPos + width * 4 + 2] + paint[arrayPos + 2]) / 2;
//         tempPaint1[arrayPos + width * 4 + 3] =
//           paint[arrayPos + width * 4 + 3] + 1;

//         // mix pixel above
//         tempPaint1[arrayPos - width * 4] =
//           (paint[arrayPos - width * 4] + paint[arrayPos]) / 2;
//         tempPaint1[arrayPos - width * 4 + 1] =
//           (paint[arrayPos - width * 4 + 1] + paint[arrayPos + 1]) / 2;
//         tempPaint1[arrayPos - width * 4 + 2] =
//           (paint[arrayPos - width * 4 + 2] + paint[arrayPos + 2]) / 2;
//         tempPaint1[arrayPos - width * 4 + 3] =
//           paint[arrayPos - width * 4 + 3] + 1;
//       }

//       // gradually dry paint
//       tempPaint1[arrayPos + 3] = paint[arrayPos + 3] - defaultTime;
//       if (tempPaint1[arrayPos + 3] < 0) {
//         tempPaint1[arrayPos + 3] = 0;
//       }
//     }
//   }
  
//   if (runnyColors == true){
//     paint = tempPaint1;
//   }
//     else {
//   for (let x = width; x > 0; x--) {
//     for (let y = height; y > 0; y--) {
//       let arrayPos = (x + y * width) * 4;
//       if (paint[arrayPos + 3] > 4) {
//         tempPaint2[arrayPos + 3] = paint[arrayPos + 3] - 4;

//         // mix pixel to right
//         if (x < width - 1) {
//           tempPaint2[arrayPos + 4] =
//             (paint[arrayPos + 4] + paint[arrayPos]) / 2;
//           tempPaint2[arrayPos + 5] =
//             (paint[arrayPos + 5] + paint[arrayPos + 1]) / 2;
//           tempPaint2[arrayPos + 6] =
//             (paint[arrayPos + 6] + paint[arrayPos + 2]) / 2;
//           tempPaint2[arrayPos + 7] = paint[arrayPos + 7] + 1;
//         }

//         // mix pixel to left
//         if (x > 0) {
//           tempPaint2[arrayPos - 4] =
//             (paint[arrayPos - 4] + paint[arrayPos]) / 2;
//           tempPaint2[arrayPos - 3] =
//             (paint[arrayPos - 3] + paint[arrayPos + 1]) / 2;
//           tempPaint2[arrayPos - 2] =
//             (paint[arrayPos - 2] + paint[arrayPos + 2]) / 2;
//           tempPaint2[arrayPos - 1] = paint[arrayPos - 1] + 1;
//         }

//         // mix pixel below
//         tempPaint2[arrayPos + width * 4] =
//           (paint[arrayPos + width * 4] + paint[arrayPos]) / 2;
//         tempPaint2[arrayPos + width * 4 + 1] =
//           (paint[arrayPos + width * 4 + 1] + paint[arrayPos + 1]) / 2;
//         tempPaint2[arrayPos + width * 4 + 2] =
//           (paint[arrayPos + width * 4 + 2] + paint[arrayPos + 2]) / 2;
//         tempPaint2[arrayPos + width * 4 + 3] =
//           paint[arrayPos + width * 4 + 3] + 1;

//         // mix pixel above
//         tempPaint2[arrayPos - width * 4] =
//           (paint[arrayPos - width * 4] + paint[arrayPos]) / 2;
//         tempPaint2[arrayPos - width * 4 + 1] =
//           (paint[arrayPos - width * 4 + 1] + paint[arrayPos + 1]) / 2;
//         tempPaint2[arrayPos - width * 4 + 2] =
//           (paint[arrayPos - width * 4 + 2] + paint[arrayPos + 2]) / 2;
//         tempPaint2[arrayPos - width * 4 + 3] =
//           paint[arrayPos - width * 4 + 3] + 1;
//       }

//       // gradually dry paint
//       tempPaint2[arrayPos + 3] = paint[arrayPos + 3] - defaultTime;
//       if (tempPaint2[arrayPos + 3] < 0) {
//         tempPaint2[arrayPos + 3] = 0;
//       }
//     }
//   }
//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       let arrayPos = (x + y * width) * 4;
//       paint[arrayPos] = (tempPaint1[arrayPos] + tempPaint2[arrayPos]) / 2;
//     }
//   }
// }
// }

// // render all pixels
// function render() {
//   loadPixels();
//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       let pix = (x + y * width) * 4;
//       let arrayPos = (x + y * width) * 4;
//       pixels[pix] = paint[arrayPos];
//       pixels[pix + 1] = paint[arrayPos + 1];
//       pixels[pix + 2] = paint[arrayPos + 2];
//     }
//   }
//   updatePixels();
// }



