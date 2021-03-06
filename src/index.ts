
import Component from "./component.js";
import { get } from "./aliases.js";
import { radians } from "./math/general.js";

import {
  Drawing, ImagePanel, Grid, SquarePanel, Knob, ListPanel, runOnce
} from "./mod.js";

runOnce();

const container = new Component()
  .useNative(get("container")).addClasses("exponent-panel");

const root = new Grid()
  .setColumnCount(1)
  .setRowCount(1)
  .mount(container);

const bg = new ImagePanel()
.setImage("./images/helloworld.png");

let width = 10;
let height = 6;

const fg = new Grid()
.setColumnCount(3)
.setRowCount(3);

root.setCell(bg, 1, 1);

root.setCell(fg, 1, 1);

// for (let x=1; x<width+1; x++) {
//   for (let y=1; y<height+1; y++) {
//     fg.setCell(new Knob(), x, y);
//   }
// }

const square: SquarePanel = new SquarePanel()
.setAlign("left", "bottom");

fg.setCell(square, 1, 3);

const draw: Drawing = new Drawing()
.setHandlesResize(true);
square.mountChild(draw);

fg.setCell(
  new ImagePanel()
  .setImage("./images/hud.svg")
  .setStyleItem("background-repeat", "no-repeat")
  .setStyleItem("background-position", "50% 0%") as ImagePanel,
  1, 1, 4
);

const RAD_360 = radians(360);

draw.addRenderPass((ctx, drawing)=>{
  ctx.save();

  ctx.fillStyle = "#374e6d";
  ctx.beginPath();
  ctx.ellipse(
    drawing.width/2,
    drawing.height/2,
    drawing.width/2,
    drawing.height/2,
    0,
    0,
    RAD_360
  );
  ctx.fill();
  ctx.restore();
});
// fg.styleItem("pointer-events","none");
bg.on("mousedown", (evt)=>{
  console.log("draw");
});

const maplist = new ListPanel()
.setStyleItem("background-color", "#333355")
.for(1, 10, (self, index)=>{
  self.mountChild(
    new Knob()
  );
}) as ListPanel;

fg.setCell(
  maplist,
  2, 2, 2, 3
);
