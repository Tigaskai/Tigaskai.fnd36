'use strict';

const saveButton = document.getElementById("saveButton");
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");
let rect = null;
let drag = false;
let resizing = false;
let select = false;
let shapes = [];

function drawTag(shape) {
    if (shape) {
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        const width = ctx.measureText(shape.tag).width;
        const x = shape.x + (shape.width - width) / 2;
        const y = shape.y + (shape.height + 16) / 2;
        ctx.fillText(shape.tag, x, y);
    }
}

function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(function(shape) {
        ctx.fillStyle = shape.color;
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        ctx.fillStyle = "white";
        ctx.fillRect(shape.x + shape.width - 10, shape.y + shape.height - 10, 10, 10);
        ctx.strokeStyle = "black";
        ctx.strokeRect(shape.x + shape.width - 10, shape.y + shape.height - 10, 10, 10);
        drawTag(shape);
    });
}

function saveCanvas() {
    const dataURL = canvas.toDataURL("image/png");
    const floorMapDiv = window.opener.document.getElementById("floorMap");
    const img = document.createElement("img");
    img.src = dataURL;
    img.alt = "フロアマップ";
    floorMapDiv.innerHTML = "";
    floorMapDiv.appendChild(img);
}

saveButton.addEventListener("click", function() {
    saveCanvas();
    window.close();
});

function getShapeAt(x, y) {
    return shapes.find(function(shape) {
        return x > shape.x && x < shape.x + shape.width && y > shape.y && y < shape.y + shape.height;
    });
}

function mouseDown(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const shape = getShapeAt(x, y);
    if (shape) {
        if (x > shape.x + shape.width - 10 && y > shape.y + shape.height - 10) {
            resizing = true;
        } else {
            drag = true;
        }
        select = true;
        rect = shape;
    } else {
        select = false;
    }
}

function mouseMove(event) {
    if (drag) {
        rect.x = event.offsetX - rect.width / 2;
        rect.y = event.offsetY - rect.height / 2;
        drawRect();
    } else if (resizing) {
        rect.width = event.offsetX - rect.x;
        rect.height = event.offsetY - rect.y;
        drawRect();
    }
}

function mouseUp() {
    drag = false;
    resizing = false;
}

function keyDown(event) {
    if (select && event.key === "Delete") {
        shapes = shapes.filter(function(shape) {
            return shape !== rect;
        });
        rect = null;
        drawRect();
    }
}

function addButtonClick() {
    const itemName = document.getElementById("itemName").value;
    const color = document.getElementById("color").value;
    const newShape = { x: 50, y: 50, width: 100, height: 100, tag: itemName, color: color };
    shapes.push(newShape);
    drawRect();
}



canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mouseup", mouseUp);
document.addEventListener("keydown", keyDown);
document.getElementById("addButton").addEventListener("click", addButtonClick);
