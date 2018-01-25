import * as PIXI from "pixi.js";
import * as p2 from "p2";

import pix from "./shape";

var world = new p2.World({
  gravity: [0, -120]
});

var width = 800;
var height = 600;

var zoom = 1;

var w = width / zoom;
var h = height / zoom;

var app = new PIXI.Application(width, height, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

var planeShape = new p2.Plane();
var planeBody = new p2.Body({ position: [0, -(h / 2)] });
var planeMaterial = new p2.Material(0);
planeShape.material = planeMaterial;
planeBody.addShape(planeShape);
world.addBody(planeBody);

var container = new PIXI.Container({
  backgroundColor: 0x1099bb
});
app.stage.addChild(container);

container.x = width / 2; // center at origin
container.y = height / 2;
container.scale.x = zoom; // zoom in
container.scale.y = -zoom;

var boxMaterial = new p2.Material(1);
var boxCreator = pix.initBox(container, world, boxMaterial);

var boxes = [];
// boxes[0] = pix.createBox(0, 0, ~~(Math.random() * 30), ~~(Math.random() * 30));

var boxVsBall = new p2.ContactMaterial(boxMaterial, planeMaterial, {
  friction: 0.5,
  restitution: 0.5
});
world.addContactMaterial(boxVsBall);

app.view.addEventListener("click", e => {
  boxes.push(pix.createBox(e.clientX - (w / 2), e.clientY, 20 + ~~(Math.random() * 30), 20 + ~~(Math.random() * 30)))
});

// create a new Sprite from an image path
// var bunny = PIXI.Sprite.fromImage('http://pixijs.io/examples/required/assets/basics/bunny.png')
// bunny.anchor.set(0.5);
// bunny.x = app.screen.width / 2
// bunny.y = app.screen.height / 2
// bunny.scale(1 / zoom)

// container.addChild(bunny);

// console.log(graphics)

// Listen for animate update
app.ticker.add(function(delta) {
  world.step(1 / 30);

  // box.update()
  for (const b of boxes) {
    b.update();
  }
});
