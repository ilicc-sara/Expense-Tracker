"use strict";
import "./style.css";

const inputTextEl = document.querySelector(".input-text");
const inputNumberEl = document.querySelector(".input-number");
const form = document.querySelector(".form");
const itemContainer = document.querySelector(".items-container");
const balanceNumberEl = document.querySelector(".balance-num");

let inputText;
let inputNum;

inputTextEl.addEventListener("input", function (e) {
  inputText = e.target.value;
});

inputNumberEl.addEventListener("input", function (e) {
  inputNum = e.target.value;
});

class Expense {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = crypto.randomUUID();
  }
}

class ExpenseManager {
  constructor() {
    this.expenses = [];
    this.totalBalance = 0;
  }

  add(exp) {
    this.expenses.push(exp);
  }

  filter(item) {
    this.expenses = this.expenses.filter((exp) => exp.id !== item.id);
  }

  balance() {
    return (this.totalBalance = this.expenses.reduce((acc, cur) => {
      return acc + Number(cur.price);
    }, 0));
  }
}

const manager = new ExpenseManager();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputNum === "0" || inputNum === undefined) {
    alert("Expense numbers should be real numbers only!");
  } else {
    const expense = new Expense(inputText, inputNum);
    manager.add(expense);

    const item = document.createElement("li");
    item.innerHTML = `<span>${inputText}</span> <span>$ ${inputNum}</span>`;
    item.setAttribute("data-id", expense.id);
    itemContainer.appendChild(item).className = "item";

    Math.sign(inputNum) === 1
      ? (item.style.borderRightColor = "green")
      : (item.style.borderRightColor = "red");
  }

  balanceNumberEl.textContent = manager.balance();
  inputNumberEl.value = "";
  inputTextEl.value = "";
});
