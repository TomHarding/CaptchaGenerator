'use strict';

init();

function init() {
    let captcha = document.getElementsByTagName('captcha')[0];

    if (captcha !== undefined) {
        let form = createForms(captcha);
        let canvas = undefined;

        for (let i = 0; i < form.childNodes.length; i++) {
            if (form.childNodes[i].tagName.toUpperCase() === 'CANVAS')
                canvas = form.childNodes[i];
        }

        if (canvas !== undefined) {
            drawCanvas(canvas);
            const string = createRandomString();
            drawStringOnCanvas(canvas, string);
            captcha.appendChild(form);
        }
    }
}

function createRandomString() {
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let strength = 8;
    let randomString = '';

    for (let i = 0; i < strength; i++) {
        randomString += allowedChars[randomInt(0, 25)]
    }

    return randomString;
}

function createForms() {
    let parent = document.createElement('div');
    parent.style.display = 'block';
    parent.style.width = '200px';
    parent.style.height = '200px';
    parent.style.font = '12px Helvetica';
    parent.style.border = '2px solid #d3d3d3';
    parent.style.padding = '10px';

    let canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.width = 200;
    canvas.height = 50;
    canvas.style.paddingBottom = '10px';

    let input = document.createElement('input');
    input.type = 'text';
    input.style.width = '138px';
    input.style.padding = '5px 10px';
    input.id = 'inputString';

    let refreshIcon = document.createElement('img');
    refreshIcon.src = 'https://icon-library.net/images/refresh-icon-png/refresh-icon-png-17.jpg';
    refreshIcon.alt = 'Refresh captcha';
    refreshIcon.style.width = '28px';
    refreshIcon.style.height = '28px';
    refreshIcon.addEventListener('click', refresh, false);

    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Submit';
    submit.style.width = '75px';
    submit.style.marginTop = '10px';
    submit.style.backgroundColor = '#287bff';
    submit.addEventListener('click', validate, false);

    parent.appendChild(canvas);
    parent.appendChild(input);
    parent.appendChild(refreshIcon);
    parent.appendChild(submit);

    return parent;
}

function drawCanvas(canvas) {
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

        ctx.fillRect(x, y, randomInt(0, (210 - x)), randomInt(0, (60 - y)));
    }

    return canvas;
}

function drawStringOnCanvas(canvas, string) {
    let ctx = canvas.getContext('2d');

    const black = createRgb( 0, 0, 0);
    const white = createRgb(255, 255, 255);
    const textColours = [black, white];
    const textFonts = ['Arial', 'Georgia', 'Helvetica', 'Impact'];

    for (let i = 0; i < string.length; i++) {
        const letterSpace = 170/string.length;
        const initial = 15;

        ctx.font = `20px ${textFonts[randomInt(0, textFonts.length - 1)]}`;
        ctx.fillStyle = textColours[randomInt(0, 1)];
        ctx.rotate(randomInt(-5, 5) * Math.PI / 180);
        ctx.fillText(string[i], initial + (i*letterSpace), randomInt(20, 40), 200);
    }
}

function refresh() {

}

function validate() {
    const input = document.getElementById('inputString');
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRgb(red, green, blue) {
    return `rgb(${red}, ${green}, ${blue})`;
}