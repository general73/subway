import RailWay from "./railway";
import Settings from "./settings";
import Train from "./train";
import Net from "./units/net";
import PIXI = require("pixi.js");

// TODO: Train acceleration
// TODO: Train close info
// TODO: Train breaks
// TODO: Add ui to show/hide stuff
// TODO: Resize

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const renderer = new PIXI.CanvasRenderer({
  autoResize: true,
  backgroundColor: 0x2d2d2d,
  height: window.innerHeight,
  resolution: 2,
  roundPixels: true,
  width: window.innerWidth
});

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";

window.addEventListener("resize", () => {
  renderer.resize(window.innerWidth, window.innerHeight);
});

document.body.appendChild(renderer.view);

const stage = new PIXI.Container();
console.log(stage);
const bg = new PIXI.extras.TilingSprite(
  // PIXI.Texture.fromImage('./img/congruent_outline.png'),
  // PIXI.Texture.fromImage('./img/black_denim.png'),
  // PIXI.Texture.fromImage('./img/black_paper.png'),
  // PIXI.Texture.fromImage('./img/random_grey_variations.png'),
  // PIXI.Texture.fromImage('./img/footer_lodyas.png'),
  // PIXI.Texture.fromImage('./img/dust.png'),
  // PIXI.Texture.fromImage('./img/pink dust.png'),
  // PIXI.Texture.fromImage('./img/squared_metal_inv_@2X.png'),
  // PIXI.Texture.fromImage('./img/squared_metal_inv_@2X copy.png'),
  PIXI.Texture.fromImage("./img/subtle_white_mini_waves.png"),
  renderer.width,
  renderer.height
);

bg.alpha = 0.3;
stage.addChild(bg);
stage.interactive = true;

const layers = new PIXI.Graphics();

//layers.x = 0;
//layers.y = -300;
layers.x = -1564;
layers.y = -2439;

const layerRailways = new PIXI.Graphics();

layers.scale.set(0.5);

let dragging = false;

function onDragEnd() {
  dragging = false;
}

layers.interactive = true;
layers
  .on("pointerdown", () => {
    dragging = true;
  })
  .on("pointerup", onDragEnd)
  .on("pointerupoutside", onDragEnd)
  .on("pointermove", e => {
    if (dragging) {
      let mousedata = e.data.originalEvent as MouseEvent;
      layers.x += mousedata.movementX;
      layers.y += mousedata.movementY;
    }
  });
document.onkeydown = function(e) {
  if (e.code == "ArrowUp") {
    layers.y += 20;
  }
  if (e.code == "ArrowLeft") {
    layers.x += 20;
  }
  if (e.code == "ArrowDown") {
    layers.y -= 20;
  }
  if (e.code == "ArrowRight") {
    layers.x -= 20;
  }
  if (e.code == "NumpadAdd") {
    var worldPos = { x: (0 - layers.x) / layers.scale.x, y: (0 - layers.y) / layers.scale.y };
    var newScale = { x: layers.scale.x * 1.2, y: layers.scale.y * 1.2 };
    var newScreenPos = { x: (worldPos.x) * newScale.x + layers.x, y: (worldPos.y) * newScale.y + layers.y };
    layers.x -= (newScreenPos.x - 0);
    layers.y -= (newScreenPos.y - 0);
    layers.scale.x = newScale.x;
    layers.scale.y = newScale.y;
  }
  if (e.code == "NumpadSubtract") {
    let x = 0;
    let y = 0;
    var worldPos = { x: (x - layers.x) / layers.scale.x, y: (y - layers.y) / layers.scale.y };
    var newScale = { x: layers.scale.x * 0.8, y: layers.scale.y * 0.8 };
    var newScreenPos = { x: (worldPos.x) * newScale.x + layers.x, y: (worldPos.y) * newScale.y + layers.y };
    layers.x -= (newScreenPos.x - x);
    layers.y -= (newScreenPos.y - y);
    layers.scale.x = newScale.x;
    layers.scale.y = newScale.y;
  }
};

// layerRailways.rotation = 5.4;
stage.addChild(layers);
layers.addChild(layerRailways);

const layerTrains = new PIXI.Graphics();

layers.addChild(layerTrains);

const title = new PIXI.Text("bcn subway", {
  align: "right",
  fill: 0x9e9e9e,
  fontSize: 18
});

title.x = window.innerWidth - (title.width + 20);
title.y = 20;
stage.addChild(title);

const brand = new PIXI.Text("@singuerinc", {
  align: "right",
  fill: 0x3e3e3e,
  fontSize: 16
});

brand.interactive = true;
brand.buttonMode = true;
brand.x = window.innerWidth - (brand.width + 20);
brand.y = window.innerHeight - (brand.height + 20);
brand.on("click", () => {
  document.location.href = "https://www.singuerinc.com/";
});
stage.addChild(brand);

const loop = () => {
  requestAnimationFrame(loop);
  renderer.render(stage);
};

const net = new Net();

net.lines.forEach(line => {
  const rw = new RailWay({
    id: line.id,
    line
  });

  if (line.id !== "L1" /*&& line.id !== "L5" && line.id !== "L9"*/) {
    rw.visible = false;
  }

  layerRailways.addChild(rw);
});

net.trains.forEach((train: Train) => {
  const randomRouteIndex = Math.floor(
    Math.random() * train.itinerary.routes.length
  );
  const route = train.itinerary.routes[randomRouteIndex];

  train.itinerary.currentRoute = route;

  const randomIndex = Math.floor(
    Math.random() * train.itinerary.currentRoute.size
  );

  train.parkIn(route, randomIndex);
  train.run();

  layerTrains.addChild(train);

  // if (index === 0) {
  //   train.openTrainInfo();
  // }
});

const settings = new Settings({
  net,
  railways: layerRailways
});

stage.addChild(settings);

loop();