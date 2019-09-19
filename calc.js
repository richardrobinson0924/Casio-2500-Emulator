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
        currentDisplayed = (s => s.toString())(Math.sqrt(parseFloat(currentDisplayed)));
    } else if (op === "sin") {
        currentDisplayed = (s => s.toString())(Math.sin(parseFloat(currentDisplayed)));
    } else if (op === "cos") {
        currentDisplayed = (s => s.toString())(Math.cos(parseFloat(currentDisplayed)));
    } else if (op === "tan") {
        currentDisplayed = (s => s.toString())(Math.tan(parseFloat(currentDisplayed)));
    } else {
        document.getElementById("calcDisplay").innerHTML = eval(currentDisplayed);
        currentDisplayed += op;

        operatorLastPressed = true;
        equalsLastPressed = false;

        return;
    }

    document.getElementById("calcDisplay").innerHTML = currentDisplayed;
    equalsLastPressed = true;
}

function onEquals() {
	if (operatorLastPressed) return;

    currentDisplayed = eval(currentDisplayed);

    document.getElementById("calcDisplay").innerHTML = currentDisplayed.toString().length >= 10
        ? parseFloat(currentDisplayed).toExponential(5)
        : currentDisplayed;


	equalsLastPressed = true;
	operatorLastPressed = false;
}

function clear_s() {
	equalsLastPressed = true;
	operatorLastPressed = true;
	currentDisplayed = "";

	document.getElementById("calcDisplay").innerHTML = "0";
}
