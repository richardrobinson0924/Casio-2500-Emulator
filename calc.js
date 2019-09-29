let currentDisplayed = "",
    operatorLastPressed = false,
    equalsLastPressed = false;

let isOn = false;

const PRECISION = 10;

const format = s => (s.toString().length >= PRECISION ? parseFloat(s).toPrecision(PRECISION - 1).toString().replace("+", "") : currentDisplayed)
	.toString()
	.replace(/(?<=\..*)0+$/g, "");

const toRadians = (angle) => angle * (Math.PI / 180);

document.addEventListener('keypress', e => document.getElementById(e.key).click());




/**
 * Displays the current number or operator
 * @param val the value to display
 */
function display(val) {
    if (!isOn) return;
    if (equalsLastPressed) currentDisplayed = "";

    if (!operatorLastPressed && !equalsLastPressed && document.getElementById("calcDisplay").innerText.length >= PRECISION) {
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

function onSwitch() {
    document.getElementById("calcDisplay").innerHTML = isOn ? "" : "0";
    document.getElementById("bg").style.backgroundColor = isOn ? "#8c8d4d" : "#a3a45a";

    currentDisplayed = "";
    operatorLastPressed = true;
    equalsLastPressed = true;

    isOn = !isOn;
}

function onOperator(op) {
    if (!isOn) return;
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
        document.getElementById("calcDisplay").innerHTML  = format(currentDisplayed);
        currentDisplayed += op;

        operatorLastPressed = true;
        equalsLastPressed = false;

        return;
    }

    //  document.getElementById("calcDisplay").innerHTML = currentDisplayed;
    document.getElementById("calcDisplay").innerHTML  = format(currentDisplayed);
    equalsLastPressed = true;
}

function onEquals() {
    if (!isOn) return;
    if (operatorLastPressed) return;

    currentDisplayed = eval(currentDisplayed);
    document.getElementById("calcDisplay").innerHTML  = format(currentDisplayed);

    equalsLastPressed = true;
    operatorLastPressed = false;
}

function clear_s() {
    if (!isOn) return;
    equalsLastPressed = true;
    operatorLastPressed = true;
    currentDisplayed = "";

    document.getElementById("calcDisplay").innerHTML  = "0";
}
