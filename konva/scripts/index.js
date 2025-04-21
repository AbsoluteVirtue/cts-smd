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
const xstart = 100;
// const ystart = stage.height() / 2;
const ystart = 100;
const rad = 70;
const h = (rad * 1.732) / 2;

// hypo = longer     + 3/7 * shorter
// hypo = longer / 2 + 7/8 * shorter

// Create a circle
const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: 'red',
    draggable: true,
});

for (let row = 0; row < 10; row++) {

    for (let index = 0; index < 10; index++) {

        var cx = xstart + (index * (h * 2)) + (row % 2 ? h : 0);
        var cy = ystart + (row * rad * 1.5);

        edges.push(new Konva.Line({
            points: [
                cx - (h * rad / 2) / rad, cy - (h * h) / rad, 
                cx + (h * rad / 2) / rad, cy + (h * h) / rad
            ],
            stroke: 'black',
            strokeWidth: 1,
        }));
        edges.push(new Konva.Line({
            points: [
                cx - (h * rad / 2) / rad, cy + (h * h) / rad, 
                cx + (h * rad / 2) / rad, cy - (h * h) / rad
            ],
            stroke: 'black',
            strokeWidth: 1,
        }));
        
        edges.push(new Konva.Line({ // right throughedge
            points: [cx - h, cy + rad / 2, cx + h, cy - rad / 2],
            stroke: 'black',
            strokeWidth: 1,
        }));
        
        edges.push(new Konva.Line({ // left throughedge
            points: [cx - h, cy - rad / 2, cx + h, cy + rad/ 2],
            stroke: 'black',
            strokeWidth: 1,
        }));
        
        edges.push(new Konva.Line({ // horizontal
            points: [cx - h, cy, cx + h, cy],
            stroke: 'black',
            strokeWidth: 1,
        }));

        edges.push(new Konva.Line({ // vertical
            points: [cx, cy - rad, cx, cy + rad],
            stroke: 'black',
            strokeWidth: 1,
        }));

        grid.push(new Konva.RegularPolygon({
            x: cx,
            y: cy,
            sides: 6,
            radius: rad,
            fill: 'white',
            stroke: 'gray',
            strokeWidth: 2,
            opacity: 0.5,
        }));

    }
    
}

grid.forEach((item) => { layer.add(item); });
edges.forEach((item) => { layer.add(item); });

stage.add(layer);
