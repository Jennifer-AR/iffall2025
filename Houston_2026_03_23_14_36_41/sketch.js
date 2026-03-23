let cityImg, carImg, hebImg;
let newspaperImg, bagImg, receiptImg, drivewayImg;

let carXs = [];
let carW, carH, carY;

let state = "intro";
let stateStart = 0;

let newspaperY = 2550;

let bagItems = [];
let lastBagTime = 0;
let bagDelay = 1000;

function preload() {
  cityImg = loadImage("welcome.png");
  carImg = loadImage("carz.png");
  hebImg = loadImage("HEB-small.png");

  newspaperImg = loadImage("update-newspaper.png");
  bagImg = loadImage("bag.png");
  receiptImg = loadImage("update-receipt.png");
  drivewayImg = loadImage("driveway.png");
}

function setup() {
  createCanvas(800, 5884);

  carW = 1200;
  carH = carImg.height * (carW / carImg.width);
  carY = 400;
  carXs = [-carW, -carW / 3, carW / 3];

  stateStart = millis();
  lastBagTime = millis();
}

function draw() {
  background(255);
  drawBaseLayout();

  let t = millis() - stateStart;

  if (state === "intro") {
    if (t > 1500) {
      state = "newspaper";
      stateStart = millis();
    }
  } else if (state === "newspaper") {
    drawNewspaperScene();
    if (t > 2000) {
      state = "bags";
      stateStart = millis();
      lastBagTime = millis();
      bagItems = [];
    }
  } else if (state === "bags") {
    drawBagScene();
    if (t > 7000) {
      state = "receipt";
      stateStart = millis();
    }
  } else if (state === "receipt") {
    drawReceiptScene();
    if (t > 2500) {
      state = "done";
    }
  }

  if (state === "receipt" || state === "done") {
    drawDrivewayScene();
  }
}

function drawBaseLayout() {
  let cityW = width;
  let cityH = cityImg.height * (cityW / cityImg.width);

  imageMode(CORNER);
  image(cityImg, 0, 0, cityW, cityH);

  fill(0);
  noStroke();

  rect(40, 600, 60, 60);
  rect(120, 600, 60, 60);
  rect(200, 600, 60, 60);
  rect(280, 600, 60, 60);
  rect(360, 600, 60, 60);
  rect(440, 600, 60, 60);
  rect(520, 600, 60, 60);
  rect(600, 600, 60, 60);
  rect(680, 600, 60, 60);
  rect(760, 600, 60, 60);

  rect(-10, 680, 60, 60);
  rect(70, 680, 60, 60);
  rect(150, 680, 60, 60);
  rect(230, 680, 60, 60);
  rect(310, 680, 60, 60);
  rect(390, 680, 60, 60);
  rect(470, 680, 60, 60);
  rect(550, 680, 60, 60);
  rect(630, 680, 60, 60);
  rect(710, 680, 60, 60);
  rect(790, 680, 60, 60);

  rect(40, 760, 60, 60);
  rect(120, 760, 60, 60);
  rect(200, 760, 60, 60);

  rect(-10, 1050, 60, 60);
  rect(70, 1050, 60, 60);
  rect(150, 1050, 60, 60);
  rect(230, 1050, 60, 60);
  rect(310, 1050, 60, 60);
  rect(390, 1050, 60, 60);
  rect(470, 1050, 60, 60);
  rect(550, 1050, 60, 60);
  rect(630, 1050, 60, 60);
  rect(710, 1050, 60, 60);
  rect(790, 1050, 60, 60);

  fill(0);
  textAlign(LEFT, CENTER);
  textSize(64);
  text("AFTER TRAFFIC", 270, 800);

  let speed = 3;
  for (let i = 0; i < carXs.length; i++) {
    carXs[i] += speed;
    if (carXs[i] > width + 200) {
      carXs[i] = -carW - 200;
    }
    image(carImg, carXs[i], carY, carW, carH);
  }
}

function drawNewspaperScene() {
  imageMode(CENTER);

  let w = 700;
  let h = newspaperImg.height * (w / newspaperImg.width);

  image(newspaperImg, width / 2, newspaperY, w, h);

  noFill();
  stroke(255, 0, 0);
  strokeWeight(6);

  ellipse(555, 1585, 310, 280);
  ellipse(230, 1990, 270, 110);
  ellipse(170, 2250, 230, 220);
  ellipse(402, 2250, 230, 220);
  ellipse(632, 2250, 230, 220);
  ellipse(540, 2390, 290, 100);
  ellipse(170, 3020, 230, 220);
  ellipse(402, 3020, 230, 220);
  ellipse(632, 3020, 230, 220);
  ellipse(170, 3240, 230, 220);
  ellipse(402, 3240, 230, 220);
  ellipse(170, 3500, 230, 220);
  ellipse(425, 3435, 260, 90);
  ellipse(652, 3500, 230, 220);
  ellipse(422, 3672, 190, 155);
}

function drawBagScene() {
  imageMode(CENTER);

  drawNewspaperScene();

  let hebW = width;
  let hebH = hebImg.height * (hebW / hebImg.width);
  image(hebImg, width / 2, 4600, hebW, hebH);

  let now = millis();

  if (now - lastBagTime > bagDelay) {
    for (let i = 0; i < 5; i++) {
      let x = random(80, width - 80);
      let y = random(4000, 4300);
      bagItems.push({
        x: x,
        y: y,
        w: random(240, 320),
        h: random(240, 320)
      });
    }
    lastBagTime = now;
  }

  for (let i = 0; i < bagItems.length; i++) {
    let b = bagItems[i];
    image(bagImg, b.x, b.y, b.w, b.h);
  }
}

function drawReceiptScene() {
  imageMode(CENTER);

  drawNewspaperScene();

  let hebW = width;
  let hebH = hebImg.height * (hebW / hebImg.width);
  image(hebImg, width / 2, 4600, hebW, hebH);

  for (let i = 0; i < bagItems.length; i++) {
    let b = bagItems[i];
    image(bagImg, b.x, b.y, b.w, b.h);
  }

  image(receiptImg, width / 2, 4780, 280, 980);
}

function drawDrivewayScene() {
  imageMode(CORNER);

  drawBaseLayout();
  drawNewspaperScene();
  drawBagScene();
  drawReceiptScene();

  let w = width;
  let h = drivewayImg.height * (w / drivewayImg.width);
  image(drivewayImg, 380, 5600, w, h);
}