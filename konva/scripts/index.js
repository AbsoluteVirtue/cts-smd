function haveIntersection(r1, r2) {
	return !(
		r2.x > r1.x + r1.width ||
		r2.x + r2.width < r1.x ||
		r2.y > r1.y + r1.height ||
		r2.y + r2.height < r1.y
	);
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function writeMessage(message) {
	text.text(message);
}

function isPointOnLine(px, py, x1, y1, x2, y2, width) {
	return distancePointFromLine(px, py, x1, y1, x2, y2, width) <= width / 2;
}

function distancePointFromLine(x0, y0, x1, y1, x2, y2) {
	return Math.abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function distance(x1, x2, y1, y2) {
	var a = Math.abs(x1 - x2);
	var b = Math.abs(y1 - y2);
	var c = Math.sqrt((a * a) + (b * b));
	return c;
}

// hypo = longer     + 3/7 * shorter
// hypo = longer / 2 + 7/8 * shorter

/////////////////////////////////////////////////////

var stage = new Konva.Stage({
	container: 'container', // id of container <div>
	width: window.innerWidth,
	height: window.innerHeight,
});

var layer = new Konva.Layer();

const text = new Konva.Text({
	x: 10,
	y: 10,
	fontFamily: 'Calibri',
	fontSize: 24,
	text: '',
	fill: 'black',
});

const canvas = document.createElement('canvas');
canvas.width = 200;
canvas.height = 150;
const ctx = canvas.getContext('2d');

const grid = new Array();

// const xcenter = stage.width() / 2;
// const ycenter = stage.height() / 2;

const xstart = 100;
const ystart = 100;
const rad = 70;
const h = (rad * 1.732) / 2;

// layer.add(new Konva.Circle({
// 	x: stage.width() / 2 + 1.5 * rad,
// 	y: stage.height() / 2 - 4.1 * rad,
// 	radius: rad,
// 	fill: 'black',
// 	draggable: true,
// }));

// layer.add(new Konva.Circle({
// 	x: stage.width() / 2,
// 	y: stage.height() / 2,
// 	radius: rad,
// 	fill: 'black',
// 	draggable: true,
// }));

for (let row = 0; row < 10; row++) {

	for (let index = 0; index < 10; index++) {

		var cx = xstart + (index * (h * 2)) + (row % 2 ? h : 0);
		var cy = ystart + (row * rad * 1.5);

		const edges = [
			new Konva.Line({
				points: [
					cx - (h * rad / 2) / rad, cy - (h * h) / rad,
					cx, cy
				],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({
				points: [
					cx, cy,
					cx + (h * rad / 2) / rad, cy + (h * h) / rad
				],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({
				points: [
					cx - (h * rad / 2) / rad, cy + (h * h) / rad,
					cx, cy
				],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({
				points: [
					cx, cy,
					cx + (h * rad / 2) / rad, cy - (h * h) / rad
				],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // right throughedge
				points: [cx - h, cy + rad / 2, cx, cy],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // right throughedge
				points: [cx, cy, cx + h, cy - rad / 2],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // left throughedge
				points: [cx - h, cy - rad / 2, cx, cy],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // left throughedge
				points: [cx, cy, cx + h, cy + rad / 2],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // horizontal
				points: [cx - h, cy, cx, cy],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // horizontal
				points: [cx, cy, cx + h, cy],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // vertical
				points: [cx, cy - rad, cx, cy],
				stroke: 'black',
				strokeWidth: 1,
			}),
			new Konva.Line({ // vertical
				points: [cx, cy, cx, cy + rad],
				stroke: 'black',
				strokeWidth: 1,
			}),
		];

		let hex = new Konva.RegularPolygon({
			x: cx,
			y: cy,
			sides: 6,
			radius: rad,
			fill: 'white',
			stroke: 'gray',
			strokeWidth: 2,
			opacity: 0.5,
			edg: edges,
		});

		hex.on('dblclick', () => {
			hex.fill('red');
			hex.stroke('red');
			edges.forEach((item) => {
				item.stroke('red');
			});
		});

		grid.push(hex);
	}
}

let path = new Konva.Line({
	points: [

	],
	stroke: 'green',
	strokeWidth: 7,
	lineCap: 'round',
	lineJoin: 'round',
	// bezier: true,
});

let traj = new Konva.Line({
	points: [
		281.86 - 3 * h,
		310,
		1069.92,
		520
	],
	stroke: 'black',
	strokeWidth: 4,
});

const startc = new Konva.Circle({
	x: 281.86 - 3 * h,
	y: 310,
	radius: 20,
	fill: 'black',
	draggable: true,
});

const endc1 = new Konva.Circle({
	x: 1069.92,
	y: 520,
	radius: 20,
	fill: 'white',
	draggable: true,
});

const endc2 = new Konva.Circle({
	x: 1069.92,
	y: 520,
	radius: 30,
	fill: 'black',
	draggable: true,
});

layer.add(startc);
layer.add(endc2);
layer.add(endc1);

grid.forEach((item) => {
	item.on('wheel', () => {
		let pos = stage.getPointerPosition();
		let points = item.getAttr('edg')[0].points();

		let x = Math.abs(pos.x - (points[0] !== item.x() ? points[0] : points[2]));
		let y = Math.abs(pos.y - (points[1] !== item.y() ? points[1] : points[3]));

		let c = 0;
		for (let i = 1; i < 12; i++) {
			let d = item.getAttr('edg')[i].points();
			let x1 = Math.abs(pos.x - (d[0] !== item.x() ? d[0] : d[2]));
			let y1 = Math.abs(pos.y - (d[1] !== item.y() ? d[1] : d[3]));
			if (x > x1 || y > y1) {
				x = x1;
				y = y1;
				c = i;
			}
		}

		item.getAttr('edg')[c].stroke('red');

		var points_candidate = item.getAttr('edg')[c].points();
		var points_current_path = path.points();

		var len_current_path = path.points().length;
		if (len_current_path === 0) {
			points_current_path.push(...points_candidate);
		} else {
			let d1 = distance(
				points_candidate[0], points_current_path[len_current_path - 2],
				points_candidate[1], points_current_path[len_current_path - 1],
			);
			let d2 = distance(
				points_candidate[2], points_current_path[len_current_path - 2],
				points_candidate[3], points_current_path[len_current_path - 1],
			);
			if (d1 <= d2) {
				x = points_candidate[0];
				y = points_candidate[1];
			} else {
				x = points_candidate[2];
				y = points_candidate[3];
			}
			points_current_path.push(...[
				points_current_path[len_current_path - 2], points_current_path[len_current_path - 1],
				x, y,
			]);
		}

		path.points(points_current_path);
		layer.add(path);
	});

	item.getAttr('edg').forEach((item) => {
		layer.add(item);
	});
	layer.add(item);
});

// layer.add(traj);

// layer.add(
// 	new Konva.Rect({
// 		x: stage.width() / 2,
// 		y: 210,
// 		width: 100,
// 		height: 100,
// 		fill: 'black',
// 		strokeWidth: 4
// 	})
// );

layer.add(path);

stage.add(layer);

// let angle1 = 100;
// let angle2 = 120;
// var cs = Math.cos(angle1), sn = Math.sin(angle1);
// var he = Math.cos(angle2);
// var ak = 100 * cs, bk = -100 * sn, ck = 200;
// var dk = h * 100 * sn, ek = h * 100 * cs, fk = 200;
// ctx.setTransform(ak, dk, bk, ek, ck, fk);
