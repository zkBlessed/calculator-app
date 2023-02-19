const el = (selector) =>
  selector.charAt(0) === "#"
    ? document.querySelector(selector)
    : document.querySelectorAll(selector);

const entry = el("#entry");
const lastEntry = el("#last-entry");
const clean = el("#clean");
const cleanAll = el("#clean-entry");
const float = el("#float");
const plusMinus = el("#plus-minus");
const equal = el("#equal");
const numKeys = el(".number-key");
const opKeys = el(".operation-key");

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const opIcons = {
  sum: '<img width=20 src="assets/plus.svg" alt="plus">',
  sub: '<img width=20 src="assets/minus.svg" alt="minus">',
  mul: '<img width=20 src="assets/multiply.svg" alt="multiply">',
  div: '<img width=20 src="assets/division.svg" alt="division">',
};

const opFuncs = {
  sum: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
};

var num1 = 0;
var num2 = 0;
var result = 0;
var opActive = null;

const calculate = (num, num2, op) => opFuncs[op](num, num2);

numKeys.forEach((num) => {
  num.onclick = ({ target }) => {
    const numPressed = nums[target.innerText];
    const x = Number.isInteger(num1);
    num1 = Number.parseFloat(num1.toString() + numPressed);

    entry.innerText = num1;

    console.log(`
      Num pressed: ${numPressed}
      Entry: ${num1}
    `);
  };
});

opKeys.forEach((op) => {
  op.onclick = () => {
    const opPressed = op.id;
    el(`#${opActive}`)?.classList.remove("active");
    op.classList.add("active");
    opActive = opPressed;
    num2 = num1;
    num1 = 0;
    entry.innerText = num1;
    lastEntry.innerHTML = num2 + opIcons[opActive];

    console.log(`
      Op pressed: ${opPressed}
      Operation: ${opActive}
    `);
  };
});

equal.onclick = () => {
  lastEntry.innerHTML = num2 + opIcons[opActive] + num1;
  num1 = calculate(num2, num1, opActive);
  entry.innerText = num1;
  opActive = null;
  el(".active").forEach((op) => op.classList.remove("active"));

  console.log(`
    Equal: 
      Display value: "${entry.innerText}"
      Computed value: ${result}
  `);
};

clean.onclick = () => {
  num1 = 0;
  entry.innerText = "";

  console.log(`
    Cleaned: 
      Display value: "${entry.innerText}"
      Computed value: ${num1}
  `);
};

cleanAll.onclick = () => {
  num1 = 0;
  num2 = 0;
  result = 0;
  opActive = null;
  entry.innerText = "";
  lastEntry.innerText = "";

  el(".active").forEach((op) => op.classList.remove("active"));

  console.log(`
    Cleaned All: 
      Display value: "${entry.innerText}", "${lastEntry.innerText}"
      Computed value: ${num1}, ${num2}
  `);
};

plusMinus.onclick = () => {
  num1 *= -1;
  entry.innerText = num1;

  console.log(`
    Plus-Minus: 
      Display value: "${entry.innerText}"
      Computed value: ${num1}
  `);
};

float.onclick = () => {
  num1 = num1 + ".";
  entry.innerText = num1;

  console.log(`
    Float: 
      Display value: "${entry.innerText}"
      Computed value: ${num1}
  `);
};
