'use strict'

const openButton = document.getElementById("saveButton");
function newopen() {
window.open("./floormapmaking.html");
}

openButton.addEventListener("click",newopen);

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let rect = null; 
let isDragging = false;
let isResizing = false;
let isSelected = false;
let shapes = [];

function drawTag(shape) {
 if (shape) {
 ctx.fillStyle = 'black';
 ctx.font = '16px Arial';
 const textWidth = ctx.measureText(shape.tag).width;
 const textX = shape.x + (shape.width - textWidth) / 2;
 const textY = shape.y + (shape.height + 16) / 2;
 ctx.fillText(shape.tag, textX, textY);
 }
}

function drawRect() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 shapes.forEach(function(shape) {
 ctx.fillStyle = shape.color;
 ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
 ctx.fillStyle = 'white';
 ctx.fillRect(shape.x + shape.width - 10, shape.y + shape.height - 10, 10, 10);
 ctx.strokeStyle = 'black';
 ctx.strokeRect(shape.x + shape.width - 10, shape.y + shape.height - 10, 10, 10);
 drawTag(shape);
 });
}

drawRect();

function getShapeAt(x, y) {
 return shapes.find(function(shape) {
 return x > shape.x && x < shape.x + shape.width &&
 y > shape.y && y < shape.y + shape.height;
 });
}

function handleMouseDown(e) {
 const mouseX = e.offsetX;
 const mouseY = e.offsetY;
 const shape = getShapeAt(mouseX, mouseY);
 if (shape) {
 if (mouseX > shape.x + shape.width - 10 && mouseY > shape.y + shape.height - 10) {
 isResizing = true;
 } else {
 isDragging = true;
 }
 isSelected = true;
 rect = shape;
 } else {
 isSelected = false;
 }
}

function handleMouseMove(e) {
 if (isDragging) {
 rect.x = e.offsetX - rect.width / 2;
 rect.y = e.offsetY - rect.height / 2;
 drawRect();
 } else if (isResizing) {
 rect.width = e.offsetX - rect.x;
 rect.height = e.offsetY - rect.y;
 drawRect();
 }
}

function handleMouseUp() {
 isDragging = false;
 isResizing = false;
}

function handleKeyDown(e) {
 if (isSelected && e.key === 'Delete') {
 shapes = shapes.filter(function(shape) {
 return shape !== rect;
 });
 rect = null;
 drawRect();
 }
}

function handleAddButtonClick() {
 const itemName = document.getElementById('itemName').value;
 const color = document.getElementById('color').value;
 const newShape = { x: 50, y: 50, width: 100, height: 100, tag: itemName, color: color };
 shapes.push(newShape);
 drawRect();
}

function handleCanvasClick(e) {
 const mouseX = e.offsetX;
 const mouseY = e.offsetY;
 const shape = getShapeAt(mouseX, mouseY);
 if (shape) {
 console.log('Shape clicked:', shape);
 } else {
 console.log('No shape at clicked position.');
 }
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
document.addEventListener('keydown', handleKeyDown);
document.getElementById('addButton').addEventListener('click', handleAddButtonClick);
canvas.addEventListener('click', handleCanvasClick);
