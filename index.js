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

function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
}

async function init() {
    console.log("Starting init");
	var svgString = "";
	var svg_file = "circle.svg";

    const responses = await inquirer.prompt(choices);

	var text_response = "";
	if (responses.text.length > 0 && responses.text.length < 4) {
		text_response = responses.text;
	} else {
		console.log("Invalid! Please enter ONLY 1-3 Characters");
        return;
	}
	console.log("User response: [" + text_response + "]");
	font_color_response = responses["text-color"];
	console.log("User response: [" + font_color_response + "]");
	shape_color_response = responses.shape;
	console.log("User response: [" + shape_color_response + "]");
	shape_type_response = responses["pixel-image"];
	console.log("User response: [" + shape_type_response + "]");
	

