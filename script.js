const incline = document.querySelector('.incline');

const slider1 = document.querySelector('#incline-slider');
const inclineOutput = document.querySelector('#incline-value');

const slider2 = document.querySelector('#y-slider');
const yAxisOutput = document.querySelector('#y-axis-value');

const slider3 = document.querySelector('#line-thickness');
const lineThicknessOutput = document.querySelector('#line-thickness-value');

const formA = document.querySelector('.formula-a');
const formB = document.querySelector('.formula-b');
const alpha = document.querySelector('.alpha');

const functionOp = document.querySelector('.function-op');
const colorPicker = document.querySelector('.color-picker');

// let y = k * x + d;
let k = 1;
// let x = 0;
let d = 2;
let root = 0;
let slope = 0;
let offset = 0;
let currentLineHeight = 1;


function init() {
	root = 150 - d * 10;
	//Arctan(k) -> Output in radians 
	//*(180/PI) to get degrees 
	//-1 due to transform: rotate; rotates in other directon
	slope = Math.atan(k) * (180 / Math.PI) * -1;

	incline.style.top = root + 'px';
	incline.style.transform = 'rotate(' + slope + 'deg)';

	slider1.value = k.toFixed(2);
	slider2.value = d.toFixed(1);
	slider3.value = 1;

	inclineOutput.textContent = slider1.value;
	yAxisOutput.textContent = slider2.value;
	lineThicknessOutput.textContent= slider3.value + 'px';

	formA.textContent = k.toFixed(2);
	formB.textContent = d.toFixed(1);
	alpha.textContent = (slope * -1).toFixed(2);

	colorPicker.value = '#0000ff';
}

//set offset when thickness of incline changes
function setOffset() {
	offset = (slider3.value - 1) / 2;
}


slider1.oninput = function() {
	inclineOutput.textContent = parseFloat(this.value).toFixed(2);
	slope = Math.atan(this.value) * (180 / Math.PI) * -1;
	incline.style.transform = 'rotate(' + slope + 'deg)';
	formA.textContent = parseFloat(this.value).toFixed(2);
	alpha.textContent = (slope * -1).toFixed(2);
};

slider2.oninput = function() {
	yAxisOutput.innerHTML = parseFloat(this.value).toFixed(1);
	root = 150 - this.value * 10 - offset;
	incline.style.top = root + 'px';
	if (this.value < 0) {
		functionOp.innerText = '-';
	} else {
		functionOp.innerText = '+';
	}
	formB.innerHTML = Math.abs(this.value).toFixed(1);
};

slider3.oninput = function() {
	//Ensure that incline gets thicker on both sides
	lineThicknessOutput.innerText = this.value + 'px';
	incline.style.height = this.value + 'px';
	setOffset();
	root = 150 - slider2.value * 10 - offset + 'px';
	incline.style.top = root;
};

colorPicker.oninput = function() {
	incline.style.background = this.value;
};

init();
