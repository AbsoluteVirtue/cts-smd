function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

var stage = new Konva.Stage({
    container: 'container', // id of container <div>
    width: window.innerWidth,
    height: window.innerHeight,
});

const button = document.createElement('button');
button.textContent = 'Tango!';
button.style.position = 'absolute';
button.style.top = '10px';
button.style.left = '10px';
button.style.padding = '10px';
document.body.appendChild(button);

var layer = new Konva.Layer();

let path = new Konva.Line({
    points: [],
    stroke: 'green',
    strokeWidth: 7,
});

button.addEventListener('click', () => {
    var length = path.points().length;
    var pp = path.points();
    if (length === 0) {
        pp.push(...[
            getRandomFloat(100, 500),
            getRandomFloat(100, 500),
            getRandomFloat(100, 500),
            getRandomFloat(100, 500),
        ]);
    } else {
        pp.push(...[
            pp[length - 2], pp[length - 1],
            getRandomFloat(100, 500),
            getRandomFloat(100, 500),
        ]);
    }

    path.points(pp);
    layer.add(path);
});

layer.add(path);
stage.add(layer);
