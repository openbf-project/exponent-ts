
import Component from "./component.js";
import { get } from "./aliases.js";
import { radians } from "./math/general.js";

import {
  Drawing, OverlayPanel, ImagePanel, Grid, SquarePanel
} from "./mod.js";

const container = new Component()
  .useNative(get("container"));

const root = new OverlayPanel()
.mount(container) as OverlayPanel;

const bg = new ImagePanel()
.setImage("./images/helloworld.png");

const fg = new Grid()
  .setColumnCount(3)
  .setRowCount(3);

root.setElements(fg, bg);

const square = new SquarePanel()
.setAlign("left", "bottom");

fg.setCell(square, 1, 3);

const draw = new Drawing()
.setHandlesResize(true);
square.mountChild(draw);

fg.setCell(
  new ImagePanel()
  .setImage("./images/hud.svg")
  .styleItem("background-repeat", "no-repeat")
  .styleItem("background-position", "50% 0%") as ImagePanel,
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
