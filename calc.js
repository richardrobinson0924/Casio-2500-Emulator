let currentDisplayed = "",
	operatorLastPressed = false,
	equalsLastPressed = false;

document.addEventListener('keypress', (e) => {
	switch (e.key) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
		case '.':
			display(e.key);
			break;

		case '+':
		case '-':
		case '*':
		case '/':
			onOperator(e.key);
			break;

		case "Enter":
		case '=':
			onEquals();
			break;

		default:
			return;
	}
});

function display(val) {
	if (equalsLastPressed) currentDisplayed = "";

	if (operatorLastPressed || equalsLastPressed) {
		document.getElementById("calcDisplay").innerHTML = val;
	}
	else {
		document.getElementById("calcDisplay").innerHTML += val;
	}

	currentDisplayed += val;

	operatorLastPressed = false;
	equalsLastPressed = false;
}

function onOperator(op) {
	if (operatorLastPressed) return;

	document.getElementById("calcDisplay").innerHTML = eval(currentDisplayed);
	currentDisplayed += op;

	operatorLastPressed = true;
	equalsLastPressed = false;
}

function onEquals() {
	if (operatorLastPressed) return;

	document.getElementById("calcDisplay").innerHTML = currentDisplayed === ""
		? 0
		: eval(currentDisplayed);

	currentDisplayed = eval(currentDisplayed);

	equalsLastPressed = true;
	operatorLastPressed = false;
}

function clear() {
	equalsLastPressed = true;
	operatorLastPressed = true;
	currentDisplayed = "";

	document.getElementById("calcDisplay").innerHTML = "";
}