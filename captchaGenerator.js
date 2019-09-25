'use strict';
init();

function init() {
    console.log(createRandomString());
    drawParentBox();
}

function createRandomString() {
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let strength = 10;
    let randomString = '';

    for (let i = 0; i < strength; i++) {
        randomString += allowedChars[Math.floor(Math.random() * 26)];
    }

    return randomString;
}

function drawParentBox() {
    let captcha = document.getElementsByTagName('captcha')[0];

    if (captcha !== undefined) {
        let canvas = document.createElement('canvas');

        canvas.style.display = 'block';
        canvas.width = 200;
        canvas.height = 50;

        let ctx = canvas.getContext('2d');
        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
        const red = randomInt(125, 175);
        const green = randomInt(125, 175);
        const blue = randomInt(125, 175);

        ctx.fillStyle = createRgb(red, green, blue);
        ctx.fillRect(0, 0, 200, 50);

        let colours = [];

        for (let i = 0; i < 5; i++) {
            colours.push(createRgb(red - (20*i),green - (20*i),blue - (20*i)));
        }

        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = colours[randomInt(0, 4)];

            const x = randomInt(-10, 190);
            const y = randomInt(-10, 10);

            ctx.fillRect(x, y, randomInt(0, (200 - x)), randomInt(0, (50 - y)));
        }

        //ctx.clearRect(45, 45, 60, 60);
        //ctx.strokeRect(50, 50, 50, 50);

        captcha.appendChild(canvas);
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRgb(red, green, blue) {
    return `rgb(${red}, ${green}, ${blue})`;
}