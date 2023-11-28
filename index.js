const filesystem = require('fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

class Logo{
    constructor(){
        this.textChoice = ''
        this.shapeChoice = ''
    }
    render(){

        return `<svg version="1.1" xmlns="https://www.w3.org/TR/SVG2" width="300" height="200">${this.shapeChoice}${this.textChoice}</svg>`
    }
    setTextElement(text,color){
        this.textChoice = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeChoice = shape.render()

    }
    
}

const choices = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter 3 characters",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color name:",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Enter a color name:",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
];


