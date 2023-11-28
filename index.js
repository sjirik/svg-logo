const filesystem = require('fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shape");

class Logo{
    constructor(){
        this.textChoice = ''
        this.shapeChoice = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeChoice}${this.textChoice}</svg>`
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
        console.log("Congratulations, you have created your logo.svg!");
    });
}

async function init() {
    console.log("Starting init");
	var svgString = "";
	var svg_file = "logo.svg";

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
	
	let shape_response;
	if (shape_type_response === "Square" || shape_type_response === "square") {
		shape_response = new Square();
		console.log("User selected Square shape");
	}
	else if (shape_type_response === "Circle" || shape_type_response === "circle") {
		shape_response = new Circle();
		console.log("User selected Circle shape");
	}
	else if (shape_type_response === "Triangle" || shape_type_response === "triangle") {
		shape_response = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	shape_response.setColor(shape_color_response);

	var svg = new Logo();
	svg.setTextElement(text_response, font_color_response);
	svg.setShapeElement(shape_response);
	svgString = svg.render();
	
	console.log("Displaying shape:\n\n" + svgString);

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile(svg_file, svgString); 
}
init()