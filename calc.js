let currentDisplayed = "",
	operatorLastPressed = false,
	equalsLastPressed = false;

const displayResult = () => document.getElementById("calcDisplay").innerHTML = (currentDisplayed.toString().length >= 10
	? parseFloat(currentDisplayed).toPrecision(9).replace("+", "")
	: currentDisplayed
).replace("(?<=\..*)0+$", "");

const toRadians = (angle) => angle * (Math.PI / 180);

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

		case "c":
			clear_s();
			break;

		default:
			return;
	}
});

function display(val) {
	if (equalsLastPressed) currentDisplayed = "";

	if (!operatorLastPressed && !equalsLastPressed && document.getElementById("calcDisplay").innerText.length >= 10) {
		return;
	}

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

    if (op === "sqrt") {
        currentDisplayed = (s => s.toString())(Math.sqrt(toRadians(parseFloat(currentDisplayed))));
    } else if (op === "sin") {
        currentDisplayed = (s => s.toString())(Math.sin(toRadians(parseFloat(currentDisplayed))));
    } else if (op === "cos") {
        currentDisplayed = (s => s.toString())(Math.cos(toRadians(parseFloat(currentDisplayed))));
    } else if (op === "tan") {
        currentDisplayed = (s => s.toString())(Math.tan(toRadians(parseFloat(currentDisplayed))));
    } else {
        //document.getElementById("calcDisplay").innerHTML = eval(currentDisplayed);
		displayResult();
        currentDisplayed += op;

        operatorLastPressed = true;
        equalsLastPressed = false;

        return;
    }

  //  document.getElementById("calcDisplay").innerHTML = currentDisplayed;
	displayResult();
    equalsLastPressed = true;
}

function onEquals() {
	if (operatorLastPressed) return;

    currentDisplayed = eval(currentDisplayed);
    displayResult();

	equalsLastPressed = true;
	operatorLastPressed = false;
}

function clear_s() {
	equalsLastPressed = true;
	operatorLastPressed = true;
	currentDisplayed = "";

	document.getElementById("calcDisplay").innerHTML = "0";
}
