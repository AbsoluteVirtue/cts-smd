function writeMessage(text, message) {
  text.text(message);
}

// first we need to create a stage
var stage = new Konva.Stage({
  container: 'container', // id of container <div>
  width: window.innerWidth,
  height: window.innerHeight,
});

// then create layer
var layer = new Konva.Layer();

const grid = new Array();
const edges = new Array();

// const xstart = stage.width() / 2;
// const ystart = stage.height() / 2;
const xstart = 100;
const ystart = 100;
const rad = 70;
const h = (rad * 1.732) / 2;

// hypo = longer     + 3/7 * shorter
// hypo = longer / 2 + 7/8 * shorter

for (let row = 0; row < 10; row++) {
  for (let index = 0; index < 10; index++) {

    var cx = xstart + (index * (h * 2)) + (row % 2 ? h : 0);
    var cy = ystart + (row * rad * 1.5);

    let l1 = new Konva.Line({
      points: [
        cx - (h * rad / 2) / rad, cy - (h * h) / rad,
        cx + (h * rad / 2) / rad, cy + (h * h) / rad
      ],
      stroke: 'black',
      strokeWidth: 1,
    });

    edges.push(l1);

    let l2 = new Konva.Line({
      points: [
        cx - (h * rad / 2) / rad, cy + (h * h) / rad,
        cx + (h * rad / 2) / rad, cy - (h * h) / rad
      ],
      stroke: 'black',
      strokeWidth: 1,
    });

    edges.push(l2);

    let l3 = new Konva.Line({ // right throughedge
      points: [cx - h, cy + rad / 2, cx + h, cy - rad / 2],
      stroke: 'black',
      strokeWidth: 1,
    });

    edges.push(l3);

    let l4 = new Konva.Line({ // left throughedge
      points: [cx - h, cy - rad / 2, cx + h, cy + rad / 2],
      stroke: 'black',
      strokeWidth: 1,
    });

    edges.push(l4);

    let l5 = new Konva.Line({ // horizontal
      points: [cx - h, cy, cx + h, cy],
      stroke: 'black',
      strokeWidth: 1,
    });

    edges.push(l5);

    let l6 = new Konva.Line({ // vertical
      points: [cx, cy - rad, cx, cy + rad],
      stroke: 'black',
      strokeWidth: 1,
    });

    edges.push(l6);

    let hex = new Konva.RegularPolygon({
      x: cx,
      y: cy,
      sides: 6,
      radius: rad,
      fill: 'white',
      stroke: 'gray',
      strokeWidth: 2,
      opacity: 0.5,
    });

    hex.on('mousedown', () => {
      hex.fill('red');
      hex.stroke('red');
      l1.stroke('red');
      l2.stroke('red');
      l3.stroke('red');
      l4.stroke('red');
      l5.stroke('red');
      l6.stroke('red');
    });

    grid.push(hex);

  }
}

grid.forEach((item) => {
  item.on('click', () => {
    let pos = stage.getPointerPosition();

    let l = new Konva.Line({
      points: [(pos.x), (pos.y), item.x(), item.y()],
      stroke: 'green',
      strokeWidth: 12,
    });

    layer.add(l);
  });

  layer.add(item);
});

edges.forEach((item) => {
  layer.add(item);
});

stage.add(layer);
