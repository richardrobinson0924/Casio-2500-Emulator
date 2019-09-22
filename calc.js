let currentDisplayed = "",
    operatorLastPressed = false,
    equalsLastPressed = false;

const format = s => (s.toString().length >= 10 ? parseFloat(s).toPrecision(9).toString().replace("+", "") : currentDisplayed)
	.toString()
	.replace(/(?<=\..*)0+$/g, "");

const toRadians = (angle) => angle * (Math.PI / 180);

document.addEventListener('keypress', e => document.getElementById(e.key).click());

/**
 * Displays the current number or operator
 * @param val the value to display
 */
function display(val) {
    if (equalsLastPressed) currentDisplayed = "";

    if (!operatorLastPressed && !equalsLastPressed && document.getElementById("calcDisplay").innerText.length >= 10) {
        return;
    }

    if (operatorLastPressed || equalsLastPressed) {
        document.getElementById("calcDisplay").innerHTML = val;
    } else {
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
        currentDisplayed = (s => s.toString())(Math.sin(toRadians(parseFloat(currentDisplayed))));
    } else if (op === "cos") {
        currentDisplayed = (s => s.toString())(Math.cos(toRadians(parseFloat(currentDisplayed))));
    } else if (op === "tan") {
        currentDisplayed = (s => s.toString())(Math.tan(toRadians(parseFloat(currentDisplayed))));
    } else {
        //document.getElementById("calcDisplay").innerHTML = eval(currentDisplayed);
        document.getElementById("calcDisplay").innerHTML = format(currentDisplayed);
        displayResult();
        currentDisplayed += op;

        operatorLastPressed = true;
        equalsLastPressed = false;

        return;
    }

    //  document.getElementById("calcDisplay").innerHTML = currentDisplayed;
    document.getElementById("calcDisplay").innerHTML = format(currentDisplayed);
    equalsLastPressed = true;
}

function onEquals() {
    if (operatorLastPressed) return;

    currentDisplayed = eval(currentDisplayed);
    document.getElementById("calcDisplay").innerHTML = format(currentDisplayed);

    equalsLastPressed = true;
    operatorLastPressed = false;
}

function clear_s() {
    equalsLastPressed = true;
    operatorLastPressed = true;
    currentDisplayed = "";

    document.getElementById("calcDisplay").innerHTML = "0";
}
